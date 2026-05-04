import { useState, useRef, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Star, ExternalLink, Bookmark, Check, Plus, BookOpen, GraduationCap, Clock, FileText } from 'lucide-react'
import { COURSES } from '../data/hbsCourses'

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

function AddToBuildDropdown({ courseId, builds, addToBuild, getBuildIdsForCourse, createBuild }) {
  const [open, setOpen] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [newName, setNewName] = useState('')
  const ref = useRef(null)
  const savedIn = getBuildIdsForCourse(courseId)
  const isSaved = savedIn.length > 0

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleCreate = () => {
    if (!newName.trim()) return
    const id = createBuild(newName)
    addToBuild(courseId, id)
    setNewName('')
    setShowNew(false)
    setOpen(false)
  }

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.625rem 1.125rem',
          background: isSaved ? 'var(--crimson-bg)' : 'var(--crimson)',
          border: isSaved ? '1px solid var(--crimson-20)' : 'none',
          borderRadius: 'var(--radius)',
          color: isSaved ? 'var(--crimson)' : '#fff',
          fontSize: '0.9rem', fontWeight: 600,
          cursor: 'pointer', fontFamily: 'inherit',
          transition: 'all 0.15s',
        }}
      >
        <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
        {isSaved ? `Saved (${savedIn.length})` : 'Add to build'}
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, marginTop: 6,
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius)',
          boxShadow: 'var(--shadow-lg)',
          minWidth: 220, zIndex: 100,
          overflow: 'hidden',
        }}>
          {builds.length === 0 ? (
            <div style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', color: 'var(--color-fg-subtle)' }}>No builds yet</div>
          ) : builds.map(build => {
            const added = savedIn.includes(build.id)
            return (
              <button
                key={build.id}
                disabled={added}
                onClick={() => { addToBuild(courseId, build.id); setOpen(false) }}
                style={{
                  width: '100%', textAlign: 'left', padding: '0.625rem 1rem',
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  background: added ? 'var(--crimson-bg)' : 'transparent',
                  border: 'none', cursor: added ? 'default' : 'pointer',
                  fontSize: '0.8125rem',
                  color: added ? 'var(--crimson)' : 'var(--color-fg)',
                  fontFamily: 'inherit',
                }}
              >
                <Check size={13} style={{ opacity: added ? 1 : 0 }} />
                <span style={{ flex: 1 }}>{build.name}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-fg-subtle)' }}>{build.courseIds.length} courses</span>
              </button>
            )
          })}
          <div style={{ borderTop: '1px solid var(--color-border)' }}>
            {showNew ? (
              <div style={{ padding: '0.5rem 0.75rem', display: 'flex', gap: '0.375rem' }}>
                <input
                  autoFocus value={newName}
                  onChange={e => setNewName(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleCreate(); if (e.key === 'Escape') setShowNew(false) }}
                  placeholder="Build name…"
                  style={{
                    flex: 1, padding: '0.3rem 0.5rem', fontSize: '0.8125rem',
                    border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
                    background: 'var(--color-bg)', color: 'var(--color-fg)',
                    fontFamily: 'inherit', outline: 'none',
                  }}
                />
                <button onClick={handleCreate}
                  style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem', fontWeight: 600, background: 'var(--crimson)', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontFamily: 'inherit' }}>
                  Add
                </button>
              </div>
            ) : (
              <button onClick={() => setShowNew(true)} style={{
                width: '100%', textAlign: 'left', padding: '0.625rem 1rem',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                background: 'transparent', border: 'none', cursor: 'pointer',
                fontSize: '0.8125rem', color: 'var(--crimson)', fontFamily: 'inherit',
              }}>
                <Plus size={13} /> New build
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function CourseDetail({ builds, addToBuild, getBuildIdsForCourse, createBuild }) {
  const { id } = useParams()
  const course = COURSES.find(c => c.id === id)

  if (!course) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--color-fg-muted)' }}>Course not found.</p>
        <Link to="/courses" style={{ color: 'var(--crimson)', fontSize: '0.9rem' }}>← Back to catalog</Link>
      </div>
    )
  }

  const savedIn = getBuildIdsForCourse(course.id)
  const buildNames = savedIn.map(id => builds.find(b => b.id === id)?.name).filter(Boolean)

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '1.5rem 1.5rem 3rem' }}>
      {/* Back link */}
      <Link to="/courses" style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
        color: 'var(--color-fg-muted)', fontSize: '0.875rem', textDecoration: 'none',
        marginBottom: '1.25rem',
      }}>
        <ArrowLeft size={15} /> All courses
      </Link>

      {/* Units */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.75rem' }}>
        {course.units.map(u => (
          <span key={u} style={{
            fontSize: '0.75rem', fontWeight: 600,
            color: unitColor(u), background: `${unitColor(u)}18`,
            borderRadius: '4px', padding: '0.2rem 0.5rem',
          }}>{u}</span>
        ))}
        {course.popular && (
          <span style={{
            fontSize: '0.75rem', fontWeight: 700,
            color: '#b45309', background: '#fef3c7',
            borderRadius: '4px', padding: '0.2rem 0.5rem',
            display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
          }}>
            <Star size={11} fill="currentColor" /> Popular
          </span>
        )}
      </div>

      {/* Title + save button */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.75rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0, lineHeight: 1.2, flex: 1 }}>
          {course.title}
        </h1>
        <AddToBuildDropdown
          courseId={course.id}
          builds={builds}
          addToBuild={addToBuild}
          getBuildIdsForCourse={getBuildIdsForCourse}
          createBuild={createBuild}
        />
      </div>

      {/* Saved-in badges */}
      {buildNames.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '0.75rem' }}>
          {buildNames.map(name => (
            <span key={name} style={{
              fontSize: '0.75rem', fontWeight: 600,
              color: 'var(--crimson)', background: 'var(--crimson-bg)',
              borderRadius: '20px', padding: '0.2rem 0.625rem',
              display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
            }}>
              <Bookmark size={10} fill="currentColor" /> {name}
            </span>
          ))}
        </div>
      )}

      {/* Meta */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '1rem',
        fontSize: '0.875rem', color: 'var(--color-fg-muted)',
        marginBottom: '1.25rem', paddingBottom: '1.25rem',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <BookOpen size={15} style={{ color: 'var(--color-fg-subtle)' }} />
          #{course.number}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <Clock size={15} style={{ color: 'var(--color-fg-subtle)' }} />
          {course.term}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <GraduationCap size={15} style={{ color: 'var(--color-fg-subtle)' }} />
          {course.credits} credits
        </span>
        {course.assessment && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <FileText size={15} style={{ color: 'var(--color-fg-subtle)' }} />
            {course.assessment}
          </span>
        )}
      </div>

      {/* Faculty */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-fg-subtle)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.375rem' }}>
          Faculty
        </div>
        <div style={{ fontSize: '0.9375rem', color: 'var(--color-fg)' }}>
          {course.faculty.join(' · ')}
        </div>
      </div>

      {/* HBS Catalog link */}
      <a
        href={`https://www.hbs.edu/coursecatalog/${course.number}.html`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
          fontSize: '0.875rem', color: 'var(--crimson)', textDecoration: 'none',
          padding: '0.5rem 0.875rem',
          border: '1px solid var(--crimson-20)',
          borderRadius: 'var(--radius)',
          background: 'var(--crimson-bg)',
          fontWeight: 500,
          marginBottom: '1.5rem',
          transition: 'all 0.15s',
        }}
      >
        <ExternalLink size={14} />
        View on HBS course catalog
      </a>

      {/* Info card */}
      <div style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius)',
        padding: '1.25rem',
        marginBottom: '1.5rem',
      }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 0.75rem 0' }}>Course details</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.875rem' }}>
          {[
            { label: 'Term', value: course.term },
            { label: 'Credits', value: `${course.credits} credit${course.credits !== 1 ? 's' : ''}` },
            { label: 'Assessment', value: course.assessment || 'See catalog' },
            { label: 'Units', value: course.units.join(', ') },
          ].map(({ label, value }) => (
            <div key={label}>
              <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--color-fg-subtle)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>{label}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-fg)' }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Builds section */}
      <div style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius)',
        padding: '1.25rem',
      }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 0.75rem 0' }}>
          {savedIn.length > 0 ? 'Saved in your builds' : 'Add to a build'}
        </h2>
        {savedIn.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {buildNames.map(name => (
              <div key={name} style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                fontSize: '0.875rem', color: 'var(--crimson)',
              }}>
                <Bookmark size={14} fill="currentColor" /> {name}
              </div>
            ))}
            <Link to="/builds" style={{ fontSize: '0.8125rem', color: 'var(--color-fg-muted)', textDecoration: 'none', marginTop: '0.25rem' }}>
              View my builds →
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-fg-muted)' }}>
              Save this course to a build to plan your schedule.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <AddToBuildDropdown
                courseId={course.id}
                builds={builds}
                addToBuild={addToBuild}
                getBuildIdsForCourse={getBuildIdsForCourse}
                createBuild={createBuild}
              />
              <Link to="/builds" style={{ fontSize: '0.8125rem', color: 'var(--color-fg-muted)', textDecoration: 'none' }}>
                Manage builds →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
