import { useState, useMemo, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Plus, Check, Bookmark, X, Repeat, Calendar, SlidersHorizontal, ChevronDown, Flame, SearchX } from 'lucide-react'
import { COURSES, UNITS, getCourseSections } from '../data/hbsCourses'

// Re-export the canonical scheduleLabel from the data layer (backwards compat)
export { scheduleLabel } from '../data/hbsCourses'

const TERMS = ['All terms', 'Fall 2026', 'Spring 2027']
const CREDITS = ['Any credits', '1.5 credits', '3.0 credits']
const ASSESSMENT_TYPES = ['Paper', 'Exam', 'Project', 'Presentation']
const WEEKDAY_SHORT = { MON: 'Mon', TUE: 'Tue', WED: 'Wed', THU: 'Thu', FRI: 'Fri' }
const DAY_FULL = { X: 'X · Mon/Tue', Y: 'Y · Thu/Fri', W: 'Wed' }

const getSections = (id) => getCourseSections(id)

function fmtTime(t) {
  const [h, m] = t.split(':').map(Number)
  const ap = h >= 12 ? 'pm' : 'am'
  const hh = h > 12 ? h - 12 : (h === 0 ? 12 : h)
  return `${hh}:${String(m).padStart(2, '0')}${ap}`
}
function fmtTerm(q) {
  return { Q1Q2: 'Q1–Q2', S1S2: 'S1–S2' }[q] || q
}
function groupByDayType(sections) {
  const g = {}
  for (const s of sections) (g[s.dayType] ||= []).push(s)
  return g
}
function dayClass(dt) { return dt === 'X' ? 'x' : dt === 'Y' ? 'y' : 'w' }

function matchesOnceWeekly(course, days) {
  if (days.size === 0) return true
  return getSections(course.id).some(s => s.weekday != null && days.has(s.weekday))
}
function matchesAssessment(course, sel) {
  if (sel.size === 0) return true
  const a = (course.assessment || '').toLowerCase()
  if (sel.has('Paper') && a.includes('paper')) return true
  if (sel.has('Exam') && a.includes('exam')) return true
  if (sel.has('Project') && a.includes('project')) return true
  if (sel.has('Presentation') && a.includes('presentation')) return true
  return false
}
function matchesDay(course, dayFilter) {
  if (dayFilter === 'All') return true
  const dt = getSections(course.id)[0]?.dayType ?? null
  if (!dt) return true
  return dt === dayFilter
}

