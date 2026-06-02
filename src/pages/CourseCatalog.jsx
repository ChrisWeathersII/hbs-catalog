import { useState, useMemo, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Plus, Check, Bookmark, X, Repeat, Calendar, SlidersHorizontal } from 'lucide-react'
import { COURSES, UNITS, getCourseSchedule, getCourseSections } from '../data/hbsCourses'

const TERMS = ['All terms', 'Fall 2026', 'Spring 2027']
const CREDITS = ['Any credits', '1.5 credits', '3.0 credits']

// A course counts as "once-weekly" if any of its sections has a fixed weekday
// (e.g. Wed-only War & Peace, Tue-only late seminars, Thu IFCs, Mon joint-degree).
// Courses with weekday: null alternate Mon/Tue or Thu/Fri.
function matchesOnceWeeklyDays(course, days) {
  if (days.size === 0) return true
  const sections = getCourseSections(course.id)
  return sections.some(s => s.weekday != null && days.has(s.weekday))
}

// Assessment filter
const ASSESSMENT_TYPES = ['Paper', 'Exam', 'Project', 'Presentation']
function matchesAssessment(course, selected) {
  if (selected.size === 0) return true
  const a = (course.assessment || '').toLowerCase()
  if (selected.has('Paper') && a.includes('paper')) return true
  if (selected.has('Exam') && a.includes('exam')) return true
  if (selected.has('Project') && a.includes('project')) return true
  if (selected.has('Presentation') && a.includes('presentation')) return true
  return false
}

// Day filter — applies to all courses with scheduling data, regardless of term.
// Courses without any COURSE_SECTIONS data fall through and always show.
function matchesDay(course, dayFilter) {
  if (dayFilter === 'All') return true
  const dt = getCourseSchedule(course.id)?.dayType ?? null
  if (!dt) return true
  if (dayFilter === 'X') return dt === 'X'
  if (dayFilter === 'W') return dt === 'W'
  if (dayFilter === 'Y') return dt === 'Y'
  return true
}

// Re-export the canonical scheduleLabel from data layer for backwards compat
export { scheduleLabel } from '../data/hbsCourses'

function fmtTime12(t) {
  const [h, m] = t.split(':').map(Number)
  const ampm = h >= 12 ? 'pm' : 'am'
  const hh = h > 12 ? h - 12 : h
  return `${hh}:${String(m).padStart(2, '0')}${ampm}`
}

// Group sections by day type so courses like Negotiation (X+Y) display sensibly
function groupByDayType(sections) {
  const groups = {}
  for (const s of sections) {
    if (!groups[s.dayType]) groups[s.dayType] = []
    groups[s.dayType].push(s)
  }
  return groups
}

const DAY_BADGE = {
  X: { label: 'X day', bg: '#eff6ff', color: '#1d4ed8' },
  Y: { label: 'Y day', bg: '#f0fdf4', color: '#15803d' },
  W: { label: 'Wed',   bg: '#fffbeb', color: '#b45309' },
}
// When a section has a fixed weekday (e.g. Crafting Your Life on Tue only),
// show the specific day instead of the generic "X day" / "Y day" label.
// Keeps the color from dayType so X-blue / Y-green / W-amber stays consistent.
const WEEKDAY_SHORT = { MON: 'Mon', TUE: 'Tue', WED: 'Wed', THU: 'Thu', FRI: 'Fri' }
function badgeFor(sched) {
  if (!sched) return null
  const base = DAY_BADGE[sched.dayType]
  if (!base) return null
  const label = sched.weekday ? WEEKDAY_SHORT[sched.weekday] : base.label
  return { ...base, label }
}

// ── Save dropdown ────────────────────────────────────────────────────────────

