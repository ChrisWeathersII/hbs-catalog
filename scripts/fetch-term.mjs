// Pull one term's EC timetable from HBS's FoSE catalog API and write it as a
// static data module the app imports.
//
//   node scripts/fetch-term.mjs --srcdb 792154 --term "Spring 2027" --out src/data/terms/spring2027.js
//
// Term codes (srcdb) are the <option> values of the Term select on
// https://coursecatalog.mba.hbs.edu/ (e.g. 792148 = 2026 Fall, 792154 = 2027 Spring).
//
// Course IDs are stable across re-runs: an existing course with the same
// number + term keeps its id (so saved builds keep working); new courses get a
// deterministic id derived from term + number.

import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { createHash } from 'node:crypto'

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => (a.startsWith('--') ? [...acc, [a.slice(2), all[i + 1]]] : acc), [])
)
const { srcdb, term, out } = args
if (!srcdb || !term || !out) {
  console.error('usage: node scripts/fetch-term.mjs --srcdb <code> --term "Spring 2027" --out <file>')
  process.exit(1)
}
const SPRING = term.startsWith('Spring')

// Existing courses (for id reuse + prefix-collision checks). Loaded defensively:
// the app's course module imports generated term files, so it can fail to load
// mid-change; the previous output file is the fallback source for this term.
const EXISTING = []
const tryImport = async (path) => { try { return await import(pathToFileURL(resolve(path)).href) } catch { return null } }
const app = await tryImport('src/data/hbsCourses.js')
if (app) EXISTING.push(...app.COURSES)
else console.warn('warn: could not load src/data/hbsCourses.js; reusing ids from the previous output only')
const prev = existsSync(out) ? await tryImport(out) : null
for (const c of prev?.TERM_COURSES ?? []) if (!EXISTING.some(e => e.id === c.id)) EXISTING.push(c)

const API = 'https://coursecatalog.mba.hbs.edu/api/?page=fose&route='
async function fose(route, body) {
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(API + route, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    const json = await res.json().catch(() => null)
    // FoSE returns HTTP 200 with a `fatal` field on failure
    if (json && !json.fatal) return json
    await new Promise(r => setTimeout(r, 500 * (attempt + 1)))
  }
  throw new Error(`FoSE ${route} failed: ${JSON.stringify(body)}`)
}

async function pool(items, n, fn) {
  const out = new Array(items.length)
  let i = 0
  await Promise.all(Array.from({ length: n }, async () => {
    while (i < items.length) { const k = i++; out[k] = await fn(items[k]) }
  }))
  return out
}

// ── Lookups ────────────────────────────────────────────────────────────────
const UNIT_CODES = {
  acad_unit_A_M: 'Accounting & Management',
  acad_unit_BGIE: 'Business, Government & the International Economy',
  acad_unit_EM: 'Entrepreneurial Management',
  acad_unit_FIN: 'Finance',
  acad_unit_GM: 'General Management',
  acad_unit_MKT: 'Marketing',
  acad_unit_NOM: 'NOM', // split into Negotiation / Organizations & Markets below
  acad_unit_OB: 'Organizational Behavior',
  acad_unit_STRAT: 'Strategy',
  acad_unit_TOM: 'Technology & Operations Management',
}
const QTERM = SPRING
  ? { 'Full Term': 'S1S2', 'Quarter 3': 'S1', 'Quarter 4': 'S2' }
  : { 'Full Term': 'Q1Q2', 'Quarter 1': 'Q1', 'Quarter 2': 'Q2' }
// Regular weekly pattern -> app section shape
const PATTERN = {
  MT:  { dayType: 'X', weekday: null },
  ThF: { dayType: 'Y', weekday: null },
  M:   { dayType: 'X', weekday: 'MON' },
  T:   { dayType: 'X', weekday: 'TUE' },
  W:   { dayType: 'W', weekday: 'WED' },
  Th:  { dayType: 'Y', weekday: 'THU' },
  F:   { dayType: 'Y', weekday: 'FRI' },
}

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#39;|&rsquo;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ')
const strip = (s) => decode(String(s ?? '').replace(/<[^>]+>/g, '')).trim()
const hhmm = (t) => `${t.padStart(4, '0').slice(0, 2)}:${t.padStart(4, '0').slice(2)}`

