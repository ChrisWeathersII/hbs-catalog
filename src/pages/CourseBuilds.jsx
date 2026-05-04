import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Trash2, Pencil, Check, X, BookMarked, ExternalLink, ChevronDown, ChevronRight, Bookmark } from 'lucide-react'
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

function termOrder(term) {
  if (term === 'Fall 2026') return 0
  if (term === 'January 2027') return 1
  if (term === 'Spring 2027') return 2
  return 3
}

function BuildCard({ build, onDelete, onRename, onRemoveCourse, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen)
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(build.name)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const courses = build.courseIds
    .map(id => COURSES.find(c => c.id === id))
    .filter(Boolean)
    .sort((a, b) => termOrder(a.term) - termOrder(b.term) || a.title.localeCompare(b.title))

  const totalCredits = courses.reduce((s, c) => s + c.credits, 0)
  const byCreds = { 1.5: 0, 3.0: 0 }
  courses.forEach(c => { byCreds[c.credits] = (byCreds[c.credits] || 0) + 1 })

  const byTerm = {}
  courses.forEach(c => {
    byTerm[c.term] = (byTerm[c.term] || 0) + c.credits
  })

  const handleRename = () => {
    if (name.trim()) onRename(build.id, name.trim())
    setEditing(false)
  }

  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        padding: '1rem 1.25rem',
        borderBottom: open ? '1px solid var(--color-border-light)' : 'none',
        background: 'var(--color-surface)',
      }}>
        <button onClick={() => setOpen(o => !o)} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--color-fg-subtle)', padding: 0, display: 'flex', alignItems: 'center',
          flexShrink: 0,
        }}>
          {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        {editing ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
            <input
              autoFocus
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleRename(); if (e.key === 'Escape') { setName(build.name); setEditing(false) } }}
              style={{
                fontSize: '1rem', fontWeight: 700, border: 'none',
                borderBottom: '2px solid var(--crimson)',
                background: 'transparent', color: 'var(--color-fg)',
                fontFamily: 'inherit', outline: 'none', flex: 1,
              }}
            />
            <button onClick={handleRename} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-green)' }}>
              <Check size={16} />
            </button>
            <button onClick={() => { setName(build.name); setEditing(false) }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-fg-subtle)' }}>
              <X size={16} />
            </button>
          </div>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bookmark size={16} style={{ color: 'var(--crimson)', flexShrink: 0 }} fill="currentColor" />
            <span
              style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-fg)', cursor: 'pointer' }}
              onClick={() => setOpen(o => !o)}
            >
              {build.name}
            </span>
          </div>
        )}

        {/* Stats */}
        <div style={{ display: 'flex', gap: '0.625rem', fontSize: '0.8rem', color: 'var(--color-fg-muted)', flexShrink: 0 }}>
          <span style={{ fontWeight: 600 }}>{courses.length} courses</span>
          {courses.length > 0 && (
            <>
              <span>·</span>
              <span style={{ fontWeight: 600, color: 'var(--crimson)' }}>{totalCredits} credits</span>
            </>
          )}
        </div>

        {/* Actions */}
        {!editing && (
          <div style={{ display: 'flex', gap: '0.25rem', flexShrink: 0 }}>
            <button onClick={() => setEditing(true)} title="Rename"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-fg-subtle)', padding: '0.25rem', borderRadius: 'var(--radius-sm)' }}>
              <Pencil size={14} />
            </button>
            {confirmDelete ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <button onClick={() => onDelete(build.id)} style={{ background: 'var(--color-red)', border: 'none', cursor: 'pointer', color: '#fff', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontFamily: 'inherit' }}>
                  Delete
                </button>
                <button onClick={() => setConfirmDelete(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-fg-subtle)', padding: '0.25rem' }}>
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button onClick={() => setConfirmDelete(true)} title="Delete build"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-fg-subtle)', padding: '0.25rem', borderRadius: 'var(--radius-sm)' }}>
                <Trash2 size={14} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Term summary bar */}
      {open && courses.length > 0 && (
        <div style={{
          display: 'flex', gap: '1rem', padding: '0.625rem 1.25rem',
          background: 'var(--color-bg)',
          borderBottom: '1px solid var(--color-border-light)',
          flexWrap: 'wrap',
        }}>
          {Object.entries(byTerm).sort(([a], [b]) => termOrder(a) - termOrder(b)).map(([t, cr]) => (
            <div key={t} style={{ fontSize: '0.775rem' }}>
              <span style={{ fontWeight: 600, color: 'var(--color-fg-muted)' }}>{t}</span>
              <span style={{ color: 'var(--color-fg-subtle)', marginLeft: '0.3rem' }}>{cr} credits</span>
            </div>
          ))}
        </div>
      )}

      {/* Course list */}
      {open && (
        <div>
          {courses.length === 0 ? (
            <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--color-fg-subtle)', fontSize: '0.875rem' }}>
              No courses yet.{' '}
              <Link to="/courses" style={{ color: 'var(--crimson)', textDecoration: 'none' }}>Browse the catalog →</Link>
            </div>
          ) : (
            courses.map((course, i) => (
              <div key={course.id} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.75rem 1.25rem',
                borderBottom: i < courses.length - 1 ? '1px solid var(--color-border-light)' : 'none',
              }}>
                {/* Term dot */}
                <div style={{
                  width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                  background: course.term === 'Fall 2026' ? '#2563eb' : course.term === 'January 2027' ? '#d97706' : '#059669',
                }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Link to={`/courses/${course.id}`} style={{
                    fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-fg)',
                    textDecoration: 'none', display: 'block',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {course.title}
                  </Link>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-fg-subtle)', marginTop: '0.15rem' }}>
                    {course.faculty.slice(0, 2).join(', ')}
                    {course.faculty.length > 2 ? ' +more' : ''}
                    {' · '}{course.term}{' · '}{course.credits}cr
                  </div>
                </div>
                {/* Units */}
                <div style={{ display: 'flex', gap: '0.25rem', flexShrink: 0 }}>
                  {course.units.slice(0, 1).map(u => (
                    <span key={u} style={{
                      fontSize: '0.65rem', fontWeight: 600,
                      color: UNIT_COLORS[u] || '#374151',
                      background: `${UNIT_COLORS[u] || '#374151'}18`,
                      borderRadius: '3px', padding: '0.1rem 0.35rem',
                    }}>{u}</span>
                  ))}
                </div>
                <button
                  onClick={() => onRemoveCourse(course.id, build.id)}
                  title="Remove from build"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-fg-subtle)', padding: '0.25rem', flexShrink: 0, borderRadius: 'var(--radius-sm)' }}
                >
                  <X size={14} />
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default function CourseBuilds({ builds, createBuild, deleteBuild, renameBuild, removeFromBuild }) {
  const [newBuildName, setNewBuildName] = useState('')
  const [showForm, setShowForm] = useState(false)

  const handleCreate = () => {
    if (!newBuildName.trim()) return
    createBuild(newBuildName)
    setNewBuildName('')
    setShowForm(false)
  }

  const totalCourses = builds.reduce((s, b) => s + b.courseIds.length, 0)

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '1.5rem 1.5rem 3rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.25rem' }}>
            <BookMarked size={22} style={{ color: 'var(--crimson)' }} />
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>My Builds</h1>
          </div>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-fg-muted)' }}>
            {builds.length} build{builds.length !== 1 ? 's' : ''} · {totalCourses} course{totalCourses !== 1 ? 's' : ''} saved
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Link to="/courses" style={{
            display: 'flex', alignItems: 'center', gap: '0.375rem',
            padding: '0.5rem 0.875rem',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius)',
            background: 'var(--color-surface)',
            color: 'var(--color-fg-muted)',
            fontSize: '0.875rem', textDecoration: 'none', fontWeight: 500,
          }}>
            Browse catalog
          </Link>
          {showForm ? (
            <div style={{ display: 'flex', gap: '0.375rem', alignItems: 'center' }}>
              <input
                autoFocus
                value={newBuildName}
                onChange={e => setNewBuildName(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleCreate(); if (e.key === 'Escape') { setShowForm(false); setNewBuildName('') } }}
                placeholder="Build name…"
                style={{
                  padding: '0.5rem 0.75rem', fontSize: '0.875rem',
                  border: '1px solid var(--crimson-20)',
                  borderRadius: 'var(--radius)',
                  background: 'var(--color-surface)', color: 'var(--color-fg)',
                  fontFamily: 'inherit', outline: 'none', width: 180,
                }}
              />
              <button onClick={handleCreate} style={{
                padding: '0.5rem 0.875rem', background: 'var(--crimson)', color: '#fff',
                border: 'none', borderRadius: 'var(--radius)', cursor: 'pointer',
                fontSize: '0.875rem', fontWeight: 600, fontFamily: 'inherit',
              }}>
                Create
              </button>
              <button onClick={() => { setShowForm(false); setNewBuildName('') }} style={{
                background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-fg-subtle)',
              }}>
                <X size={16} />
              </button>
            </div>
          ) : (
            <button onClick={() => setShowForm(true)} style={{
              display: 'flex', alignItems: 'center', gap: '0.375rem',
              padding: '0.5rem 0.875rem',
              background: 'var(--crimson)', color: '#fff',
              border: 'none', borderRadius: 'var(--radius)', cursor: 'pointer',
              fontSize: '0.875rem', fontWeight: 600, fontFamily: 'inherit',
            }}>
              <Plus size={16} /> New build
            </button>
          )}
        </div>
      </div>

      {/* Legend */}
      {totalCourses > 0 && (
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.75rem', color: 'var(--color-fg-subtle)' }}>
          {[['#2563eb', 'Fall 2026'], ['#d97706', 'January 2027'], ['#059669', 'Spring 2027']].map(([color, label]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
              {label}
            </div>
          ))}
        </div>
      )}

      {/* Builds */}
      {builds.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '3rem',
          border: '2px dashed var(--color-border)', borderRadius: 'var(--radius)',
          color: 'var(--color-fg-subtle)',
        }}>
          <BookMarked size={36} style={{ marginBottom: '0.75rem', opacity: 0.3 }} />
          <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>No builds yet</div>
          <div style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>Create a build to start planning your schedule.</div>
          <button onClick={() => setShowForm(true)} style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
            padding: '0.5rem 1rem', background: 'var(--crimson)', color: '#fff',
            border: 'none', borderRadius: 'var(--radius)', cursor: 'pointer',
            fontSize: '0.875rem', fontWeight: 600, fontFamily: 'inherit',
          }}>
            <Plus size={15} /> Create first build
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {builds.map((build, i) => (
            <BuildCard
              key={build.id}
              build={build}
              defaultOpen={i === 0}
              onDelete={deleteBuild}
              onRename={renameBuild}
              onRemoveCourse={removeFromBuild}
            />
          ))}
        </div>
      )}
    </div>
  )
}