function SaveMenu({ courseId, builds, addToBuild, getBuildIdsForCourse, createBuild }) {
  const [open, setOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [showNew, setShowNew] = useState(false)
  const ref = useRef(null)
  const savedIn = getBuildIdsForCourse(courseId)
  const isSaved = savedIn.length > 0

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) { setOpen(false); setShowNew(false) } }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleCreate = () => {
    if (!newName.trim()) return
    const id = createBuild(newName)
    addToBuild(courseId, id)
    setNewName(''); setShowNew(false); setOpen(false)
  }

  return (
    <div ref={ref} style={{ position: 'relative', flexShrink: 0 }}>
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(o => !o) }}
        title={isSaved ? 'Saved to build' : 'Save to build'}
        style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem',
          color: isSaved ? '#A41034' : '#d1d5db',
          display: 'flex', alignItems: 'center',
          transition: 'color 0.15s',
        }}
        onMouseEnter={e => { if (!isSaved) e.currentTarget.style.color = '#A41034' }}
        onMouseLeave={e => { if (!isSaved) e.currentTarget.style.color = '#d1d5db' }}
      >
        <Bookmark size={17} fill={isSaved ? 'currentColor' : 'none'} strokeWidth={1.75} />
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: '100%', right: 0, marginTop: 6,
          background: '#fff', border: '1px solid #e5e7eb',
          borderRadius: '0.625rem',
          boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
          minWidth: 210, zIndex: 100, overflow: 'hidden',
        }}>
          {builds.length === 0
            ? <div style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', color: '#9ca3af' }}>No builds yet</div>
            : builds.map(build => {
                const added = savedIn.includes(build.id)
                return (
                  <button key={build.id} disabled={added}
                    onClick={(e) => { e.stopPropagation(); addToBuild(courseId, build.id); setOpen(false) }}
                    style={{
                      width: '100%', textAlign: 'left', padding: '0.625rem 1rem',
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      background: added ? '#fff1f2' : 'transparent',
                      border: 'none', cursor: added ? 'default' : 'pointer',
                      fontSize: '0.8125rem', color: added ? '#A41034' : '#374151', fontFamily: 'inherit',
                    }}>
                    <Check size={13} style={{ opacity: added ? 1 : 0, flexShrink: 0 }} />
                    <span style={{ flex: 1 }}>{build.name}</span>
                    <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{build.courseIds.length}</span>
                  </button>
                )
              })
          }
          <div style={{ borderTop: '1px solid #f3f4f6' }}>
            {showNew ? (
              <div style={{ padding: '0.5rem 0.75rem', display: 'flex', gap: '0.375rem' }} onClick={e => e.stopPropagation()}>
                <input autoFocus value={newName}
                  onChange={e => setNewName(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleCreate(); if (e.key === 'Escape') setShowNew(false) }}
                  placeholder="Build name…"
                  style={{ flex: 1, padding: '0.3rem 0.5rem', fontSize: '0.8125rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem', fontFamily: 'inherit', outline: 'none' }}
                />
                <button onClick={handleCreate}
                  style={{ padding: '0.3rem 0.625rem', fontSize: '0.75rem', fontWeight: 600, background: '#A41034', color: '#fff', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                  Add
                </button>
              </div>
            ) : (
              <button onClick={(e) => { e.stopPropagation(); setShowNew(true) }}
                style={{ width: '100%', textAlign: 'left', padding: '0.625rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.8125rem', color: '#A41034', fontFamily: 'inherit' }}>
                <Plus size={13} /> New build
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Course card ───────────────────────────────────────────────────────────────

function CourseCard({ course, builds, addToBuild, getBuildIdsForCourse, createBuild }) {
  const [hovered, setHovered] = useState(false)
  const sections = getCourseSections(course.id)
  const sched = sections[0] ?? null
  const dayBadge = badgeFor(sched)
  const isMulti = sections.length > 1

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff', border: '1px solid #e5e7eb', borderRadius: '0.75rem',
        padding: '1.125rem 1.25rem 0', display: 'flex', flexDirection: 'column',
        boxShadow: hovered ? '0 4px 16px rgba(0,0,0,0.08)' : '0 1px 3px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-1px)' : 'none',
        transition: 'box-shadow 0.18s, transform 0.18s',
      }}
    >
      {/* Top row: tags + number + day badge + save icon */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem', gap: '0.5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', alignItems: 'center' }}>
          {course.units.slice(0, 2).map(u => (
            <span key={u} style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#9f1239', background: '#fff1f2', borderRadius: '20px', padding: '0.15rem 0.5rem', whiteSpace: 'nowrap' }}>{u}</span>
          ))}
          <span style={{ fontSize: '0.6875rem', color: '#9ca3af', fontWeight: 500 }}>#{course.number}</span>
          {course.popular && (
            <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#9f1239', background: '#fff1f2', borderRadius: '20px', padding: '0.15rem 0.5rem' }}>🔥 Popular</span>
          )}
          {dayBadge && (
            <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: dayBadge.color, background: dayBadge.bg, borderRadius: '20px', padding: '0.15rem 0.5rem' }}>
              {dayBadge.label}
            </span>
          )}
          {isMulti && (
            <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#0369a1', background: '#dbeafe', borderRadius: '20px', padding: '0.15rem 0.5rem', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
              <Repeat size={10} /> {sections.length} sections — pick a time
            </span>
          )}
        </div>
        <SaveMenu courseId={course.id} builds={builds} addToBuild={addToBuild} getBuildIdsForCourse={getBuildIdsForCourse} createBuild={createBuild} />
      </div>

      {/* Title */}
      <Link to={`/courses/${course.id}`} style={{ fontSize: '0.9875rem', fontWeight: 700, lineHeight: 1.35, color: '#111827', textDecoration: 'none', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '0.375rem' }}>
        {course.title}
      </Link>

      {/* Faculty */}
      <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginBottom: '0.875rem', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {course.faculty.join(', ')}
      </div>

      {/* Bottom meta */}
      <div style={{ borderTop: '1px solid #f3f4f6', padding: '0.625rem 0', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        {sched && !isMulti && (
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: dayBadge?.color || '#374151' }}>
            {dayBadge?.label ?? ''} · {fmtTime12(sched.timeSlot.split('-')[0])} · {sched.qTerm}
          </span>
        )}
        {sched && isMulti && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {Object.entries(groupByDayType(sections)).map(([dayType, dtSections]) => {
              // If every section in this dayType group shares one weekday, label
              // the group with that day (e.g. "Tue" for Crafting Your Life).
              const sharedWeekday = dtSections.every(s => s.weekday === dtSections[0].weekday) ? dtSections[0].weekday : null
              const groupLabel = sharedWeekday ? WEEKDAY_SHORT[sharedWeekday] : (DAY_BADGE[dayType]?.label || dayType)
              return (
              <div key={dayType} style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: '0.7rem', fontWeight: 800,
                  color: DAY_BADGE[dayType]?.color || '#374151',
                  background: DAY_BADGE[dayType]?.bg || '#f3f4f6',
                  borderRadius: 4, padding: '1px 6px',
                }}>
                  {groupLabel}
                </span>
                {dtSections.map(s => (
                  <span key={s.section} style={{
                    fontSize: '0.72rem', fontWeight: 700,
                    color: DAY_BADGE[dayType]?.color || '#374151',
                    background: '#fff',
                    border: `1px solid ${DAY_BADGE[dayType]?.color}33`,
                    borderRadius: 4, padding: '1px 5px',
                    display: 'inline-flex', alignItems: 'center', gap: 3,
                  }}>
                    <span style={{ fontSize: '0.6rem', opacity: 0.7, fontFamily: 'monospace' }}>§{s.section}</span>
                    {fmtTime12(s.timeSlot.split('-')[0])}
                  </span>
                ))}
              </div>
              )
            })}
          </div>
        )}
        <span style={{ fontSize: '0.775rem', color: '#9ca3af' }}>
          {course.term} · {course.credits}cr{course.assessment ? ` · ${course.assessment}` : ''}
        </span>
      </div>
    </div>
  )
}

