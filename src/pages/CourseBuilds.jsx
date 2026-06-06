import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Trash2, Pencil, Check, X, BookMarked, ChevronDown, ChevronRight, Bookmark, Copy, Smartphone, Wifi, WifiOff, Loader, MessageSquarePlus, MessageSquare } from 'lucide-react'
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
  if (term === 'Fall 2026')   return 0
  if (term === 'Spring 2027') return 1
  return 2
}

// ── Inline note editor ────────────────────────────────────────────────────────
function CourseNote({ buildId, courseId, value, onSave }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value ?? '')
  const hasNote = !!value

  const save = () => { onSave(buildId, courseId, draft); setEditing(false) }
  const cancel = () => { setDraft(value ?? ''); setEditing(false) }

  if (editing) {
    return (
      <div style={{ display: 'flex', gap: '0.375rem', alignItems: 'flex-start', marginTop: '0.375rem' }}>
        <textarea
          autoFocus
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) save()
            if (e.key === 'Escape') cancel()
          }}
          placeholder="Why is this on the list? (must-have, backup, heard X said…)"
          rows={2}
          style={{
            flex: 1, padding: '0.4rem 0.5rem', fontSize: '0.78rem',
            border: '1px solid var(--crimson-20, #fecdd3)', borderRadius: 'var(--radius-sm, 4px)',
            background: '#fff', color: 'var(--color-fg, #111827)',
            fontFamily: 'inherit', outline: 'none', resize: 'vertical', lineHeight: 1.4,
          }}
        />
        <button onClick={save} title="Save (⌘+Enter)"
          style={{ padding: '0.3rem 0.5rem', background: 'var(--crimson, #A41034)', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm, 4px)', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 700, fontFamily: 'inherit' }}>
          <Check size={11} />
        </button>
        <button onClick={cancel} title="Cancel"
          style={{ padding: '0.3rem 0.5rem', background: 'none', border: '1px solid #e5e7eb', borderRadius: 'var(--radius-sm, 4px)', cursor: 'pointer', color: '#9ca3af' }}>
          <X size={11} />
        </button>
      </div>
    )
  }

  if (!hasNote) {
    return (
      <button onClick={() => setEditing(true)}
        style={{
          marginTop: '0.25rem',
          display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
          padding: '0.15rem 0.4rem', background: 'transparent', border: 'none',
          color: '#9ca3af', cursor: 'pointer', fontSize: '0.7rem', fontFamily: 'inherit',
        }}>
        <MessageSquarePlus size={11} /> Add note
      </button>
    )
  }

  return (
    <div onClick={() => setEditing(true)}
      style={{
        marginTop: '0.375rem', padding: '0.4rem 0.55rem',
        background: '#fffbeb', border: '1px solid #fde68a',
        borderRadius: 'var(--radius-sm, 4px)',
        cursor: 'pointer', display: 'flex', alignItems: 'flex-start', gap: '0.4rem',
      }}
      title="Click to edit">
      <MessageSquare size={11} style={{ color: '#b45309', flexShrink: 0, marginTop: 2 }} />
      <span style={{ fontSize: '0.78rem', color: '#92400e', whiteSpace: 'pre-wrap', lineHeight: 1.4 }}>
        {value}
      </span>
    </div>
  )
}