// ── Save-to-build menu ────────────────────────────────────────────────────────
function SaveMenu({ courseId, builds, addToBuild, getBuildIdsForCourse, createBuild }) {
  const [open, setOpen] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [name, setName] = useState('')
  const ref = useRef(null)
  const savedIn = getBuildIdsForCourse(courseId)
  const isSaved = savedIn.length > 0

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) { setOpen(false); setShowNew(false) } }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const create = () => {
    if (!name.trim()) return
    const id = createBuild(name); addToBuild(courseId, id)
    setName(''); setShowNew(false); setOpen(false)
  }

  return (
    <div className="save" ref={ref}>
      <button className={'save__btn' + (isSaved ? ' is-saved' : '')}
        title={isSaved ? 'Saved to build' : 'Save to build'}
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(o => !o) }}>
        <Bookmark size={18} strokeWidth={1.75} fill={isSaved ? 'currentColor' : 'none'} />
      </button>
      {open && (
        <div className="menu" onClick={e => e.stopPropagation()}>
          <div className="menu__head">Save to build</div>
          {builds.length === 0
            ? <div style={{ padding: '4px 13px 12px', fontSize: 13, color: 'var(--ink-400)' }}>No builds yet</div>
            : builds.map(b => {
                const added = savedIn.includes(b.id)
                return (
                  <button key={b.id} className={'menu__item' + (added ? ' is-added' : '')} disabled={added}
                    onClick={() => { addToBuild(courseId, b.id); setOpen(false) }}>
                    <Check size={14} style={{ opacity: added ? 1 : 0 }} />
                    <span>{b.name}</span>
                    <span className="menu__count">{b.courseIds.length}</span>
                  </button>
                )
              })}
          <div className="menu__foot">
            {showNew ? (
              <div className="menu__form">
                <input autoFocus value={name} placeholder="Build name…"
                  onChange={e => setName(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') create(); if (e.key === 'Escape') setShowNew(false) }} />
                <button onClick={create}>Add</button>
              </div>
            ) : (
              <button className="menu__new" onClick={() => setShowNew(true)}><Plus size={14} strokeWidth={2.25} /> New build</button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Course card ───────────────────────────────────────────────────────────────
function CourseCard({ course, builds, addToBuild, getBuildIdsForCourse, createBuild }) {
  const sections = getSections(course.id)
  const sched = sections[0] ?? null
  const isMulti = sections.length > 1

  return (
    <article className="card">
      <div className="card__top">
        <div className="card__tags">
          {course.units.slice(0, 2).map(u => <span key={u} className="chip chip--unit">{u}</span>)}
          {course.popular && <span className="chip chip--popular"><Flame size={11} /> Popular</span>}
          {isMulti && <span className="chip chip--multi"><Repeat size={11} strokeWidth={2.25} /> {sections.length} sections</span>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <span className="card__num">#{course.number}</span>
          <SaveMenu courseId={course.id} builds={builds} addToBuild={addToBuild}
            getBuildIdsForCourse={getBuildIdsForCourse} createBuild={createBuild} />
        </div>
      </div>

      <Link className="card__title" to={`/courses/${course.id}`}>{course.title}</Link>
      <div className="card__faculty">{course.faculty.join(' · ')}</div>

      <div className="card__spacer" />

      <div className="card__foot">
        {sched && !isMulti && (
          <div className={'sched dayfg-' + dayClass(sched.dayType)}>
            <span className="sched__day">
              <span className={'dot dot--' + dayClass(sched.dayType)} />
              {sched.weekday ? WEEKDAY_SHORT[sched.weekday] : DAY_FULL[sched.dayType]}
            </span>
            <span className="sched__sep">·</span>
            <span className="sched__time">{fmtTime(sched.timeSlot.split('-')[0])}</span>
            <span className="sched__sep">·</span>
            <span style={{ color: 'var(--ink-500)', fontWeight: 600 }}>{fmtTerm(sched.qTerm)}</span>
          </div>
        )}
        {sched && isMulti && (
          <div className="sections">
            {Object.entries(groupByDayType(sections)).map(([dt, secs]) => {
              const shared = secs.every(s => s.weekday === secs[0].weekday) ? secs[0].weekday : null
              const label = shared ? WEEKDAY_SHORT[shared] : DAY_FULL[dt]
              const c = dayClass(dt)
              return (
                <div className="secrow" key={dt}>
                  <span className={'secrow__label chip--day-' + c}>{label}</span>
                  {secs.map(s => (
                    <span className="sectag" key={String(s.section) + dt}
                      style={{ borderColor: `var(--${c}-line)`, color: `var(--${c}-fg)` }}>
                      <em>§{s.section}</em>{fmtTime(s.timeSlot.split('-')[0])}
                    </span>
                  ))}
                </div>
              )
            })}
          </div>
        )}
        <div className="meta">
          <span>{course.term}</span><span className="dotsep" />
          <span>{course.credits} cr</span>
          {course.assessment && <><span className="dotsep" /><span>{course.assessment}</span></>}
        </div>
      </div>
    </article>
  )
}

// ── Unified select ────────────────────────────────────────────────────────────
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

// ── Filter pill row ───────────────────────────────────────────────────────────
function FilterRow({ st }) {
  const dayOptions = [
    { v: 'All', label: 'All days' },
    { v: 'X', label: 'X · Mon/Tue', dot: 'x' },
    { v: 'Y', label: 'Y · Thu/Fri', dot: 'y' },
  ]
  return (
    <div className="filters">
      <div className="seg">
        {dayOptions.map(o => (
          <button key={o.v} className={'seg__btn' + (st.dayFilter === o.v ? ' is-active' : '')}
            onClick={() => st.setDayFilter(o.v)}>
            {o.dot && <span className={'dot dot--' + o.dot} />}{o.label}
          </button>
        ))}
      </div>

      <span className="fdiv" />
      <div className="fgroup">
        <span className="flabel">Final</span>
        {ASSESSMENT_TYPES.map(t => (
          <button key={t} className={'fpill' + (st.assess.has(t) ? ' is-active' : '')}
            onClick={() => st.toggleAssess(t)}>{t}</button>
        ))}
      </div>

      <span className="fdiv" />
      <button className={'fpill' + (st.multiOnly ? ' is-active' : '')} onClick={() => st.setMultiOnly(v => !v)}
        title="Courses offering multiple section times">
        <span className="fpill__mono">§§</span> Multi-section
      </button>
      <button className={'fpill' + (st.popularOnly ? ' is-active' : '')} onClick={() => st.setPopularOnly(v => !v)}
        title="High-demand electives">
        <Flame size={13} /> Popular
      </button>

      <span className="fdiv" />
      <div className="fgroup">
        <span className="flabel"><Calendar size={13} /> Meets</span>
        {[['TUE', 'Tue'], ['WED', 'Wed'], ['THU', 'Thu']].map(([d, l]) => (
          <button key={d} className={'fpill' + (st.onceDays.has(d) ? ' is-active' : '')}
            onClick={() => st.toggleOnceDay(d)} title={`Meets only on ${l}`}>{l}</button>
        ))}
      </div>

      {st.hasFilters && (
        <button className="fclear" onClick={st.clear} style={{ marginLeft: 'auto' }}><X size={13} strokeWidth={2.25} /> Clear all</button>
      )}
    </div>
  )
}

// ── Catalog page ──────────────────────────────────────────────────────────────
export default function CourseCatalog({ builds, addToBuild, getBuildIdsForCourse, createBuild }) {
  const [search, setSearch] = useState('')
  const [unit, setUnit] = useState('All units')
  const [term, setTerm] = useState('All terms')
  const [credits, setCredits] = useState('Any credits')
  const [dayFilter, setDayFilter] = useState('All')
  const [assess, setAssess] = useState(new Set())
  const [multiOnly, setMultiOnly] = useState(false)
  const [popularOnly, setPopularOnly] = useState(false)
  const [onceDays, setOnceDays] = useState(new Set())
  const [mOpen, setMOpen] = useState(false)

  const toggleSet = (setter) => (v) => setter(prev => { const n = new Set(prev); n.has(v) ? n.delete(v) : n.add(v); return n })
  const toggleAssess = toggleSet(setAssess)
  const toggleOnceDay = toggleSet(setOnceDays)

  const filtered = useMemo(() => {
    let list = COURSES
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(c => c.title.toLowerCase().includes(q) || c.faculty.some(f => f.toLowerCase().includes(q))
        || c.units.some(u => u.toLowerCase().includes(q)) || c.number.includes(q))
    }
    if (unit !== 'All units') list = list.filter(c => c.units.includes(unit))
    if (term !== 'All terms') list = list.filter(c => c.term === term)
    if (credits !== 'Any credits') list = list.filter(c => c.credits === parseFloat(credits))
    list = list.filter(c => matchesDay(c, dayFilter))
    list = list.filter(c => matchesAssessment(c, assess))
    if (multiOnly) list = list.filter(c => getSections(c.id).length > 1)
    if (popularOnly) list = list.filter(c => c.popular)
    list = list.filter(c => matchesOnceWeekly(c, onceDays))
    return list
  }, [search, unit, term, credits, dayFilter, assess, multiOnly, popularOnly, onceDays])

  const hasFilters = Boolean(search || unit !== 'All units' || term !== 'All terms' || credits !== 'Any credits'
    || dayFilter !== 'All' || assess.size || multiOnly || popularOnly || onceDays.size)
  const clear = () => { setSearch(''); setUnit('All units'); setTerm('All terms'); setCredits('Any credits')
    setDayFilter('All'); setAssess(new Set()); setMultiOnly(false); setPopularOnly(false); setOnceDays(new Set()) }

  const activeCount = (unit !== 'All units') + (term !== 'All terms') + (credits !== 'Any credits')
    + (dayFilter !== 'All') + assess.size + (multiOnly ? 1 : 0) + (popularOnly ? 1 : 0) + onceDays.size

  const chips = []
  if (unit !== 'All units') chips.push(['unit', unit, () => setUnit('All units')])
  if (term !== 'All terms') chips.push(['term', term, () => setTerm('All terms')])
  if (credits !== 'Any credits') chips.push(['cr', credits, () => setCredits('Any credits')])
  if (dayFilter !== 'All') chips.push(['day', DAY_FULL[dayFilter], () => setDayFilter('All')])
  ;[...assess].forEach(a => chips.push(['a' + a, 'Final: ' + a, () => toggleAssess(a)]))
  if (multiOnly) chips.push(['multi', 'Multi-section', () => setMultiOnly(false)])
  if (popularOnly) chips.push(['pop', 'Popular', () => setPopularOnly(false)])
  ;[...onceDays].forEach(d => chips.push(['o' + d, 'Meets: ' + WEEKDAY_SHORT[d], () => toggleOnceDay(d)]))

  const st = { dayFilter, setDayFilter, assess, toggleAssess, multiOnly, setMultiOnly, popularOnly, setPopularOnly,
    onceDays, toggleOnceDay, hasFilters, clear }
  const cardProps = { builds, addToBuild, getBuildIdsForCourse, createBuild }

  return (
    <div className="page">
      <div className="wrap">
        <div className="page-head">
          <div>
            <h1 className="page-head__title">The Elective <em>Catalog</em></h1>
            <p className="page-head__sub">Every HBS elective for the year, in one place. Save courses into builds to shape your schedule.</p>
          </div>
          <div className="page-head__meta">AY 2026–2027 · {COURSES.length} courses</div>
        </div>
        <div className="rule rule--soft" />

        {/* Row 1 — search + dropdowns */}
        <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', alignItems: 'center', marginBottom: 14 }}>
          <div className="search">
            <Search size={16} strokeWidth={2} />
            <input className="ctrl" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search courses, faculty, areas…" />
            {search && <button className="search__clear" onClick={() => setSearch('')}><X size={14} strokeWidth={2.25} /></button>}
          </div>
          <div className="toolbar-desktop" style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
            <Select value={unit} set={setUnit} options={['All units', ...UNITS]} isSet={unit !== 'All units'} />
            <Select value={term} set={setTerm} options={TERMS} isSet={term !== 'All terms'} />
            <Select value={credits} set={setCredits} options={CREDITS} isSet={credits !== 'Any credits'} />
          </div>
          <button className="fpill m-filterbtn mobile-only" style={{ height: 40, padding: '0 14px' }}
            onClick={() => setMOpen(o => !o)}>
            <SlidersHorizontal size={14} /> Filters
            {activeCount > 0 && <span style={{ fontFamily: 'var(--font-mono)', background: 'var(--crimson-600)', color: '#fff', borderRadius: 99, padding: '1px 6px', fontSize: 10 }}>{activeCount}</span>}
          </button>
        </div>

        {/* Mobile dropdown panel */}
        {mOpen && (
          <div className="mobile-only" style={{ display: 'flex', gap: 9, flexWrap: 'wrap', marginBottom: 14 }}>
            <Select value={unit} set={setUnit} options={['All units', ...UNITS]} isSet={unit !== 'All units'} />
            <Select value={term} set={setTerm} options={TERMS} isSet={term !== 'All terms'} />
            <Select value={credits} set={setCredits} options={CREDITS} isSet={credits !== 'Any credits'} />
          </div>
        )}

        {/* Row 2 — unified filter pills */}
        <div className={mOpen ? '' : 'toolbar-desktop'}><FilterRow st={st} /></div>

        {/* Active filter summary */}
        {chips.length > 0 && (
          <div className="activechips" style={{ marginTop: 14 }}>
            {chips.map(([k, label, onX]) => (
              <span className="achip" key={k}>{label}<button onClick={onX}><X size={12} strokeWidth={2.5} /></button></span>
            ))}
          </div>
        )}

        {/* Count */}
        <p className="count">
          <b>{filtered.length}</b>
          {filtered.length === COURSES.length ? 'courses' : `of ${COURSES.length} courses`}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="grid"><div className="empty">
            <div className="empty__mark"><SearchX size={22} strokeWidth={1.75} /></div>
            <div className="empty__title">No courses match your filters</div>
            <div className="empty__sub">Try loosening a filter or clearing your search.</div>
            <button className="empty__btn" onClick={clear}><X size={14} strokeWidth={2.25} /> Clear all filters</button>
          </div></div>
        ) : (
          <div className="grid">
            {filtered.map(c => <CourseCard key={c.id} course={c} {...cardProps} />)}
          </div>
        )}
      </div>
    </div>
  )
}
