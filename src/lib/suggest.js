// Schedule suggester: given a pool of courses and constraints ("no 8:30s",
// "Fridays off", a credit target), enumerate conflict-free schedules and return
// the best few, diverse ones. Pure — no React.

import { getCourseSections } from '../data/hbsCourses.js'
import { getCourseEval } from '../data/courseEvals.js'

export const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI']
const PATTERN_DAYS = { X: ['MON', 'TUE'], Y: ['THU', 'FRI'], W: ['WED'] }

const toMin = (s) => { const [h, m] = s.split(':').map(Number); return h * 60 + m }

// Regular weekly meeting days for one section entry (swap days not included)
export function meetingDays(entry) {
  return entry.weekday ? [entry.weekday] : PATTERN_DAYS[entry.dayType] ?? []
}

// Q1 + Q2 (or S1 + S2) are different halves of the term and never collide
function qTermsOverlap(a, b) {
  if (a === b) return true
  const half = (q) => (q.endsWith('1') && q.length === 2 ? 1 : q.endsWith('2') && q.length === 2 ? 2 : 0)
  const ha = half(a), hb = half(b)
  return ha === 0 || hb === 0 || ha === hb
}

// A course's selectable options. Entries sharing a section id are one option
// that meets on several patterns (e.g. Mon at HKS + Wed).
export function courseOptions(courseId) {
  const groups = new Map()
  for (const e of getCourseSections(courseId)) {
    const key = e.section ?? '_'
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(e)
  }
  return [...groups.values()].map(entries => ({
    section: entries[0].section,
    entries,
    days: [...new Set(entries.flatMap(meetingDays))],
    start: Math.min(...entries.map(e => toMin(e.timeSlot.split('-')[0]))),
    end: Math.max(...entries.map(e => toMin(e.timeSlot.split('-')[1]))),
  }))
}

function optionsConflict(a, b) {
  for (const x of a.entries) for (const y of b.entries) {
    if (!qTermsOverlap(x.qTerm, y.qTerm)) continue
    const dx = meetingDays(x), dy = meetingDays(y)
    if (!dx.some(d => dy.includes(d))) continue
    const [xs, xe] = x.timeSlot.split('-').map(toMin)
    const [ys, ye] = y.timeSlot.split('-').map(toMin)
    if (xs < ye && ys < xe) return true
  }
  return false
}

export function optionFits(opt, { freeDays, earliest, latest }) {
  if (opt.days.some(d => freeDays.has(d))) return false
  if (earliest != null && opt.start < earliest) return false
  if (latest != null && opt.end > latest) return false
  return true
}

// How much a course is worth to this student. Scout bucket (when ranking a
// build) dominates; evals break ties; scaled by credits so two 1.5s ≈ one 3.
const BUCKET_VALUE = { favorite: 10, great: 7, good: 4, acceptable: 2 }
export function courseValue(course, { bucket, inBuild }) {
  let v = bucket ? BUCKET_VALUE[bucket] : inBuild ? 3 : 1
  const ev = getCourseEval(course.number)
  if (ev?.quality) v += (ev.quality - 5) * 2
  if (course.popular) v += 0.5
  return Math.max(0.1, v) * (course.credits / 3)
}

const NODE_BUDGET = 400_000
const KEEP = 300

/**
 * @param pool       [{ course, value }]
 * @param opts       { freeDays:Set, earliest:min|null, latest:min|null,
 *                     minCredits, maxCredits, mustIds:Set, compactWeight }
 * @returns { results: [{ picks:[{course, option}], credits, score, days }], eligible, blockedMust, bestCredits, truncated }
 */
export function suggestSchedules(pool, opts) {
  const { minCredits, maxCredits, mustIds = new Set(), compactWeight = 0 } = opts

  // Courses with at least one section that passes the time/day constraints
  const items = []
  const blockedMust = []
  for (const { course, value } of pool) {
    const options = courseOptions(course.id).filter(o => optionFits(o, opts))
    if (options.length === 0) { if (mustIds.has(course.id)) blockedMust.push(course); continue }
    items.push({ course, value, options, must: mustIds.has(course.id) })
  }
  if (blockedMust.length) return { results: [], eligible: items, blockedMust, bestCredits: 0, truncated: false }

  // Must-includes first, then by value-per-credit so the bound is tight
  items.sort((a, b) => (b.must - a.must) || (b.value / b.course.credits - a.value / a.course.credits))

  // suffix[i]: values/credits of items i.. for the fractional-knapsack bound
  const bound = (i, creditsLeft) => {
    let v = 0, c = creditsLeft
    for (let k = i; k < items.length && c > 0; k++) {
      const take = Math.min(1, c / items[k].course.credits)
      v += items[k].value * take
      c -= items[k].course.credits * take
    }
    return v
  }

  const found = []
  let bestCredits = 0 // most credits any conflict-free combo reached (for "why nothing fits")
  let worstKept = -Infinity
  let nodes = 0
  const chosen = []

  const record = (credits, score) => {
    const days = new Set(chosen.flatMap(p => p.option.days))
    const final = score - compactWeight * days.size
    found.push({ picks: [...chosen], credits, score: final, days })
    if (found.length > KEEP * 2) {
      found.sort((a, b) => b.score - a.score)
      found.length = KEEP
      worstKept = found[found.length - 1].score
    }
  }

  const dfs = (i, credits, score) => {
    if (++nodes > NODE_BUDGET) return
    if (credits > bestCredits) bestCredits = credits
    if (credits >= minCredits - 1e-9) record(credits, score)
    if (i >= items.length || credits >= maxCredits - 1e-9) return
    if (found.length >= KEEP && score + bound(i, maxCredits - credits) <= worstKept) return

    const it = items[i]
    if (credits + it.course.credits <= maxCredits + 1e-9) {
      for (const option of it.options) {
        if (chosen.some(p => optionsConflict(p.option, option))) continue
        chosen.push({ course: it.course, option })
        dfs(i + 1, credits + it.course.credits, score + it.value)
        chosen.pop()
      }
    }
    if (!it.must) dfs(i + 1, credits, score)
  }
  dfs(0, 0, 0)

  // Only schedules that contain every must-include and hit the credit floor
  const valid = found
    .filter(r => r.credits >= minCredits - 1e-9 && [...mustIds].every(id => r.picks.some(p => p.course.id === id)))
    .sort((a, b) => b.score - a.score)

  // Diversity: each kept schedule swaps out ≥2 courses vs every earlier one;
  // relax to 1 when the pool is too tight to give a few options.
  const pickDiverse = (minSwaps) => {
    const out = []
    for (const r of valid) {
      const ids = r.picks.map(p => p.course.id)
      const tooClose = out.some(k => ids.filter(id => !k.picks.some(p => p.course.id === id)).length < minSwaps)
      if (!tooClose) out.push(r)
      if (out.length >= 6) break
    }
    return out
  }
  let results = pickDiverse(2)
  if (results.length < 3) results = pickDiverse(1)

  return { results, eligible: items, blockedMust: [], bestCredits, truncated: nodes > NODE_BUDGET }
}
