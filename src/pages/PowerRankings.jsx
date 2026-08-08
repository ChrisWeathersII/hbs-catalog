import { Fragment, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, X, ChevronDown, ChevronRight, ArrowUp, ArrowDown, SearchX } from 'lucide-react'
import { COURSES, UNITS, getCourseSections } from '../data/hbsCourses'
import { getCourseEval } from '../data/courseEvals'

// Rated courses, deduped by catalog number — dual-term listings (a Fall and a
// Spring entry sharing one number) collapse to the Fall listing.
const RANKED = (() => {
  const byNum = new Map()
  for (const c of COURSES) {
    const ev = getCourseEval(c.number)
    if (!ev || ev.newCourse) continue
    const cur = byNum.get(c.number)
    if (!cur || (cur.course.term !== 'Fall 2026' && c.term === 'Fall 2026')) byNum.set(c.number, { course: c, ev })
  }
  return [...byNum.values()]
})()

// Per-professor rollup of a course's eval sections, response-weighted,
// best-rated professor first.
function profBreakdown(ev) {
  const by = new Map()
  for (const e of ev.evals) {
    const k = e.faculty || 'Unknown'
    if (!by.has(k)) by.set(k, [])
    by.get(k).push(e)
  }
  return [...by.entries()].map(([name, rows]) => {
    const n = rows.reduce((s, r) => s + r.responses, 0)
    const w = (key) => rows.reduce((s, r) => s + r[key] * r.responses, 0) / n
    return {
      name: name.includes(', ') ? name.split(', ').slice(0, 2).reverse().join(' ') : name,
      quality: w('quality'), instr: w('instr'), prepHrs: w('prepHrs'),
      terms: [...new Set(rows.map(r => r.term))].join(' + '),
      sections: rows.length,
    }
  }).sort((a, b) => b.quality - a.quality || b.instr - a.instr)
}

// True when the per-professor scores spread enough that the class average
// hides a real difference.
function variesByProf(profs) {
  if (profs.length < 2) return false
  const spread = (key) => Math.max(...profs.map(p => p[key])) - Math.min(...profs.map(p => p[key]))
  return spread('quality') >= 0.3 || spread('instr') >= 0.3
}

// dir: the natural "best first" direction for each column
const COLS = [
  { key: 'quality', label: 'Quality', abbr: 'Qual', dir: -1 },
  { key: 'instr',   label: 'Instructor', abbr: 'Instr', dir: -1 },
  { key: 'prepHrs', label: 'Prep hrs', abbr: 'Prep', dir: 1 },
]

const AVG = (() => {
  const m = (key) => RANKED.reduce((s, { ev }) => s + ev[key], 0) / RANKED.length
  return { quality: m('quality'), instr: m('instr'), prepHrs: m('prepHrs') }
})()

function Select({ value, set, options, isSet }) {
  return (
    <div className={'select' + (isSet ? ' is-set' : '')}>
      <select value={value} onChange={e => set(e.target.value)}>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
      <ChevronDown size={15} strokeWidth={2.25} />
    </div>
  )
}

function MetricCell({ value, max }) {
  return (
    <div className="pwr__metric">
      <b>{value.toFixed(1)}</b>
      <span className="pwr__bar"><span style={{ width: `${(value / max) * 100}%` }} /></span>
    </div>
  )
}

