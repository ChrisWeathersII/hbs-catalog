import { useState, useRef, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Bookmark, Check, Plus, Loader, Clock } from 'lucide-react'
import { COURSES, getCourseSections, scheduleLabel } from '../data/hbsCourses'

const DAY_COLOR = { X: '#1d4ed8', Y: '#15803d', W: '#b45309' }
const DAY_BG    = { X: '#dbeafe', Y: '#bbf7d0', W: '#fde68a' }
const DAY_LABEL = { X: 'X day · Mon/Tue', Y: 'Y day · Thu/Fri', W: 'Wednesday' }

function fmtTime(t) {
  const [h, m] = t.split(':').map(Number)
  const ampm = h >= 12 ? 'pm' : 'am'
  const hh = h > 12 ? h - 12 : h
  return `${hh}:${String(m).padStart(2, '0')}${ampm}`
}
function fmtSlot(slot) {
  const [s, e] = slot.split('-')
  return `${fmtTime(s)} – ${fmtTime(e)}`
}

function SaveMenu({ courseId, builds, addToBuild, getBuildIdsForCourse, createBuild, sections, setBuildSection }) {
  const [open, setOpen] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [newName, setNewName] = useState('')
  const ref = useRef(null)
  const savedIn = getBuildIdsForCourse(courseId)
  const isSaved = savedIn.length > 0
  const isMulti = sections.length > 1

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) { setOpen(false); setShowNew(false) } }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleAddToBuild = (buildId) => {
    addToBuild(courseId, buildId)
    // For multi-section courses, set the first section as default if not already chosen
    if (isMulti) {
      const build = builds.find(b => b.id === buildId)
      if (build && !build.sections?.[courseId]) {
        setBuildSection(buildId, courseId, sections[0].section)
      }
    }
    setOpen(false)
  }

  const handleCreate = () => {
    if (!newName.trim()) return
    const id = createBuild(newName)
    addToBuild(courseId, id)
    if (isMulti) setBuildSection(id, courseId, sections[0].section)
    setNewName(''); setShowNew(false); setOpen(false)
  }

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        display: 'flex', alignItems: 'center', gap: '0.4rem',
        padding: '0.5rem 1rem',
        background: isSaved ? '#fff1f2' : '#A41034',
        border: isSaved ? '1px solid #fecdd3' : 'none',
        borderRadius: '0.5rem',
        color: isSaved ? '#A41034' : '#fff',
        fontSize: '0.875rem', fontWeight: 600,
        cursor: 'pointer', fontFamily: 'inherit',
      }}>
        <Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} />
        {isSaved ? `Saved (${savedIn.length})` : 'Save to build'}
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', right: 0, marginTop: 6,
          background: '#fff', border: '1px solid #e5e7eb',
          borderRadius: '0.625rem',
          boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
          minWidth: 240, zIndex: 100, overflow: 'hidden',
        }}>
          {builds.length === 0
            ? <div style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', color: '#9ca3af' }}>No builds yet</div>
            : builds.map(build => {
                const added = savedIn.includes(build.id)
                return (
                  <button key={build.id} disabled={added}
                    onClick={() => !added && handleAddToBuild(build.id)}
                    style={{
                      width: '100%', textAlign: 'left', padding: '0.625rem 1rem',
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      background: added ? '#fff1f2' : 'transparent',
                      border: 'none', cursor: added ? 'default' : 'pointer',
                      fontSize: '0.8125rem', color: added ? '#A41034' : '#374151',
                      fontFamily: 'inherit',
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
              <div style={{ padding: '0.5rem 0.75rem', display: 'flex', gap: '0.375rem' }}>
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
              <button onClick={() => setShowNew(true)} style={{
                width: '100%', textAlign: 'left', padding: '0.625rem 1rem',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                background: 'transparent', border: 'none', cursor: 'pointer',
                fontSize: '0.8125rem', color: '#A41034', fontFamily: 'inherit',
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

// ── Section list / picker ───────────────────────────────────────────────────
function SectionsBlock({ courseId, sections, builds, setBuildSection, getBuildIdsForCourse }) {
  if (sections.length === 0) return null

  // Builds that contain this course
  const memberBuilds = builds.filter(b => b.courseIds.includes(courseId))
  const isMulti = sections.length > 1

  return (
    <div style={{
      background: '#fff', border: '1px solid #e5e7eb', borderRadius: '0.75rem',
      padding: '1rem 1.25rem', marginBottom: '1.25rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 700, color: '#111827', marginBottom: '0.75rem' }}>
        <Clock size={15} style={{ color: '#6b7280' }} />
        {isMulti ? `${sections.length} sections available` : 'Meeting times'}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {sections.map(s => {
          const dayColor = DAY_COLOR[s.dayType] || '#374151'
          return (
            <div key={s.section ?? 'only'} style={{
              display: 'flex', alignItems: 'center', gap: '0.625rem',
              padding: '0.625rem 0.75rem',
              background: '#f9fafb', border: '1px solid #f3f4f6', borderRadius: '0.5rem',
              flexWrap: 'wrap',
            }}>
              {s.section && (
                <span style={{
                  fontSize: '0.7rem', fontWeight: 800, flexShrink: 0,
                  color: dayColor, background: '#fff',
                  border: `1px solid ${dayColor}33`,
                  borderRadius: 4, padding: '2px 6px',
                  fontFamily: 'var(--font-mono)',
                }}>
                  §{s.section}
                </span>
              )}
              <span style={{
                fontSize: '0.7rem', fontWeight: 700, flexShrink: 0,
                color: dayColor, background: DAY_BG[s.dayType],
                borderRadius: 10, padding: '2px 8px',
              }}>
                {DAY_LABEL[s.dayType]}{s.weekday ? ` · ${s.weekday[0] + s.weekday.slice(1).toLowerCase()}` : ''}
              </span>
              <span style={{ fontSize: '0.875rem', color: '#111827', fontWeight: 600 }}>
                {fmtSlot(s.timeSlot)}
              </span>
              <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                {s.qTerm}
              </span>
              {s.faculty && (
                <span style={{ fontSize: '0.75rem', color: '#9ca3af', flex: 1, textAlign: 'right' }}>
                  {s.faculty}
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* Per-build section picker, only when multi-section AND course is in builds */}
      {isMulti && memberBuilds.length > 0 && (
        <div style={{ marginTop: '0.875rem', paddingTop: '0.875rem', borderTop: '1px solid #f3f4f6' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Pick the section for each build
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {memberBuilds.map(build => {
              const chosen = build.sections?.[courseId] ?? sections[0].section
              return (
                <div key={build.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#111827', minWidth: 110 }}>
                    {build.name}
                  </span>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {sections.map(s => {
                      const active = chosen === s.section
                      return (
                        <button key={s.section} onClick={() => setBuildSection(build.id, courseId, s.section)}
                          style={{
                            padding: '0.3rem 0.625rem', borderRadius: 6,
                            border: `1px solid ${active ? '#A41034' : '#e5e7eb'}`,
                            background: active ? '#fff1f2' : '#fff',
                            color: active ? '#A41034' : '#374151',
                            fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                            display: 'flex', alignItems: 'center', gap: 4,
                          }}>
                          <span style={{ fontFamily: 'var(--font-mono)', opacity: 0.7 }}>§{s.section}</span>
                          {fmtSlot(s.timeSlot)}{s.faculty ? ` · ${s.faculty.split(';')[0]}` : ''}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <p style={{ margin: '0.75rem 0 0', fontSize: '0.78rem', color: '#9ca3af', fontStyle: 'italic' }}>
        X and Y days don't map to fixed weekdays — see the EC calendar for the week-by-week rotation.
      </p>
    </div>
  )
}

export default function CourseDetail({ builds, addToBuild, getBuildIdsForCourse, createBuild, setBuildSection }) {
  const { id } = useParams()
  const course = COURSES.find(c => c.id === id)
  const [desc, setDesc] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!course) return
    setLoading(true); setError(false)
    // 10s timeout so the spinner doesn't hang forever if the upstream
    // catalog scraper is slow or down.
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 10_000)
    fetch(`/api/catalog/${course.number}`, { signal: controller.signal })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => { setDesc(data); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
      .finally(() => clearTimeout(timer))
    return () => { clearTimeout(timer); controller.abort() }
  }, [course?.number])

  if (!course) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', color: '#6b7280' }}>
        Course not found. <Link to="/courses" style={{ color: '#A41034' }}>← Back to catalog</Link>
      </div>
    )
  }

  const sections = getCourseSections(course.id)

  return (
    <div style={{ background: '#f9f7f6', minHeight: 'calc(100vh - 56px)' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '1.5rem 1.5rem 4rem' }}>

        <Link to="/courses" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
          color: '#6b7280', fontSize: '0.875rem', textDecoration: 'none',
          marginBottom: '1.25rem',
        }}>
          <ArrowLeft size={14} /> All courses
        </Link>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '0.75rem' }}>
          {course.units.map(u => (
            <span key={u} style={{
              fontSize: '0.75rem', fontWeight: 600, color: '#9f1239',
              background: '#fff1f2', borderRadius: '20px', padding: '0.2rem 0.625rem',
            }}>{u}</span>
          ))}
          {course.popular && (
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#9f1239', background: '#fff1f2', borderRadius: '20px', padding: '0.2rem 0.625rem' }}>
              🔥 Popular
            </span>
          )}
          {sections.length > 1 && (
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0369a1', background: '#dbeafe', borderRadius: '20px', padding: '0.2rem 0.625rem' }}>
              {sections.length} sections
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.75rem' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.875rem', fontWeight: 600, lineHeight: 1.15, margin: 0, color: '#111827', letterSpacing: '-0.012em' }}>
            {course.title}
          </h1>
          <SaveMenu courseId={course.id} builds={builds} addToBuild={addToBuild}
            getBuildIdsForCourse={getBuildIdsForCourse} createBuild={createBuild}
            sections={sections} setBuildSection={setBuildSection} />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem 0.5rem', fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.625rem' }}>
          <span>#{course.number}</span>
          <span>·</span>
          <span>{course.term}</span>
          <span>·</span>
          <span>{course.credits} credits</span>
          {course.assessment && <><span>·</span><span>Final: {course.assessment}</span></>}
        </div>

        <div style={{ fontSize: '0.9rem', color: '#374151', marginBottom: '1rem' }}>
          <span style={{ color: '#9ca3af' }}>Faculty: </span>
          {course.faculty.join(', ')}
        </div>

        <a href={`https://www.hbs.edu/coursecatalog/${course.number}.html`}
          target="_blank" rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
            fontSize: '0.8125rem', color: '#A41034', textDecoration: 'none',
            padding: '0.4rem 0.75rem',
            border: '1px solid #fecdd3', borderRadius: '0.5rem',
            background: '#fff1f2', fontWeight: 500,
            marginBottom: '1.25rem',
          }}>
          <ExternalLink size={13} /> View on HBS course catalog
        </a>

        <SectionsBlock
          courseId={course.id}
          sections={sections}
          builds={builds}
          setBuildSection={setBuildSection}
          getBuildIdsForCourse={getBuildIdsForCourse}
        />

        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '0.75rem', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f3f4f6' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', fontWeight: 600, margin: 0, color: '#111827' }}>About this course</h2>
          </div>
          <div style={{ padding: '1.25rem 1.5rem' }}>
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', color: '#9ca3af', fontSize: '0.875rem', padding: '1rem 0' }}>
                <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />
                Loading course description…
              </div>
            ) : error ? (
              <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                Description unavailable. <a href={`https://www.hbs.edu/coursecatalog/${course.number}.html`} target="_blank" rel="noopener noreferrer" style={{ color: '#A41034' }}>View on HBS catalog →</a>
              </div>
            ) : desc?.paragraphs?.length ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {desc.paragraphs.map((p, i) => (
                  <p key={i} style={{ margin: 0, fontSize: '0.9375rem', lineHeight: 1.7, color: '#374151' }}>{p}</p>
                ))}
              </div>
            ) : (
              <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                No description found. <a href={`https://www.hbs.edu/coursecatalog/${course.number}.html`} target="_blank" rel="noopener noreferrer" style={{ color: '#A41034' }}>View on HBS catalog →</a>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