// ── Main catalog page ─────────────────────────────────────────────────────────

export default function CourseCatalog({ builds, addToBuild, getBuildIdsForCourse, createBuild }) {
  const [search, setSearch]   = useState('')
  const [unit, setUnit]       = useState('All units')
  const [term, setTerm]       = useState('All terms')
  const [credits, setCredits] = useState('Any credits')
  const [dayFilter, setDayFilter] = useState('All')
  const [assessmentFilter, setAssessmentFilter] = useState(new Set())
  const [multiOnly, setMultiOnly] = useState(false)
  const [popularOnly, setPopularOnly] = useState(false)
  const [onceWeeklyDays, setOnceWeeklyDays] = useState(new Set())
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 640)
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  const [filtersOpen, setFiltersOpen] = useState(false)
  const activeFilterCount = (unit !== 'All units' ? 1 : 0) + (term !== 'All terms' ? 1 : 0) + (credits !== 'Any credits' ? 1 : 0) + (dayFilter !== 'All' ? 1 : 0) + assessmentFilter.size + (multiOnly ? 1 : 0) + (popularOnly ? 1 : 0) + onceWeeklyDays.size

  const toggleAssessment = (type) => {
    setAssessmentFilter(prev => {
      const next = new Set(prev)
      next.has(type) ? next.delete(type) : next.add(type)
      return next
    })
  }

  const toggleOnceWeeklyDay = (day) => {
    setOnceWeeklyDays(prev => {
      const next = new Set(prev)
      next.has(day) ? next.delete(day) : next.add(day)
      return next
    })
  }

  const filtered = useMemo(() => {
    let list = COURSES
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.faculty.some(f => f.toLowerCase().includes(q)) ||
        c.units.some(u => u.toLowerCase().includes(q)) ||
        c.number.includes(q)
      )
    }
    if (unit !== 'All units')    list = list.filter(c => c.units.includes(unit))
    if (term !== 'All terms')    list = list.filter(c => c.term === term)
    if (credits !== 'Any credits') list = list.filter(c => c.credits === parseFloat(credits))
    list = list.filter(c => matchesDay(c, dayFilter))
    list = list.filter(c => matchesAssessment(c, assessmentFilter))
    if (multiOnly) list = list.filter(c => getCourseSections(c.id).length > 1)
    if (popularOnly) list = list.filter(c => c.popular)
    list = list.filter(c => matchesOnceWeeklyDays(c, onceWeeklyDays))
    return list
  }, [search, unit, term, credits, dayFilter, assessmentFilter, multiOnly, popularOnly, onceWeeklyDays])

  const hasFilters = search || unit !== 'All units' || term !== 'All terms' || credits !== 'Any credits' || dayFilter !== 'All' || assessmentFilter.size > 0 || multiOnly || popularOnly || onceWeeklyDays.size > 0
  const clearFilters = () => { setSearch(''); setUnit('All units'); setTerm('All terms'); setCredits('Any credits'); setDayFilter('All'); setAssessmentFilter(new Set()); setMultiOnly(false); setPopularOnly(false); setOnceWeeklyDays(new Set()) }

  const selectStyle = { padding: '0.5rem 0.875rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', background: '#fff', color: '#111827', fontSize: '0.875rem', fontFamily: 'inherit', cursor: 'pointer', outline: 'none' }

  const dayOptions = [
    { value: 'All', label: isMobile ? 'All' : 'All days',    title: 'All days' },
    { value: 'X',   label: isMobile ? 'X'   : 'X (Mon/Tue)', title: 'X day — Mon/Tue' },
    { value: 'Y',   label: isMobile ? 'Y'   : 'Y (Thu/Fri)', title: 'Y day — Thu/Fri' },
  ]

  return (
    <div style={{ background: '#f9f7f6', minHeight: 'calc(100vh - 56px)' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '2rem 1.5rem 3rem' }}>

        {/* Header */}
        <div style={{ marginBottom: isMobile ? '0.875rem' : '1.75rem' }}>
          <h1 style={{ fontSize: isMobile ? '1.375rem' : '1.625rem', fontWeight: 800, margin: '0 0 0.25rem', color: '#111827', letterSpacing: '-0.02em' }}>Elective Catalog</h1>
          {!isMobile && (
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#6b7280' }}>Every HBS elective in one place. Save courses to builds to plan your schedule.</p>
          )}
        </div>

        {/* Row 1: Search + (mobile: Filters toggle) + (desktop: unit + term + credits) */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: '1 1 200px', minWidth: 0 }}>
            <Search size={14} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', pointerEvents: 'none' }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder={isMobile ? 'Search…' : 'Search courses, faculty, areas…'}
              style={{ ...selectStyle, width: '100%', paddingLeft: 32, boxSizing: 'border-box' }} />
          </div>
          {isMobile ? (
            <button onClick={() => setFiltersOpen(o => !o)}
              style={{
                ...selectStyle, display: 'flex', alignItems: 'center', gap: '0.3rem',
                padding: '0.5rem 0.75rem',
                background: filtersOpen || activeFilterCount > 0 ? '#fff1f2' : '#fff',
                borderColor: filtersOpen || activeFilterCount > 0 ? '#A41034' : '#e5e7eb',
                color: filtersOpen || activeFilterCount > 0 ? '#A41034' : '#374151',
                fontWeight: 600,
              }}>
              <SlidersHorizontal size={14} />
              Filters
              {activeFilterCount > 0 && (
                <span style={{ fontSize: '0.7rem', background: '#A41034', color: '#fff', borderRadius: 10, padding: '0.05rem 0.4rem', fontWeight: 700 }}>
                  {activeFilterCount}
                </span>
              )}
            </button>
          ) : (
            <>
              <select value={unit}    onChange={e => setUnit(e.target.value)}    style={selectStyle}>
                <option>All units</option>
                {UNITS.map(u => <option key={u}>{u}</option>)}
              </select>
              <select value={term}    onChange={e => setTerm(e.target.value)}    style={selectStyle}>
                {TERMS.map(t => <option key={t}>{t}</option>)}
              </select>
              <select value={credits} onChange={e => setCredits(e.target.value)} style={selectStyle}>
                {CREDITS.map(c => <option key={c}>{c}</option>)}
              </select>
            </>
          )}
        </div>

        {/* Mobile-only: dropdowns inside collapsible panel */}
        {isMobile && filtersOpen && (
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <select value={unit}    onChange={e => setUnit(e.target.value)}    style={{ ...selectStyle, flex: '1 1 100%' }}>
              <option>All units</option>
              {UNITS.map(u => <option key={u}>{u}</option>)}
            </select>
            <select value={term}    onChange={e => setTerm(e.target.value)}    style={{ ...selectStyle, flex: '1 1 calc(50% - 0.25rem)' }}>
              {TERMS.map(t => <option key={t}>{t}</option>)}
            </select>
            <select value={credits} onChange={e => setCredits(e.target.value)} style={{ ...selectStyle, flex: '1 1 calc(50% - 0.25rem)' }}>
              {CREDITS.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        )}

        {/* Row 2: Day filter + Assessment filter pills — hidden on mobile when filters collapsed */}
        <div style={{ display: isMobile && !filtersOpen ? 'none' : 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Day filter — segmented pills */}
          <div style={{ display: 'flex', gap: '0.25rem', background: '#f3f4f6', borderRadius: '0.5rem', padding: '0.2rem' }}>
            {dayOptions.map(({ value, label, title }) => (
              <button key={value} onClick={() => setDayFilter(value)} title={title}
                style={{
                  padding: '0.3rem 0.625rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer',
                  fontSize: '0.8rem', fontWeight: 600, fontFamily: 'inherit',
                  background: dayFilter === value ? '#fff' : 'transparent',
                  color: dayFilter === value ? '#111827' : '#6b7280',
                  boxShadow: dayFilter === value ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.15s',
                  whiteSpace: 'nowrap',
                }}>
                {value === 'X' ? <><span style={{ color: '#1d4ed8' }}>●</span> {label}</> :
                 value === 'Y' ? <><span style={{ color: '#15803d' }}>●</span> {label}</> :
                 label}
              </button>
            ))}
          </div>

          {/* Assessment filter — toggle pills */}
          <div style={{ display: 'flex', gap: '0.375rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: 500 }}>Final:</span>
            {ASSESSMENT_TYPES.map(type => {
              const active = assessmentFilter.has(type)
              return (
                <button key={type} onClick={() => toggleAssessment(type)}
                  style={{
                    padding: '0.3rem 0.625rem', borderRadius: '20px', border: '1px solid',
                    borderColor: active ? '#A41034' : '#e5e7eb',
                    background: active ? '#fff1f2' : '#fff',
                    color: active ? '#A41034' : '#6b7280',
                    fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                    transition: 'all 0.15s',
                  }}>
                  {type}
                </button>
              )
            })}
          </div>

          {/* Multi-section filter — for spotting courses with section choice */}
          <button onClick={() => setMultiOnly(o => !o)}
            title="Only show courses with multiple sections (i.e. multiple time options)"
            style={{
              padding: '0.3rem 0.625rem', borderRadius: '20px',
              border: `1px solid ${multiOnly ? '#0369a1' : '#e5e7eb'}`,
              background: multiOnly ? '#dbeafe' : '#fff',
              color: multiOnly ? '#0369a1' : '#6b7280',
              fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', gap: '0.3rem',
            }}>
            <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', opacity: 0.8 }}>§§</span>
            Multi-section only
          </button>

          {/* Popular filter — high-demand courses flagged in data */}
          <button onClick={() => setPopularOnly(o => !o)}
            title="Only show courses flagged as popular (high-demand electives)"
            style={{
              padding: '0.3rem 0.625rem', borderRadius: '20px',
              border: `1px solid ${popularOnly ? '#A41034' : '#e5e7eb'}`,
              background: popularOnly ? '#fff1f2' : '#fff',
              color: popularOnly ? '#A41034' : '#6b7280',
              fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', gap: '0.3rem',
            }}>
            <span style={{ fontSize: '0.85rem' }}>🔥</span>
            Popular only
          </button>

          {/* Once-weekly filter — pick specific fixed-weekday seminar days (Tue late, Wed War & Peace, Thu IFCs) */}
          <div style={{ display: 'flex', gap: '0.375rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <Calendar size={12} /> Once per week:
            </span>
            {[
              { day: 'TUE', label: 'Tue' },
              { day: 'WED', label: 'Wed' },
              { day: 'THU', label: 'Thu' },
            ].map(({ day, label }) => {
              const active = onceWeeklyDays.has(day)
              return (
                <button key={day} onClick={() => toggleOnceWeeklyDay(day)}
                  title={`Only show courses that meet only on ${label}`}
                  style={{
                    padding: '0.3rem 0.625rem', borderRadius: '20px',
                    border: `1px solid ${active ? '#0e7490' : '#e5e7eb'}`,
                    background: active ? '#cffafe' : '#fff',
                    color: active ? '#0e7490' : '#6b7280',
                    fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                    transition: 'all 0.15s',
                  }}>
                  {label}
                </button>
              )
            })}
          </div>

          {hasFilters && (
            <button onClick={clearFilters}
              style={{ ...selectStyle, display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#6b7280', padding: '0.35rem 0.625rem' }}>
              <X size={12} /> Clear all
            </button>
          )}
        </div>

        {/* Count */}
        <p style={{ fontSize: '0.8125rem', color: '#9ca3af', margin: '0 0 1.125rem' }}>
          {filtered.length === COURSES.length ? `${filtered.length} courses` : `${filtered.length} of ${COURSES.length} courses`}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#9ca3af', fontSize: '0.9rem' }}>
            No courses match your filters.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '1rem' }}>
            {filtered.map(course => (
              <CourseCard key={course.id} course={course}
                builds={builds} addToBuild={addToBuild}
                getBuildIdsForCourse={getBuildIdsForCourse} createBuild={createBuild}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
