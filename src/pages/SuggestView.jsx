import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Lock, X, BookmarkPlus, Check, CalendarDays, Info, SearchX } from 'lucide-react'
import { COURSES, scheduleLabel } from '../data/hbsCourses'
import { getCourseEval } from '../data/courseEvals'
import { REGISTRATION_TERM } from '../data/ecDeadlines'
import { suggestSchedules, courseValue, WEEKDAYS } from '../lib/suggest'

// Schedule suggester: pick a pool (a build or the whole catalog), set limits
// like "no 8:30s" or "Fridays off", and get conflict-free schedules that hit a
// credit target. Keep / exclude courses from a result to steer the next run.

const TERMS = ['Fall 2026', 'Spring 2027']
const HALVES = { 'Fall 2026': ['Q1', 'Q2'], 'Spring 2027': ['S1', 'S2'] }
const HALF_LABEL = { Q1: 'Q1', Q2: 'Q2', S1: 'Q3', S2: 'Q4' }
const DAY_SHORT = { MON: 'Mon', TUE: 'Tue', WED: 'Wed', THU: 'Thu', FRI: 'Fri' }
const CREDIT_OPTIONS = [9, 12, 13.5, 15, 16.5]
const START_OPTIONS = [[null, 'Any time'], [610, '10:10 AM'], [710, '11:50 AM'], [810, '1:30 PM']]
const END_OPTIONS = [[null, 'Any time'], [790, '1:10 PM'], [890, '2:50 PM'], [1030, '5:10 PM']]

const PRESETS = [
  { key: 'no830',   label: 'No 8:30s',      test: s => s.earliest >= 610,            apply: (s, on) => ({ earliest: on ? 610 : null }) },
  { key: 'mornings', label: 'Mornings free', test: s => s.earliest >= 710,           apply: (s, on) => ({ earliest: on ? 710 : null }) },
  { key: 'by3',     label: 'Done by 3',     test: s => s.latest != null && s.latest <= 890, apply: (s, on) => ({ latest: on ? 890 : null }) },
  { key: 'monoff',  label: 'Mondays off',   test: s => s.freeDays.has('MON'),         apply: (s, on) => ({ freeDays: toggleSet(s.freeDays, 'MON', on) }) },
  { key: 'frioff',  label: 'Fridays off',   test: s => s.freeDays.has('FRI'),         apply: (s, on) => ({ freeDays: toggleSet(s.freeDays, 'FRI', on) }) },
  { key: 'wedoff',  label: 'Wednesdays off', test: s => s.freeDays.has('WED'),        apply: (s, on) => ({ freeDays: toggleSet(s.freeDays, 'WED', on) }) },
]

function toggleSet(set, v, on) {
  const next = new Set(set)
  on ? next.add(v) : next.delete(v)
  return next
}

const toMin = (s) => { const [h, m] = s.split(':').map(Number); return h * 60 + m }
function fmtMin(min) {
  const h = Math.floor(min / 60), m = min % 60
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')}${h >= 12 ? 'p' : 'a'}`
}

function halfCredits(picks, halves) {
  const out = { [halves[0]]: 0, [halves[1]]: 0 }
  for (const { course, option } of picks) {
    const q = option.entries[0].qTerm
    if (q === halves[0] || q === halves[1]) out[q] += course.credits
    else { out[halves[0]] += course.credits / 2; out[halves[1]] += course.credits / 2 }
  }
  return out
}

