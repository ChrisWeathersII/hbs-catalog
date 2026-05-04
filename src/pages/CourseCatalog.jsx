import { useState, useMemo, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, BookOpen, Star, ChevronDown, Plus, Check, Bookmark, X } from 'lucide-react'
import { COURSES, UNITS } from '../data/hbsCourses'

const TERMS = ['All terms', 'Fall 2026', 'January 2027', 'Spring 2027', 'Spring 2026']
const CREDITS = ['Any credits', '1.5 credits', '3.0 credits']

const UNIT_COLORS = {
  'Finance': '#1d4ed8',
  'Strategy': '#7c3aed',
  'Entrepreneurial Management': '#b45309',
  'General Management': '#065f46',
  'Marketing': '#be185d',
  'Organizational Behavior': '#0369a1',
  'Technology & Operations Management': '#92400e',
  'Accounting & Management': '#1e40af',
  'Business, Government & the International Economy': '#166534',
  'Negotiation': '#9f1239',
  'Organizations & Markets': '#9f1239',
}

function unitColor(unit) {
  return UNIT_COLORS[unit] || '#374151'
}

function AddToBuildMenu({ courseId, builds, addToBuild, getBuildIdsForCourse, createBuild }) {
  const [open, setOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [showNew, setShowNew] = useState(false)
  const ref = useRef(null)
  const savedIn = getBuildIdsForCourse(courseId)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleAdd = (buildId) => {
    addToBuild(courseId, buildId)
  }

  const handleCreate = () => {
    if (!newName.trim()) return
    const id = createBuild(newName)
    addToBuild(courseId, id)
    setNewName('')
    setShowNew(false)
    setOpen(false)
  }

  const isSaved = savedIn.length > 0

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(o => !o) }}
        title={isSaved ? 'Saved to build' : 'Add to build'}
        style={{
          background: isSaved ? 'var(--crimson-bg)' : 'var(--color-surface)',
          border: `1px solid ${isSaved ? 'var(--crimson-20)' : 'var(--color-border)'}`,
          borderRadius: 'var(--radius-sm)',
          padding: '0.375rem 0.625rem',
          display: 'flex', alignItems: 'center', gap: '0.3rem',
          cursor: 'pointer',
          fontSize: '0.75rem',
          fontWeight: 600,
          color: isSaved ? 'var(--crimson)' : 'var(--color-fg-muted)',
          whiteSpace: 'nowrap',
          transition: 'all 0.15s',
          fontFamily: 'inherit',
        }}
      >
        <Bookmark size={13} fill={isSaved ? 'currentColor' : 'none'} />
        {isSaved ? 'Saved' : 'Add to build'}
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: '100%', right: 0, marginTop: 4,
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius)',
          boxShadow: 'var(--shadow-lg)',
          minWidth: 200, zIndex: 100,
          overflow: 'hidden',
        }}>
          {builds.length === 0 ? (
            <div style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', color: 'var(--color-fg-subtle)' }}>
              No builds yet
            </div>
          ) : (
            builds.map(build => {
              const added = savedIn.includes(build.id)
              return (
                <button
                  key={build.id}
                  onClick={(e) => { e.stopPropagation(); handleAdd(build.id); setOpen(false) }}
                  style={{
                    width: '100%', textAlign: 'left',
                    padding: '0.625rem 1rem',
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    background: added ? 'var(--crimson-bg)' : 'transparent',
                    border: 'none',
                    cursor: added ? 'default' : 'pointer',
                    fontSize: '0.8125rem',
                    color: added ? 'var(--crimson)' : 'var(--color-fg)',
                    fontFamily: 'inherit',
                  }}
                  disabled={added}
                >
                  <Check size={13} style={{ opacity: added ? 1 : 0 }} />
                  <span style={{ flex: 1 }}>{build.name}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-fg-subtle)' }}>
                    {build.courseIds.length} courses
                  </span>
                </button>
              )
            })
          )}
          <div style={{ borderTop: '1px solid var(--color-border)' }}>
            {showNew ? (
              <div style={{ padding: '0.5rem 0.75rem', display: 'flex', gap: '0.375rem' }}
                onClick={e => e.stopPropagation()}>
                <input
                  autoFocus
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleCreate(); if (e.key === 'Escape') setShowNew(false) }}
                  placeholder="Build name…"
                  style={{
                    flex: 1, padding: '0.3rem 0.5rem', fontSize: '0.8125rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--color-bg)',
                    color: 'var(--color-fg)',
                    fontFamily: 'inherit',
                    outline: 'none',
                  }}
                />
                <button onClick={handleCreate}
                  style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem', fontWeight: 600, background: 'var(--crimson)', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontFamily: 'inherit' }}>
                  Add
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => { e.stopPropagation(); setShowNew(true) }}
                style={{
                  width: '100%', textAlign: 'left', padding: '0.625rem 1rem',
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  fontSize: '0.8125rem', color: 'var(--crimson)',
                  fontFamily: 'inherit',
                }}
              >
                <Plus size={13} />
                New build
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function CourseCard({ course, builds, addToBuild, getBuildIdsForCourse, createBuild }) {
  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius)',
      padding: '1rem',
      display: 'flex', flexDirection: 'column', gap: '0.5rem',
      transition: 'box-shadow 0.15s',
      position: 'relative',
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      {/* Units */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', alignItems: 'center' }}>
        {course.units.slice(0, 2).map(u => (
          <span key={u} style={{
            fontSize: '0.6875rem', fontWeight: 600,
            color: unitColor(u),
            background: `${unitColor(u)}18`,
            borderRadius: '4px', padding: '0.125rem 0.375rem',
            letterSpacing: '0.01em',
          }}>{u}</span>
        ))}
        {course.popular && (
          <span style={{
            fontSize: '0.6875rem', fontWeight: 700,
            color: '#b45309', background: '#fef3c7',
            borderRadius: '4px', padding: '0.125rem 0.375rem',
            display: 'flex', alignItems: 'center', gap: '0.2rem',
          }}>
            <Star size={10} fill="currentColor" /> Popular
          </span>
        )}
      </div>

      {/* Number + title */}
      <div>
        <div style={{ fontSize: '0.7rem', color: 'var(--color-fg-subtle)', marginBottom: '0.2rem' }}>
          #{course.number}
        </div>
        <Link
          to={`/courses/${course.id}`}
          style={{
            fontSize: '0.9375rem', fontWeight: 700,
            color: 'var(--color-fg)', textDecoration: 'none',
            lineHeight: 1.3,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {course.title}
        </Link>
      </div>

      {/* Faculty */}
      <div style={{ fontSize: '0.8rem', color: 'var(--color-fg-muted)', lineHeight: 1.3 }}>
        {course.faculty.join(', ')}
      </div>

      {/* Meta row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '0.5rem', gap: '0.5rem' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--color-fg-subtle)', display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
          <span>{course.term}</span>
          <span>·</span>
          <span>{course.credits}cr</span>
          {course.assessment && (
            <>
              <span>·</span>
              <span style={{ color: 'var(--color-fg-subtle)' }}>{course.assessment}</span>
            </>
          )}
        </div>
        <AddToBuildMenu
          courseId={course.id}
          builds={builds}
          addToBuild={addToBuild}
          getBuildIdsForCourse={getBuildIdsForCourse}
          createBuild={createBuild}
        />
      </div>
    </div>
  )
}

export default function CourseCatalog({ builds, addToBuild, getBuildIdsForCourse, createBuild }) {
  const [search, setSearch] = useState('')
  const [unit, setUnit] = useState('All units')
  const [term, setTerm] = useState('All terms')
  const [credits, setCredits] = useState('Any credits')

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
    if (unit !== 'All units') {
      list = list.filter(c => c.units.includes(unit))
    }
    if (term !== 'All terms') {
      list = list.filter(c => c.term === term)
    }
    if (credits !== 'Any credits') {
      const cr = parseFloat(credits)
      list = list.filter(c => c.credits === cr)
    }
    return list
  }, [search, unit, term, credits])

  const clearFilters = () => { setSearch(''); setUnit('All units'); setTerm('All terms'); setCredits('Any credits') }
  const hasFilters = search || unit !== 'All units' || term !== 'All terms' || credits !== 'Any credits'

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '1.5rem 1.5rem 3rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.375rem' }}>
          <BookOpen size={22} style={{ color: 'var(--crimson)' }} />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>HBS Elective Catalog</h1>
        </div>
        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-fg-muted)' }}>
          119 electives · AY 2026-2027. Save courses to builds to plan your schedule.
        </p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.625rem', marginBottom: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: '1 1 240px', minWidth: 200 }}>
          <Search size={15} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-fg-subtle)', pointerEvents: 'none' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search courses, faculty, areas…"
            style={{
              width: '100%', paddingLeft: 32, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
              border: '1px solid var(--color-border)', borderRadius: 'var(--radius)',
              background: 'var(--color-surface)', color: 'var(--color-fg)',
              fontSize: '0.875rem', fontFamily: 'inherit', outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Unit filter */}
        <select
          value={unit}
          onChange={e => setUnit(e.target.value)}
          style={{
            padding: '0.5rem 0.75rem', border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius)', background: 'var(--color-surface)',
            color: 'var(--color-fg)', fontSize: '0.875rem', fontFamily: 'inherit',
            cursor: 'pointer',
          }}
        >
          <option>All units</option>
          {UNITS.map(u => <option key={u}>{u}</option>)}
        </select>

        {/* Term filter */}
        <select
          value={term}
          onChange={e => setTerm(e.target.value)}
          style={{
            padding: '0.5rem 0.75rem', border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius)', background: 'var(--color-surface)',
            color: 'var(--color-fg)', fontSize: '0.875rem', fontFamily: 'inherit',
            cursor: 'pointer',
          }}
        >
          {TERMS.map(t => <option key={t}>{t}</option>)}
        </select>

        {/* Credits filter */}
        <select
          value={credits}
          onChange={e => setCredits(e.target.value)}
          style={{
            padding: '0.5rem 0.75rem', border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius)', background: 'var(--color-surface)',
            color: 'var(--color-fg)', fontSize: '0.875rem', fontFamily: 'inherit',
            cursor: 'pointer',
          }}
        >
          {CREDITS.map(c => <option key={c}>{c}</option>)}
        </select>

        {hasFilters && (
          <button onClick={clearFilters} style={{
            display: 'flex', alignItems: 'center', gap: '0.3rem',
            padding: '0.5rem 0.75rem',
            border: '1px solid var(--color-border)', borderRadius: 'var(--radius)',
            background: 'var(--color-surface)', color: 'var(--color-fg-muted)',
            fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'inherit',
          }}>
            <X size={13} /> Clear
          </button>
        )}
      </div>

      {/* Count */}
      <div style={{ fontSize: '0.8125rem', color: 'var(--color-fg-subtle)', marginBottom: '1rem' }}>
        {filtered.length === COURSES.length
          ? `${filtered.length} courses`
          : `${filtered.length} of ${COURSES.length} courses`}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-fg-subtle)', fontSize: '0.9rem' }}>
          No courses match your filters.
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '0.875rem',
        }}>
          {filtered.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              builds={builds}
              addToBuild={addToBuild}
              getBuildIdsForCourse={getBuildIdsForCourse}
              createBuild={createBuild}
            />
          ))}
        </div>
      )}
    </div>
  )
}