export default function PowerRankings() {
  const [search, setSearch] = useState('')
  const [unit, setUnit] = useState('All units')
  const [sortKey, setSortKey] = useState('quality')
  const [sortDir, setSortDir] = useState(-1)
  const [expanded, setExpanded] = useState(() => new Set())
  const lastToggle = useRef({})

  const setSort = (key) => {
    if (key === sortKey) { setSortDir(d => -d); return }
    setSortKey(key)
    setSortDir(COLS.find(c => c.key === key).dir)
  }

  // Single click and double click both open — the second click of a
  // double-click lands inside the window and is swallowed instead of
  // immediately re-collapsing the row.
  const toggle = (num) => {
    const now = Date.now()
    if (now - (lastToggle.current[num] ?? 0) < 350) return
    lastToggle.current[num] = now
    setExpanded(prev => {
      const n = new Set(prev)
      n.has(num) ? n.delete(num) : n.add(num)
      return n
    })
  }

  const rows = useMemo(() => {
    let list = RANKED
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(({ course: c }) => c.title.toLowerCase().includes(q)
        || c.faculty.some(f => f.toLowerCase().includes(q)) || c.number.includes(q))
    }
    if (unit !== 'All units') list = list.filter(({ course: c }) => c.units.includes(unit))
    return [...list].sort((a, b) =>
      sortDir * (a.ev[sortKey] - b.ev[sortKey])
      || (b.ev.quality - a.ev.quality)
      || (b.ev.instr - a.ev.instr)
      || (b.ev.responses - a.ev.responses)
      || a.course.title.localeCompare(b.course.title))
  }, [search, unit, sortKey, sortDir])

  return (
    <div className="page">
      <div className="wrap">
        <div className="page-head">
          <div>
            <h1 className="page-head__title">Power <em>Rankings</em></h1>
            <p className="page-head__sub">Every rated elective, stacked by student evaluations. Click a class to see each professor's own numbers — the class average can hide real differences between sections.</p>
          </div>
          <div className="page-head__meta">{RANKED.length} rated courses</div>
        </div>
        <div className="rule rule--soft" />

        <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', alignItems: 'center', marginBottom: 18 }}>
          <div className="search">
            <Search size={16} strokeWidth={2} />
            <input className="ctrl" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search courses, faculty…" />
            {search && <button className="search__clear" onClick={() => setSearch('')}><X size={14} strokeWidth={2.25} /></button>}
          </div>
          <Select value={unit} set={setUnit} options={['All units', ...UNITS]} isSet={unit !== 'All units'} />
          <span className="pwr__avg">
            Rated-elective average: <b>{AVG.quality.toFixed(1)}</b> quality · <b>{AVG.instr.toFixed(1)}</b> instructor · <b>{AVG.prepHrs.toFixed(1)}h</b> prep
          </span>
        </div>

        {rows.length === 0 ? (
          <div className="empty">
            <div className="empty__mark"><SearchX size={22} strokeWidth={1.75} /></div>
            <div className="empty__title">No rated courses match</div>
            <div className="empty__sub">Try a different search or unit.</div>
          </div>
        ) : (
          <div className="pwr__scroll">
            <table className="pwr">
              <thead>
                <tr>
                  <th className="pwr__rankhead">#</th>
                  <th>Course</th>
                  {COLS.map(c => (
                    <th key={c.key} aria-sort={sortKey === c.key ? (sortDir === -1 ? 'descending' : 'ascending') : undefined}>
                      <button className={'pwr__sort' + (sortKey === c.key ? ' is-active' : '')} onClick={() => setSort(c.key)}>
                        <span className="pwr__lbl">{c.label}</span>
                        <span className="pwr__lbl--sm">{c.abbr}</span>
                        {sortKey === c.key && (sortDir === -1 ? <ArrowDown size={12} strokeWidth={2.5} /> : <ArrowUp size={12} strokeWidth={2.5} />)}
                      </button>
                    </th>
                  ))}
                  <th className="pwr__chevhead" />
                </tr>
              </thead>
              <tbody>
                {rows.map(({ course, ev }, i) => {
                  const isOpen = expanded.has(course.number)
                  const profs = profBreakdown(ev)
                  const fallSections = getCourseSections(course.id).filter(s => s.faculty)
                  return (
                    <Fragment key={course.id}>
                      <tr className={'pwr__row' + (isOpen ? ' is-open' : '')} onClick={() => toggle(course.number)}
                        title={isOpen ? 'Hide professor breakdown' : 'Show professor breakdown'}>
                        <td><span className={'pwr__rank' + (i < 3 ? ' pwr__rank--' + (i + 1) : '')}>{i + 1}</span></td>
                        <td className="pwr__course">
                          <Link to={`/courses/${course.id}`} onClick={e => e.stopPropagation()}>{course.title}</Link>
                          {variesByProf(profs) && <span className="pwr__varies">varies by professor</span>}
                          <div className="pwr__meta">#{course.number} · {course.faculty.join(' · ')} · {course.term}</div>
                        </td>
                        <td><MetricCell value={ev.quality} max={7} /></td>
                        <td><MetricCell value={ev.instr} max={7} /></td>
                        <td><div className="pwr__metric"><b>{ev.prepHrs.toFixed(1)}</b><span className="pwr__unit">hrs</span></div></td>
                        <td className="pwr__chevcell"><ChevronRight size={15} className="pwr__chev" /></td>
                      </tr>
                      {isOpen && profs.map(p => (
                        <tr className="pwr__subrow" key={course.id + p.name}>
                          <td />
                          <td className="pwr__profcell">
                            <div className="pwr__profname">{p.name}</div>
                            <div className="pwr__profmeta">evaluated {p.terms}{p.sections > 1 ? ` · ${p.sections} sections` : ''}</div>
                          </td>
                          <td><MetricCell value={p.quality} max={7} /></td>
                          <td><MetricCell value={p.instr} max={7} /></td>
                          <td><div className="pwr__metric"><b>{p.prepHrs.toFixed(1)}</b><span className="pwr__unit">hrs</span></div></td>
                          <td />
                        </tr>
                      ))}
                      {isOpen && fallSections.length > 0 && (
                        <tr className="pwr__fallrow">
                          <td />
                          <td colSpan={5}>
                            Teaching this fall: {fallSections.map(s => `${s.section ? '§' + s.section + ' ' : ''}${s.faculty}`).join(' · ')}
                            {' — '}professors without an eval row above haven't taught it recently.
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        <p className="pwr__foot">
          Quality and instructor effectiveness are on the 1–7 evaluation scale, response-weighted
          across evaluated sections. Prep is average hours per class session. New courses without
          evaluation history aren't ranked — they're flagged in the catalog instead.
        </p>
      </div>
    </div>
  )
}
