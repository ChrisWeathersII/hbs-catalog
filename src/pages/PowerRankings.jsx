import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, X, ChevronDown, ArrowUp, ArrowDown, SearchX } from 'lucide-react'
import { COURSES, UNITS } from '../data/hbsCourses'
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

// dir: the natural "best first" direction for each column
const COLS = [
  { key: 'quality', label: 'Quality', dir: -1 },
  { key: 'instr',   label: 'Instructor', dir: -1 },
  { key: 'prepHrs', label: 'Prep hrs', dir: 1 },
]

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

  const setSort = (key) => {
    if (key === sortKey) { setSortDir(d => -d); return }
    setSortKey(key)
    setSortDir(COLS.find(c => c.key === key).dir)
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
            <p className="page-head__sub">Every rated elective, stacked by student evaluations. Click a column to re-rank; click a course for the section-level detail.</p>
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
                        {c.label}
                        {sortKey === c.key && (sortDir === -1 ? <ArrowDown size={12} strokeWidth={2.5} /> : <ArrowUp size={12} strokeWidth={2.5} />)}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(({ course, ev }, i) => (
                  <tr key={course.id}>
                    <td><span className={'pwr__rank' + (i < 3 ? ' pwr__rank--' + (i + 1) : '')}>{i + 1}</span></td>
                    <td className="pwr__course">
                      <Link to={`/courses/${course.id}`}>{course.title}</Link>
                      <div className="pwr__meta">#{course.number} · {course.faculty.join(' · ')} · {course.term}</div>
                    </td>
                    <td><MetricCell value={ev.quality} max={7} /></td>
                    <td><MetricCell value={ev.instr} max={7} /></td>
                    <td><div className="pwr__metric"><b>{ev.prepHrs.toFixed(1)}</b><span className="pwr__unit">hrs</span></div></td>
                  </tr>
                ))}
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