// ── Mini week grid ───────────────────────────────────────────────────────────
const G_START = 8 * 60 + 30, G_END = 18 * 60
function WeekGrid({ picks, halves }) {
  return (
    <div className="sg-week" aria-hidden="true">
      {WEEKDAYS.map(day => (
        <div key={day} className="sg-week__col">
          <div className="sg-week__day">{DAY_SHORT[day]}</div>
          <div className="sg-week__track">
            {picks.flatMap(({ course, option }) => option.entries
              .filter(e => (e.weekday ? [e.weekday] : { X: ['MON', 'TUE'], Y: ['THU', 'FRI'], W: ['WED'] }[e.dayType]).includes(day))
              .map((e, i) => {
                const [s, en] = e.timeSlot.split('-').map(toMin)
                const half = e.qTerm === halves[0] ? 'first' : e.qTerm === halves[1] ? 'second' : 'full'
                return (
                  <div key={course.id + i}
                    className={`sg-week__blk sg-week__blk--${e.dayType.toLowerCase()} sg-week__blk--${half}`}
                    style={{ top: `${((s - G_START) / (G_END - G_START)) * 100}%`, height: `${((en - s) / (G_END - G_START)) * 100}%` }}
                    title={`${course.title} · ${e.timeSlot}`}>
                    <span>{course.number}</span>
                  </div>
                )
              }))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ── One suggested schedule ───────────────────────────────────────────────────
function ResultCard({ idx, result, term, mustIds, onKeep, onExclude, onSave, savedId }) {
  const halves = HALVES[term]
  const hc = halfCredits(result.picks, halves)
  const starts = result.picks.map(p => p.option.start)
  const ends = result.picks.map(p => p.option.end)
  const picks = [...result.picks].sort((a, b) =>
    WEEKDAYS.indexOf(a.option.days[0]) - WEEKDAYS.indexOf(b.option.days[0]) || a.option.start - b.option.start)

  return (
    <article className="sg-card">
      <header className="sg-card__head">
        <div className="sg-card__title">
          <span className="sg-card__idx">Option {idx + 1}</span>
          <b>{result.credits} cr</b>
          <span className="sg-card__halves">{HALF_LABEL[halves[0]]} {hc[halves[0]]} · {HALF_LABEL[halves[1]]} {hc[halves[1]]}</span>
        </div>
        <div className="sg-card__days">
          {WEEKDAYS.map(d => (
            <span key={d} className={'sg-daychip' + (result.days.has(d) ? ' is-on' : '')}>{DAY_SHORT[d].slice(0, d === 'THU' ? 2 : 1)}</span>
          ))}
          <span className="sg-card__span">{fmtMin(Math.min(...starts))}–{fmtMin(Math.max(...ends))}</span>
        </div>
      </header>

      <WeekGrid picks={result.picks} halves={halves} />

      <ul className="sg-list">
        {picks.map(({ course, option }) => {
          const ev = getCourseEval(course.number)
          const kept = mustIds.has(course.id)
          return (
            <li key={course.id} className="sg-row">
              <span className={`dot dot--${option.entries[0].dayType.toLowerCase()}`} />
              <div className="sg-row__main">
                <Link to={`/courses/${course.id}`} className="sg-row__title">{course.title}</Link>
                <div className="sg-row__meta">
                  <span className="mono">#{course.number}</span>
                  {option.section && <span>§{option.section}</span>}
                  <span>{option.entries.map(e => scheduleLabel(e, true)).join(' + ')}</span>
                  <span>{HALF_LABEL[option.entries[0].qTerm] ?? 'Full term'}</span>
                  <span>{course.credits} cr</span>
                  {ev?.quality && <span title="Avg course quality (1–7) from student evals">★ {ev.quality.toFixed(1)}</span>}
                  {course.applicationRequired && <span className="sg-app">Application</span>}
                </div>
              </div>
              <div className="sg-row__btns">
                <button className={'sg-icon' + (kept ? ' is-kept' : '')} onClick={() => onKeep(course.id)}
                  title={kept ? 'Kept in every suggestion (click to release)' : 'Keep in every suggestion'} aria-label="Keep">
                  <Lock size={13} />
                </button>
                <button className="sg-icon" onClick={() => onExclude(course.id)} title="Exclude from suggestions" aria-label="Exclude">
                  <X size={14} />
                </button>
              </div>
            </li>
          )
        })}
      </ul>

      <footer className="sg-card__foot">
        {savedId
          ? <>
              <span className="sg-saved"><Check size={14} /> Saved as a build</span>
              <Link className="sg-btn sg-btn--ghost" to={`/schedule?build=${savedId}`}><CalendarDays size={14} /> Open in Schedule</Link>
            </>
          : <button className="sg-btn" onClick={onSave}><BookmarkPlus size={14} /> Save as build</button>}
      </footer>
    </article>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function SuggestView({ builds, createBuildFrom }) {
  const [term, setTerm] = useState(REGISTRATION_TERM)
  const [poolId, setPoolId] = useState('catalog')
  const [credits, setCredits] = useState(15)
  const [lim, setLim] = useState({ freeDays: new Set(), earliest: null, latest: null })
  const [compact, setCompact] = useState(false)
  const [skipApp, setSkipApp] = useState(true)
  const [mustIds, setMustIds] = useState(() => new Set())
  const [excluded, setExcluded] = useState(() => new Set())
  const [saved, setSaved] = useState({}) // result signature -> build id

  const build = builds.find(b => b.id === poolId)
  const byId = useMemo(() => new Map(COURSES.map(c => [c.id, c])), [])

  const pool = useMemo(() => {
    const bucketOf = new Map()
    const ranking = build?.rankings?.[term]
    if (ranking) for (const [bucket, ids] of Object.entries(ranking)) for (const id of ids) bucketOf.set(id, bucket)
    const source = build ? build.courseIds.map(id => byId.get(id)).filter(Boolean) : COURSES
    return source
      .filter(c => c.term === term && !excluded.has(c.id))
      .filter(c => !skipApp || !c.applicationRequired || mustIds.has(c.id))
      .map(course => ({ course, value: courseValue(course, { bucket: bucketOf.get(course.id), inBuild: !!build }) }))
  }, [build, term, excluded, skipApp, mustIds, byId])

  const out = useMemo(() => suggestSchedules(pool, {
    ...lim, minCredits: credits, maxCredits: credits,
    mustIds: new Set([...mustIds].filter(id => byId.get(id)?.term === term)),
    compactWeight: compact ? 2.5 : 0,
  }), [pool, lim, credits, mustIds, compact, term, byId])

  const toggleKeep = (id) => setMustIds(s => toggleSet(s, id, !s.has(id)))
  const exclude = (id) => { setExcluded(s => toggleSet(s, id, true)); setMustIds(s => toggleSet(s, id, false)) }
  const sig = (r) => r.picks.map(p => `${p.course.id}:${p.option.section ?? ''}`).sort().join('|')

  const save = (r, i) => {
    const sections = {}
    for (const p of r.picks) if (p.option.section) sections[p.course.id] = p.option.section
    const days = WEEKDAYS.filter(d => !r.days.has(d)).map(d => DAY_SHORT[d])
    const name = `${term.split(' ')[0]} suggestion ${i + 1}${days.length ? ` · ${days.join('/')} off` : ''}`
    const id = createBuildFrom({ name, courseIds: r.picks.map(p => p.course.id), sections })
    setSaved(s => ({ ...s, [sig(r)]: id }))
  }

  const steered = [...mustIds, ...excluded].map(id => byId.get(id)).filter(c => c && c.term === term)
  const poolCredits = pool.reduce((s, p) => s + p.course.credits, 0)

  return (
    <div className="page">
      <div className="wrap">
        <div className="page-head">
          <div>
            <h1 className="page-head__title">Suggest a <em>Schedule</em></h1>
            <p className="page-head__sub">
              Set your limits and get conflict-free schedules that hit your credit target, ranked by your Scout buckets and student evals.
            </p>
          </div>
          <div className="page-head__meta">{term}</div>
        </div>
        <div className="rule rule--soft" />

        <section className="sg-panel">
          <div className="sg-panel__row">
            <div className="seg">
              {TERMS.map(t => (
                <button key={t} className={'seg__btn' + (term === t ? ' is-active' : '')} onClick={() => setTerm(t)}>{t}</button>
              ))}
            </div>
            <label className="sg-field">
              <span className="flabel">From</span>
              <span className="select">
                <select value={poolId} onChange={e => setPoolId(e.target.value)}>
                  <option value="catalog">Whole catalog</option>
                  {builds.map(b => {
                    const n = b.courseIds.filter(id => byId.get(id)?.term === term).length
                    return <option key={b.id} value={b.id}>{b.name} ({n} {term.split(' ')[0]})</option>
                  })}
                </select>
              </span>
            </label>
            <label className="sg-field">
              <span className="flabel">Credits</span>
              <span className="select">
                <select value={credits} onChange={e => setCredits(Number(e.target.value))}>
                  {CREDIT_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </span>
            </label>
          </div>

          <div className="sg-panel__row">
            <span className="flabel">Quick</span>
            {PRESETS.map(p => {
              const on = p.test(lim)
              return (
                <button key={p.key} className={'fpill' + (on ? ' is-active' : '')}
                  onClick={() => setLim(s => ({ ...s, ...p.apply(s, !on) }))}>{p.label}</button>
              )
            })}
          </div>

          <div className="sg-panel__row">
            <span className="flabel">Days off</span>
            {WEEKDAYS.map(d => (
              <button key={d} className={'fpill' + (lim.freeDays.has(d) ? ' is-active' : '')}
                onClick={() => setLim(s => ({ ...s, freeDays: toggleSet(s.freeDays, d, !s.freeDays.has(d)) }))}>
                {DAY_SHORT[d]}
              </button>
            ))}
            <span className="fdiv" />
            <label className="sg-field">
              <span className="flabel">Start after</span>
              <span className="select">
                <select value={lim.earliest ?? ''} onChange={e => setLim(s => ({ ...s, earliest: e.target.value === '' ? null : Number(e.target.value) }))}>
                  {START_OPTIONS.map(([v, l]) => <option key={l} value={v ?? ''}>{l}</option>)}
                </select>
              </span>
            </label>
            <label className="sg-field">
              <span className="flabel">Done by</span>
              <span className="select">
                <select value={lim.latest ?? ''} onChange={e => setLim(s => ({ ...s, latest: e.target.value === '' ? null : Number(e.target.value) }))}>
                  {END_OPTIONS.map(([v, l]) => <option key={l} value={v ?? ''}>{l}</option>)}
                </select>
              </span>
            </label>
          </div>

          <div className="sg-panel__row">
            <button className={'fpill' + (compact ? ' is-active' : '')} onClick={() => setCompact(v => !v)}>Prefer fewer days on campus</button>
            <button className={'fpill' + (skipApp ? ' is-active' : '')} onClick={() => setSkipApp(v => !v)}>Skip application-only courses</button>
          </div>

          {(lim.freeDays.has('MON') || lim.freeDays.has('TUE') || lim.freeDays.has('THU') || lim.freeDays.has('FRI')) && (
            <p className="sg-hint">
              <Info size={13} />
              <span>X-day courses meet Mon <i>and</i> Tue, and Y-day courses meet Thu <i>and</i> Fri, so a day off rules out that whole pattern. Only once-a-week seminars on the other day stay in play.</span>
            </p>
          )}

          {steered.length > 0 && (
            <div className="sg-panel__row sg-steer">
              {steered.map(c => (
                <span key={c.id} className={'sg-steerchip' + (mustIds.has(c.id) ? ' is-kept' : ' is-out')}>
                  {mustIds.has(c.id) ? <Lock size={11} /> : <X size={11} />}
                  {c.title}
                  <button onClick={() => mustIds.has(c.id) ? toggleKeep(c.id) : setExcluded(s => toggleSet(s, c.id, false))} aria-label="Remove">
                    <X size={11} />
                  </button>
                </span>
              ))}
              <button className="fclear" onClick={() => { setMustIds(new Set()); setExcluded(new Set()) }}>Clear</button>
            </div>
          )}
        </section>

        <p className="sg-status">
          <Sparkles size={14} />
          {out.results.length > 0
            ? <><b>{out.results.length}</b> schedule{out.results.length > 1 ? 's' : ''} from <b>{out.eligible.length}</b> courses that fit your limits</>
            : <>No schedules yet</>}
          <span className="sg-status__note">Times show each course's regular weekly pattern. Most courses also have a few swap-day sessions (often a Wednesday) set by the academic calendar.</span>
        </p>

        {out.results.length === 0 ? (
          <div className="empty sg-empty">
            <div className="empty__mark"><SearchX /></div>
            <div className="empty__title">Nothing fits those limits</div>
            <div className="empty__sub">
              {out.blockedMust.length > 0
                ? <>{out.blockedMust.map(c => c.title).join(', ')} can't meet your day/time limits. Release {out.blockedMust.length > 1 ? 'them' : 'it'} or loosen a limit.</>
                : build && poolCredits < credits
                  ? <>This build only has {poolCredits} {term} credits{skipApp ? ' (excluding application-only courses)' : ''}. Add courses, lower the target, or switch to the whole catalog.</>
                  : <>With these limits the most you can schedule without conflicts is <b>{out.bestCredits}</b> credits ({out.eligible.length} courses qualify). Try dropping a day off, an earlier start, or a lower credit target.</>}
            </div>
          </div>
        ) : (
          <div className="sg-grid">
            {out.results.map((r, i) => (
              <ResultCard key={sig(r)} idx={i} result={r} term={term} mustIds={mustIds}
                onKeep={toggleKeep} onExclude={exclude} onSave={() => save(r, i)} savedId={saved[sig(r)]} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