function BuildCard({ build, onDelete, onRename, onRemoveCourse, onSetNote, defaultOpen }) {
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
          <span style={{ fontWeight: 600 }}>{courses.length} course{courses.length === 1 ? '' : 's'}</span>
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
                padding: '0.75rem 1.25rem',
                borderBottom: i < courses.length - 1 ? '1px solid var(--color-border-light)' : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {/* Term dot */}
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                    background: course.term === 'Fall 2026' ? '#2563eb' : '#059669',
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
                <div style={{ marginLeft: '1.25rem' }}>
                  <CourseNote
                    buildId={build.id}
                    courseId={course.id}
                    value={build.notes?.[course.id]}
                    onSave={onSetNote}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

function SyncPanel({ syncCode, syncStatus, linkDevice }) {
  const [copied, setCopied] = useState(false)
  const [showLink, setShowLink] = useState(false)
  const [linkInput, setLinkInput] = useState('')
  const [linkError, setLinkError] = useState('')
  const [linking, setLinking] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(syncCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleLink = async () => {
    setLinking(true)
    setLinkError('')
    const result = await linkDevice(linkInput)
    setLinking(false)
    if (result.success) {
      setShowLink(false)
      setLinkInput('')
      window.location.reload()
    } else {
      setLinkError(result.error)
    }
  }

  const statusIcon = {
    loading:  <Loader size={12} style={{ opacity: 0.5, animation: 'spin 1s linear infinite' }} />,
    syncing:  <Loader size={12} style={{ color: '#d97706', animation: 'spin 1s linear infinite' }} />,
    synced:   <Wifi size={12} style={{ color: '#059669' }} />,
    error:    <WifiOff size={12} style={{ color: '#dc2626' }} />,
    offline:  <WifiOff size={12} style={{ color: 'var(--color-fg-subtle)' }} />,
  }[syncStatus] || null

  const statusText = {
    loading: 'Connecting…',
    syncing: 'Saving…',
    synced:  'Synced',
    error:   'Sync error',
    offline: 'Offline mode',
  }[syncStatus] || ''

  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius)',
      padding: '1rem 1.25rem',
      marginBottom: '1.5rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-fg-subtle)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.375rem' }}>
            Your sync code
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <code style={{
              fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.08em',
              color: 'var(--crimson)', fontFamily: 'var(--font-mono)',
            }}>
              {syncCode}
            </code>
            <button onClick={copy} title="Copy code" style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: copied ? '#059669' : 'var(--color-fg-subtle)',
              padding: '0.2rem', display: 'flex', alignItems: 'center',
            }}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--color-fg-subtle)' }}>
              {statusIcon} {statusText}
            </div>
          </div>
        </div>
        <button
          onClick={() => { setShowLink(o => !o); setLinkError('') }}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.375rem',
            padding: '0.5rem 0.875rem',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius)',
            background: 'var(--color-bg)',
            color: 'var(--color-fg-muted)',
            fontSize: '0.8125rem', fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          <Smartphone size={14} /> Use on another device
        </button>
      </div>

      {showLink && (
        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border-light)' }}>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-fg-muted)', marginBottom: '0.625rem' }}>
            On your other device, open My Builds and copy its sync code here. Your builds will merge to the same account.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              value={linkInput}
              onChange={e => setLinkInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLink()}
              placeholder="xxxx-xxxx"
              style={{
                padding: '0.5rem 0.75rem', fontSize: '0.9rem', fontFamily: 'var(--font-mono)',
                border: '1px solid var(--color-border)', borderRadius: 'var(--radius)',
                background: 'var(--color-surface)', color: 'var(--color-fg)',
                outline: 'none', width: 160,
              }}
            />
            <button onClick={handleLink} disabled={linking || !linkInput.trim()} style={{
              padding: '0.5rem 0.875rem', background: 'var(--crimson)', color: '#fff',
              border: 'none', borderRadius: 'var(--radius)', cursor: 'pointer',
              fontSize: '0.8125rem', fontWeight: 600, fontFamily: 'inherit',
              opacity: linking || !linkInput.trim() ? 0.6 : 1,
            }}>
              {linking ? 'Linking…' : 'Link'}
            </button>
            {linkError && <span style={{ fontSize: '0.8rem', color: '#dc2626' }}>{linkError}</span>}
          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

export default function CourseBuilds({ builds, createBuild, deleteBuild, renameBuild, removeFromBuild, setBuildNote, syncCode, syncStatus, linkDevice }) {
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
      {/* Sync panel */}
      {syncCode && <SyncPanel syncCode={syncCode} syncStatus={syncStatus} linkDevice={linkDevice} />}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.25rem' }}>
            <BookMarked size={22} style={{ color: 'var(--crimson)' }} />
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.625rem', fontWeight: 600, margin: 0, letterSpacing: '-0.012em' }}>My Builds</h1>
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
          {[['#2563eb', 'Fall 2026'], ['#059669', 'Spring 2027']].map(([color, label]) => (
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
              onSetNote={setBuildNote}
            />
          ))}
        </div>
      )}
    </div>
  )
}
