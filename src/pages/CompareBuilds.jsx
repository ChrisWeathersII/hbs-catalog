import { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { GitCompareArrows, AlertTriangle, Check, MessageSquare, X } from 'lucide-react'
import { COURSES, getCourseSections, getActiveSection } from '../data/hbsCourses'

// ── Time math (shared with ScheduleView) ──────────────────────────────────────
const T_START = 8 * 60 + 30
const T_END   = 19 * 60
const T_RANGE = T_END - T_START
const toMin   = (str) => { const [h, m] = str.split(':').map(Number); return h * 60 + m }
const pct     = (t) => ((toMin(t) - T_START) / T_RANGE) * 100
const wPct    = (s, e) => ((toMin(e) - toMin(s)) / T_RANGE) * 100

const DAY_ROWS = [
  { key: 'MON', label: 'Mon', dayType: 'X', weekdays: ['MON', null], color: '#1d4ed8', bg: '#dbeafe', border: '#93c5fd', track: '#eff6ff' },
  { key: 'TUE', label: 'Tue', dayType: 'X', weekdays: ['TUE', null], color: '#1d4ed8', bg: '#dbeafe', border: '#93c5fd', track: '#eff6ff' },
  { key: 'WED', label: 'Wed', dayType: 'W', weekdays: ['WED'],       color: '#92400e', bg: '#fde68a', border: '#f59e0b', track: '#fffbeb' },
  { key: 'THU', label: 'Thu', dayType: 'Y', weekdays: ['THU', null], color: '#15803d', bg: '#bbf7d0', border: '#4ade80', track: '#f0fdf4' },
  { key: 'FRI', label: 'Fri', dayType: 'Y', weekdays: ['FRI', null], color: '#15803d', bg: '#bbf7d0', border: '#4ade80', track: '#f0fdf4' },
]
const RULER_MARKS = [
  { t: '08:30', label: '8:30' },
  { t: '11:50', label: '11:50' },
  { t: '13:30', label: '1:30' },
  { t: '15:10', label: '3:10' },
  { t: '18:00', label: '6:00' },
]
const QUARTER_COLOR = { Q1: '#7c3aed', Q2: '#0891b2', Q1Q2: '#6b7280' }

function qTermsOverlap(a, b) {
  if (a === 'Q1Q2' || b === 'Q1Q2') return true
  return a === b
}

// ── Per-build summary stats ───────────────────────────────────────────────────
function buildStats(build) {
  if (!build) return null
  let totalCr = 0, fallCr = 0, q1 = 0, q2 = 0, q1q2 = 0
  let xCnt = 0, yCnt = 0, wCnt = 0, unscheduled = 0
  let conflicts = 0
  // gather scheduled courses
  const slotMap = new Map() // key: dayType+timeSlot+weekday → qTerms[]
  for (const courseId of build.courseIds) {
    const course = COURSES.find(c => c.id === courseId)
    if (!course) continue
    totalCr += course.credits
    if (course.term === 'Fall 2026') fallCr += course.credits
    const sched = getActiveSection(courseId, build.sections)
    if (!sched) { unscheduled++; continue }
    if (sched.dayType === 'X') xCnt++
    else if (sched.dayType === 'Y') yCnt++
    else if (sched.dayType === 'W') wCnt++
    if (sched.qTerm === 'Q1') q1++
    else if (sched.qTerm === 'Q2') q2++
    else q1q2++
    // For each weekday this course actually meets, check conflicts
    const possible = sched.dayType === 'X'
      ? (sched.weekday ? [sched.weekday] : ['MON', 'TUE'])
      : sched.dayType === 'Y'
        ? (sched.weekday ? [sched.weekday] : ['THU', 'FRI'])
        : ['WED']
    for (const wd of possible) {
      const key = wd + '|' + sched.timeSlot
      const arr = slotMap.get(key) ?? []
      if (arr.some(qt => qTermsOverlap(qt, sched.qTerm))) conflicts++
      arr.push(sched.qTerm)
      slotMap.set(key, arr)
    }
  }
  return {
    courseCount: build.courseIds.length,
    totalCr, fallCr,
    q1, q2, q1q2,
    xCnt, yCnt, wCnt,
    unscheduled,
    conflicts,
  }
}

// ── Mini schedule grid (read-only) ────────────────────────────────────────────
function MiniSchedule({ build, accent }) {
  if (!build) return null

  const items = []
  for (const courseId of build.courseIds) {
    const course = COURSES.find(c => c.id === courseId)
    const sched = getActiveSection(courseId, build.sections)
    if (!course || !sched) continue
    items.push({ course, sched })
  }

  // Per-row groupings
  const rowsWithItems = DAY_ROWS.map(row => {
    const rowItems = items
      .filter(({ sched }) => sched.dayType === row.dayType && row.weekdays.includes(sched.weekday))
      .map(({ course, sched }) => ({ course, sched, rotates: sched.weekday === null }))
    // mark conflicts
    for (let i = 0; i < rowItems.length; i++) {
      for (let j = i + 1; j < rowItems.length; j++) {
        if (rowItems[i].sched.timeSlot === rowItems[j].sched.timeSlot &&
            qTermsOverlap(rowItems[i].sched.qTerm, rowItems[j].sched.qTerm)) {
          rowItems[i].isConflict = true
          rowItems[j].isConflict = true
        }
      }
    }
    return { row, items: rowItems }
  })

  const BLOCK_H = 22
  const GAP = 2

  return (
    <div style={{ background: '#fff', border: `2px solid ${accent}`, borderRadius: 10, padding: '0.875rem' }}>
      {/* Build name header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.625rem' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: accent, flexShrink: 0 }} />
        <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#111827', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {build.name}
        </span>
        <span style={{ fontSize: '0.7rem', color: '#9ca3af', fontWeight: 500 }}>
          {build.courseIds.length} courses
        </span>
      </div>

      {/* Time ruler */}
      <div style={{ display: 'flex', marginBottom: 4 }}>
        <div style={{ width: 40, flexShrink: 0 }} />
        <div style={{ flex: 1, position: 'relative', height: 14 }}>
          {RULER_MARKS.map(({ t, label }) => (
            <div key={t} style={{
              position: 'absolute', left: `${pct(t)}%`,
              fontSize: '0.6rem', color: '#9ca3af', fontWeight: 500,
              transform: 'translateX(-50%)', whiteSpace: 'nowrap',
            }}>{label}</div>
          ))}
        </div>
      </div>

      {rowsWithItems.map(({ row, items }) => {
        // Stack identical-slot items
        const bySlot = {}
        for (const item of items) {
          const k = item.sched.timeSlot
          if (!bySlot[k]) bySlot[k] = []
          bySlot[k].push(item)
        }
        const maxStack = items.length
          ? Math.max(...Object.values(bySlot).map(g => g.length))
          : 1
        const trackH = GAP + maxStack * (BLOCK_H + GAP)

        return (
          <div key={row.key} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 4 }}>
            <div style={{ width: 40, flexShrink: 0, paddingRight: 8, paddingTop: GAP + 3, fontSize: '0.7rem', fontWeight: 700, color: row.color }}>
              {row.label}
            </div>
            <div style={{
              flex: 1, position: 'relative', height: trackH,
              background: items.length ? row.track : '#fafafa',
              border: '1px solid #f3f4f6', borderRadius: 4,
            }}>
              {RULER_MARKS.map(({ t }) => (
                <div key={t} style={{ position: 'absolute', top: 0, bottom: 0, left: `${pct(t)}%`, width: 1, background: '#f3f4f6', zIndex: 1 }} />
              ))}
              {Object.entries(bySlot).flatMap(([slot, group]) =>
                group.map(({ course, sched, rotates, isConflict }, idx) => {
                  const [s, e] = sched.timeSlot.split('-')
                  return (
                    <Link key={course.id + idx}
                      to={`/courses/${course.id}`}
                      title={`${course.title} · ${sched.timeSlot} · ${sched.qTerm}${sched.section ? ' §' + sched.section : ''}`}
                      style={{
                        position: 'absolute',
                        left: `${pct(s)}%`, width: `calc(${wPct(s, e)}% - 2px)`,
                        top: GAP + idx * (BLOCK_H + GAP), height: BLOCK_H,
                        background: isConflict ? '#fee2e2' : rotates ? `${row.bg}cc` : row.bg,
                        border: `1px ${rotates ? 'dashed' : 'solid'} ${isConflict ? '#fca5a5' : row.border}`,
                        borderRadius: 3,
                        display: 'flex', alignItems: 'center', gap: 3,
                        padding: '0 4px',
                        textDecoration: 'none', overflow: 'hidden', zIndex: 2,
                      }}>
                      {isConflict && <AlertTriangle size={9} style={{ color: '#ef4444', flexShrink: 0 }} />}
                      <span style={{
                        fontSize: '0.65rem', fontWeight: 700, lineHeight: 1.1,
                        color: isConflict ? '#b91c1c' : row.color,
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1,
                      }}>
                        {course.title}
                      </span>
                    </Link>
                  )
                })
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── Stat box ──────────────────────────────────────────────────────────────────
function StatBox({ label, value, accent, sub }) {
  return (
    <div style={{ flex: 1, padding: '0.5rem 0.75rem', background: '#f9fafb', borderRadius: 6, border: '1px solid #f3f4f6' }}>
      <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#9ca3af', fontWeight: 700 }}>
        {label}
      </div>
      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: accent ?? '#111827', marginTop: 2 }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: '0.65rem', color: '#9ca3af', fontWeight: 500, marginTop: 1 }}>
          {sub}
        </div>
      )}
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function CompareBuilds({ builds, removeFromBuild, addToBuild, setBuildSection }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [aId, setAId] = useState(() => searchParams.get('a') ?? builds[0]?.id ?? '')
  const [bId, setBId] = useState(() => searchParams.get('b') ?? builds[1]?.id ?? builds[0]?.id ?? '')

  // keep URL synced so links can be shared
  useEffect(() => {
    if (aId || bId) setSearchParams({ a: aId, b: bId }, { replace: true })
  }, [aId, bId])

  const buildA = builds.find(b => b.id === aId) ?? null
  const buildB = builds.find(b => b.id === bId) ?? null

  const statsA = useMemo(() => buildStats(buildA), [buildA])
  const statsB = useMemo(() => buildStats(buildB), [buildB])

  // Diff: course IDs in A only, in B only, in both
  const diff = useMemo(() => {
    const setA = new Set(buildA?.courseIds ?? [])
    const setB = new Set(buildB?.courseIds ?? [])
    const both = [], onlyA = [], onlyB = []
    for (const id of setA) (setB.has(id) ? both : onlyA).push(id)
    for (const id of setB) if (!setA.has(id)) onlyB.push(id)
    const sortByTitle = (a, b) => {
      const ca = COURSES.find(c => c.id === a)
      const cb = COURSES.find(c => c.id === b)
      return (ca?.title ?? '').localeCompare(cb?.title ?? '')
    }
    return {
      both:  both.sort(sortByTitle),
      onlyA: onlyA.sort(sortByTitle),
      onlyB: onlyB.sort(sortByTitle),
    }
  }, [buildA, buildB])

  const ACCENT_A = '#A41034'
  const ACCENT_B = '#0369a1'

  if (builds.length < 2) {
    return (
      <div style={{ background: '#f9f7f6', minHeight: 'calc(100vh - 56px)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '2.5rem 1.5rem', textAlign: 'center' }}>
          <GitCompareArrows size={36} style={{ color: '#A41034', marginBottom: '0.75rem' }} />
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.625rem', fontWeight: 600, margin: 0, letterSpacing: '-0.012em' }}>Compare builds</h1>
          <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>
            You need at least two builds to compare. Create another build, then return here.
          </p>
          <Link to="/builds" style={{
            display: 'inline-block', marginTop: '1rem',
            padding: '0.5rem 1rem', background: '#A41034', color: '#fff',
            borderRadius: 8, textDecoration: 'none', fontWeight: 600,
          }}>
            Go to My Builds
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#f9f7f6', minHeight: 'calc(100vh - 56px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '1.5rem 1.5rem 3rem' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.5rem' }}>
          <GitCompareArrows size={22} style={{ color: '#A41034' }} />
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.625rem', fontWeight: 600, margin: 0, letterSpacing: '-0.012em' }}>Compare builds</h1>
        </div>
        <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0 0 1.25rem' }}>
          Pick two builds to see them side-by-side: stats, schedule overlap, and which courses are unique to each.
        </p>

        {/* Selectors */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '0.75rem',
          alignItems: 'center', marginBottom: '1.25rem',
        }}>
          <div>
            <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: ACCENT_A, fontWeight: 800, marginBottom: 4 }}>
              Build A
            </div>
            <select value={aId} onChange={e => setAId(e.target.value)}
              style={{ width: '100%', padding: '0.5rem 0.75rem', border: `2px solid ${ACCENT_A}`, borderRadius: 8, background: '#fff', fontSize: '0.875rem', fontFamily: 'inherit', fontWeight: 600, cursor: 'pointer' }}>
              {builds.map(b => <option key={b.id} value={b.id}>{b.name} ({b.courseIds.length})</option>)}
            </select>
          </div>
          <div style={{ fontSize: '0.875rem', color: '#9ca3af', fontWeight: 700, alignSelf: 'end', paddingBottom: 10 }}>vs</div>
          <div>
            <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: ACCENT_B, fontWeight: 800, marginBottom: 4 }}>
              Build B
            </div>
            <select value={bId} onChange={e => setBId(e.target.value)}
              style={{ width: '100%', padding: '0.5rem 0.75rem', border: `2px solid ${ACCENT_B}`, borderRadius: 8, background: '#fff', fontSize: '0.875rem', fontFamily: 'inherit', fontWeight: 600, cursor: 'pointer' }}>
              {builds.map(b => <option key={b.id} value={b.id}>{b.name} ({b.courseIds.length})</option>)}
            </select>
          </div>
        </div>

        {/* Stats row */}
        {statsA && statsB && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ background: '#fff', border: `2px solid ${ACCENT_A}`, borderRadius: 10, padding: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <StatBox label="Courses"    value={statsA.courseCount} accent={ACCENT_A} />
              <StatBox label="Credits"    value={statsA.totalCr}     accent={ACCENT_A} sub={statsA.fallCr !== statsA.totalCr ? `${statsA.fallCr} Fall` : null} />
              <StatBox label="Q1 / Q2"    value={`${statsA.q1} / ${statsA.q2}`} sub={`${statsA.q1q2} full-term`} />
              <StatBox label="Conflicts"  value={statsA.conflicts}   accent={statsA.conflicts > 0 ? '#dc2626' : '#059669'} />
            </div>
            <div style={{ background: '#fff', border: `2px solid ${ACCENT_B}`, borderRadius: 10, padding: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <StatBox label="Courses"    value={statsB.courseCount} accent={ACCENT_B} />
              <StatBox label="Credits"    value={statsB.totalCr}     accent={ACCENT_B} sub={statsB.fallCr !== statsB.totalCr ? `${statsB.fallCr} Fall` : null} />
              <StatBox label="Q1 / Q2"    value={`${statsB.q1} / ${statsB.q2}`} sub={`${statsB.q1q2} full-term`} />
              <StatBox label="Conflicts"  value={statsB.conflicts}   accent={statsB.conflicts > 0 ? '#dc2626' : '#059669'} />
            </div>
          </div>
        )}

        {/* Side-by-side mini schedules */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <MiniSchedule build={buildA} accent={ACCENT_A} />
          <MiniSchedule build={buildB} accent={ACCENT_B} />
        </div>

        {/* Diff */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #f3f4f6' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>Differences</div>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: 2 }}>
              {diff.both.length} shared · {diff.onlyA.length} only in A · {diff.onlyB.length} only in B
            </div>
          </div>

          {/* In both */}
          {diff.both.length > 0 && (
            <DiffSection
              title="In both builds"
              icon={<Check size={13} style={{ color: '#059669' }} />}
              accent="#059669" bgAccent="#ecfdf5"
              ids={diff.both}
              buildA={buildA}
              buildB={buildB}
              accentA={ACCENT_A} accentB={ACCENT_B}
              showSide="both"
            />
          )}
          {/* Only in A */}
          {diff.onlyA.length > 0 && (
            <DiffSection
              title={`Only in “${buildA?.name}”`}
              icon={<span style={{ width: 10, height: 10, borderRadius: '50%', background: ACCENT_A, display: 'inline-block' }} />}
              accent={ACCENT_A} bgAccent="#fff1f2"
              ids={diff.onlyA}
              buildA={buildA}
              buildB={buildB}
              accentA={ACCENT_A} accentB={ACCENT_B}
              showSide="A"
              onCopyAcross={(courseId) => {
                addToBuild(courseId, buildB.id)
                const sec = buildA?.sections?.[courseId]
                if (sec) setBuildSection(buildB.id, courseId, sec)
              }}
              onRemove={(courseId) => removeFromBuild(courseId, buildA.id)}
            />
          )}
          {/* Only in B */}
          {diff.onlyB.length > 0 && (
            <DiffSection
              title={`Only in “${buildB?.name}”`}
              icon={<span style={{ width: 10, height: 10, borderRadius: '50%', background: ACCENT_B, display: 'inline-block' }} />}
              accent={ACCENT_B} bgAccent="#eff6ff"
              ids={diff.onlyB}
              buildA={buildA}
              buildB={buildB}
              accentA={ACCENT_A} accentB={ACCENT_B}
              showSide="B"
              onCopyAcross={(courseId) => {
                addToBuild(courseId, buildA.id)
                const sec = buildB?.sections?.[courseId]
                if (sec) setBuildSection(buildA.id, courseId, sec)
              }}
              onRemove={(courseId) => removeFromBuild(courseId, buildB.id)}
            />
          )}
          {diff.both.length === 0 && diff.onlyA.length === 0 && diff.onlyB.length === 0 && (
            <div style={{ padding: '1.5rem', textAlign: 'center', color: '#9ca3af', fontSize: '0.875rem' }}>
              Both builds are empty.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Diff section (rows of courses with notes + actions) ───────────────────────
function DiffSection({ title, icon, accent, bgAccent, ids, buildA, buildB, accentA, accentB, showSide, onCopyAcross, onRemove }) {
  return (
    <div style={{ borderTop: '1px solid #f3f4f6' }}>
      <div style={{ padding: '0.5rem 1rem', background: bgAccent, display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', fontWeight: 700, color: accent }}>
        {icon} {title} <span style={{ fontWeight: 500, opacity: 0.7 }}>· {ids.length}</span>
      </div>
      <div>
        {ids.map(courseId => {
          const course = COURSES.find(c => c.id === courseId)
          if (!course) return null
          const noteA = buildA?.notes?.[courseId]
          const noteB = buildB?.notes?.[courseId]
          const schedA = getActiveSection(courseId, buildA?.sections)
          const schedB = getActiveSection(courseId, buildB?.sections)
          const sectionsCount = getCourseSections(courseId).length

          return (
            <div key={courseId} style={{ padding: '0.625rem 1rem', borderBottom: '1px solid #f9fafb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <Link to={`/courses/${course.id}`}
                  style={{ flex: 1, fontSize: '0.875rem', fontWeight: 600, color: '#111827', textDecoration: 'none', minWidth: 200 }}>
                  {course.title}
                  <span style={{ fontSize: '0.7rem', color: '#9ca3af', fontWeight: 400, marginLeft: 6 }}>
                    #{course.number} · {course.credits}cr
                  </span>
                </Link>

                {/* Section / time per side */}
                {showSide !== 'B' && schedA && (
                  <SchedPill sched={schedA} accent={accentA} sectionsCount={sectionsCount} />
                )}
                {showSide === 'both' && schedB && (schedA?.section !== schedB?.section || schedA?.timeSlot !== schedB?.timeSlot) && (
                  <SchedPill sched={schedB} accent={accentB} sectionsCount={sectionsCount} />
                )}
                {showSide === 'B' && schedB && (
                  <SchedPill sched={schedB} accent={accentB} sectionsCount={sectionsCount} />
                )}

                {/* Action buttons */}
                {showSide === 'A' && (
                  <>
                    <button onClick={() => onCopyAcross(courseId)} title="Copy to Build B"
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem', fontWeight: 700, background: '#fff', border: `1px solid ${accentB}`, color: accentB, borderRadius: 5, cursor: 'pointer', fontFamily: 'inherit' }}>
                      → Copy to B
                    </button>
                    <button onClick={() => onRemove(courseId)} title="Remove from A"
                      style={{ padding: '0.25rem', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}>
                      <X size={13} />
                    </button>
                  </>
                )}
                {showSide === 'B' && (
                  <>
                    <button onClick={() => onCopyAcross(courseId)} title="Copy to Build A"
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem', fontWeight: 700, background: '#fff', border: `1px solid ${accentA}`, color: accentA, borderRadius: 5, cursor: 'pointer', fontFamily: 'inherit' }}>
                      ← Copy to A
                    </button>
                    <button onClick={() => onRemove(courseId)} title="Remove from B"
                      style={{ padding: '0.25rem', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}>
                      <X size={13} />
                    </button>
                  </>
                )}
              </div>
              {/* Notes — show side by side if "both", else just the relevant one */}
              {(noteA || noteB) && (
                <div style={{ display: 'grid', gridTemplateColumns: showSide === 'both' ? '1fr 1fr' : '1fr', gap: '0.4rem', marginTop: 6 }}>
                  {(showSide === 'both' || showSide === 'A') && noteA && (
                    <NoteChip note={noteA} accent={accentA} label="A" showLabel={showSide === 'both'} />
                  )}
                  {(showSide === 'both' || showSide === 'B') && noteB && (
                    <NoteChip note={noteB} accent={accentB} label="B" showLabel={showSide === 'both'} />
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function SchedPill({ sched, accent, sectionsCount }) {
  return (
    <span style={{
      fontSize: '0.7rem', fontWeight: 700,
      color: accent, background: '#fff',
      border: `1px solid ${accent}40`,
      borderRadius: 4, padding: '2px 6px',
      whiteSpace: 'nowrap',
    }}>
      {sched.dayType === 'X' ? 'X' : sched.dayType === 'Y' ? 'Y' : 'W'}
      {sched.weekday ? ` ${sched.weekday[0] + sched.weekday.slice(1).toLowerCase()}` : ''}
      {' · '}{sched.timeSlot}
      {sched.section && sectionsCount > 1 && (
        <span style={{ opacity: 0.7, marginLeft: 4, fontFamily: 'var(--font-mono)' }}>§{sched.section}</span>
      )}
      {sched.qTerm !== 'Q1Q2' && (
        <span style={{ marginLeft: 4, fontWeight: 800, fontSize: '0.65rem', color: QUARTER_COLOR[sched.qTerm] }}>{sched.qTerm}</span>
      )}
    </span>
  )
}

function NoteChip({ note, accent, label, showLabel }) {
  return (
    <div style={{
      padding: '0.35rem 0.5rem',
      background: '#fffbeb', border: '1px solid #fde68a',
      borderLeft: `3px solid ${accent}`,
      borderRadius: 4,
      fontSize: '0.72rem', color: '#92400e',
      whiteSpace: 'pre-wrap', lineHeight: 1.35,
      display: 'flex', alignItems: 'flex-start', gap: 4,
    }}>
      <MessageSquare size={11} style={{ flexShrink: 0, marginTop: 2 }} />
      <div style={{ flex: 1 }}>
        {showLabel && <span style={{ fontWeight: 800, color: accent, marginRight: 4 }}>{label}:</span>}
        {note}
      </div>
    </div>
  )
}