function to24(t) {
  // "1:30pm" -> "13:30"
  const m = t.match(/^(\d{1,2})(?::(\d\d))?(am|pm)$/)
  if (!m) return null
  let h = Number(m[1]) % 12
  if (m[3] === 'pm') h += 12
  return `${String(h).padStart(2, '0')}:${m[2] ?? '00'}`
}

// meeting_html: <div class="meet">ThF 1:30pm-2:50pm<span class="meet-dates"> (1/29 to 4/16)</span></div>
function parseMeetings(html) {
  const meets = []
  for (const m of String(html ?? '').matchAll(/<div class="meet">([^<]*)(?:<span class="meet-dates">\s*\(([^)]*)\)<\/span>)?/g)) {
    const [days, range] = m[1].trim().split(/\s+/)
    if (!range) continue
    const [s, e] = range.split('-')
    const dates = (m[2] ?? '').split(' to ')
    const span = dates.length === 2 ? dayOfYear(dates[1]) - dayOfYear(dates[0]) : 0
    meets.push({ days, start: to24(s), end: to24(e), span })
  }
  return meets
}
const dayOfYear = (md) => { const [mo, d] = md.split('/').map(Number); return mo * 31 + d }

function stableId(number) {
  const h = createHash('sha1').update(`${term}:${number}`).digest('hex')
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20, 32)}`
}

// ── Fetch ──────────────────────────────────────────────────────────────────
const search = await fose('search', { other: { srcdb }, criteria: [] })
const sections = search.results.filter(r => !r.isCancelled && r.stat !== 'C')
console.log(`${search.results.length} sections (${sections.length} active)`)

const unitsByCode = new Map()
for (const [code, unit] of Object.entries(UNIT_CODES)) {
  // multi-column selects filter as { field: <option value>, value: 'Y' }
  const r = await fose('search', { other: { srcdb }, criteria: [{ field: code, value: 'Y' }] })
  for (const row of r.results) {
    if (!unitsByCode.has(row.code)) unitsByCode.set(row.code, new Set())
    unitsByCode.get(row.code).add(unit)
  }
}

const details = await pool(sections, 6, async (s) => ({
  row: s,
  d: await fose('details', { group: `code:${s.code}`, key: `crn:${s.crn}`, srcdb, matched: `crn:${s.crn}` }),
}))

// ── Assemble ───────────────────────────────────────────────────────────────
const byCourse = new Map()
for (const x of details) {
  const number = x.row.code.split(' ').pop()
  if (!byCourse.has(number)) byCourse.set(number, [])
  byCourse.get(number).push(x)
}

const existingByKey = new Map(EXISTING.map(c => [`${c.term}|${c.number}`, c]))
const existingByNumber = new Map()
for (const c of EXISTING) if (!existingByNumber.has(c.number)) existingByNumber.set(c.number, c)

const courses = []
const courseSections = {}
const warnings = []

for (const [number, secs] of [...byCourse].sort((a, b) => a[1][0].row.title.localeCompare(b[1][0].row.title))) {
  secs.sort((a, b) => a.row.no.localeCompare(b.row.no))
  const first = secs[0]
  const prior = existingByKey.get(`${term}|${number}`)
  const sibling = existingByNumber.get(number) // same course in another term

  const faculty = [...new Set(secs.flatMap(x =>
    [...String(x.d.instructordetail_html ?? '').matchAll(/>([^<]+)<\/a>/g)].map(m => decode(m[1]).trim())
  ))]
  if (faculty.length === 0) faculty.push(...new Set(secs.map(x => x.row.instr).filter(Boolean)))

  let units = [...(unitsByCode.get(first.row.code) ?? [])]
  if (units.includes('NOM')) {
    const prev = (prior ?? sibling)?.units?.filter(u => u === 'Negotiation' || u === 'Organizations & Markets')
    units = units.filter(u => u !== 'NOM')
    units.push(...(prev?.length ? prev : [/negotiat/i.test(first.row.title) ? 'Negotiation' : 'Organizations & Markets']))
  }
  if (units.length === 0 && (prior ?? sibling)) units = [...(prior ?? sibling).units]
  if (units.length === 0) warnings.push(`${number}: no academic unit`)

  const id = prior?.id ?? stableId(number)
  const course = {
    id,
    number,
    title: decode(first.row.title),
    units,
    faculty,
    term,
    credits: Number(first.d.hours_html) || 3,
    assessment: strip(first.d.schd_html) || 'Other',
    popular: (prior ?? sibling)?.popular ?? false,
  }
  if (/yes/i.test(first.d.application_required ?? '')) course.applicationRequired = true
  courses.push(course)

  const multi = secs.length > 1
  const out = []
  for (const x of secs) {
    const meets = parseMeetings(x.d.meeting_html)
    if (meets.length === 0) { warnings.push(`${number} §${x.row.no}: schedule pending`); continue }
    // The regular pattern is the X (MT) / Y (ThF) block when there is one; the
    // other meets are swap days. Otherwise it's a weekly seminar on one or more
    // single days (e.g. Mon + Wed): keep every meet that runs most of the term.
    const block = meets.find(m => m.days === 'MT' || m.days === 'ThF')
    const maxSpan = Math.max(...meets.map(m => m.span))
    const regular = block ? [block] : meets.filter(m => m.span >= maxSpan / 2)
    const qTerm = QTERM[strip(x.d.session_html)]
    if (!qTerm) warnings.push(`${number} §${x.row.no}: unknown session "${strip(x.d.session_html)}"`)
    const extra = [...new Set(meets.filter(m => !regular.includes(m)).map(m => m.days))]
    for (const m of regular) {
      const pat = PATTERN[m.days]
      if (!pat) { warnings.push(`${number} §${x.row.no}: unmapped day pattern "${m.days}"`); continue }
      const sec = {
        section: multi ? x.row.no : null,
        ...pat,
        timeSlot: `${m.start}-${m.end}`,
        qTerm: qTerm ?? (SPRING ? 'S1S2' : 'Q1Q2'),
        // sorted: the API returns co-instructors in varying order between calls
        faculty: x.row.instr.split(/\s*[;,/]\s*/).map(n => n.replace(/^[A-Z]\.\s*/, '')).sort().join('; '),
      }
      // Swap/make-up sessions on other weekdays (e.g. the occasional Wednesday)
      if (extra.length) sec.extraDays = extra
      out.push(sec)
    }
  }
  if (out.length) courseSections[id.slice(0, 8)] = out
}

// 8-char prefix keys must not collide with any other term's courses
const otherPrefixes = new Set(EXISTING.filter(c => c.term !== term).map(c => c.id.slice(0, 8)))
for (const c of courses) if (otherPrefixes.has(c.id.slice(0, 8))) throw new Error(`id prefix collision: ${c.id}`)

const stamp = new Date().toISOString().slice(0, 10)
const body = `// ${term} EC timetable — GENERATED by scripts/fetch-term.mjs on ${stamp}.
// Source: HBS FoSE catalog API (srcdb ${srcdb}). Do not hand-edit; re-run the script.
// ${courses.length} courses, ${Object.values(courseSections).flat().length} scheduled sections.

export const TERM_LABEL = ${JSON.stringify(term)}
export const TERM_FETCHED = ${JSON.stringify(stamp)}
export const TERM_SRCDB = ${JSON.stringify(srcdb)}

export const TERM_COURSES = ${JSON.stringify(courses, null, 2)}

export const TERM_SECTIONS = ${JSON.stringify(courseSections, null, 2)}
`
mkdirSync(dirname(out), { recursive: true })
writeFileSync(out, body)
console.log(`wrote ${out}: ${courses.length} courses`)
const reused = courses.filter(c => existingByKey.has(`${term}|${c.number}`)).length
console.log(`ids reused from existing ${term} entries: ${reused}; new: ${courses.length - reused}`)
const dropped = EXISTING.filter(c => c.term === term && !byCourse.has(c.number))
if (dropped.length) console.log(`existing ${term} courses NOT in the API (will disappear): ${dropped.map(c => `${c.number} ${c.title}`).join(' | ')}`)
for (const w of warnings) console.warn('warn:', w)
