import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, AlertTriangle, X, Plus, ChevronDown, ChevronUp, Download, Repeat, Search, GripVertical, Palette, SlidersHorizontal } from 'lucide-react'
import { COURSES, getCourseSections, getActiveSection } from '../data/hbsCourses'

// ── Time geometry ─────────────────────────────────────────────────────────────
const T_START = 8 * 60 + 30      // 8:30 AM
const T_END   = 19 * 60          // 7:00 PM
const T_RANGE = T_END - T_START  // 630 min
const PX_PER_MIN = 0.85          // ~535px tall — full day fits in most laptop viewports
const GRID_HEIGHT = T_RANGE * PX_PER_MIN

const toMin = (s) => { const [h, m] = s.split(':').map(Number); return h * 60 + m }

// ── Day columns (desktop calendar) ────────────────────────────────────────────
const COLUMNS = [
  { key: 'MON', label: 'Mon', dayType: 'X', accepts: w => w === 'MON' || w == null },
  { key: 'TUE', label: 'Tue', dayType: 'X', accepts: w => w === 'TUE' || w == null },
  { key: 'WED', label: 'Wed', dayType: 'W', accepts: w => w === 'WED' || w == null },
  { key: 'THU', label: 'Thu', dayType: 'Y', accepts: w => w === 'THU' || w == null },
  { key: 'FRI', label: 'Fri', dayType: 'Y', accepts: w => w === 'FRI' || w == null },
]

const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18]

// ── Day-type metadata (used for the Add-courses panel + mobile labels) ────────
const DAY_TYPE_LABEL = { X: 'X day', Y: 'Y day', W: 'Wed' }
const DAY_TYPE_COLOR = { X: '#1d4ed8', Y: '#15803d', W: '#92400e' }
const DAY_TYPE_BG    = { X: '#dbeafe', Y: '#bbf7d0', W: '#fef3c7' }

// ── Color palette ─────────────────────────────────────────────────────────────
// Each course gets a deterministic color from this palette. Same course always
// renders the same color across the week, so users can recognize it at a glance.
const PALETTE = [
  { fg: '#3730a3', bg: '#e0e7ff', border: '#a5b4fc' }, // indigo
  { fg: '#047857', bg: '#d1fae5', border: '#6ee7b7' }, // emerald
  { fg: '#b45309', bg: '#fef3c7', border: '#fcd34d' }, // amber
  { fg: '#be123c', bg: '#ffe4e6', border: '#fda4af' }, // rose
  { fg: '#0e7490', bg: '#cffafe', border: '#67e8f9' }, // cyan
  { fg: '#6d28d9', bg: '#ede9fe', border: '#c4b5fd' }, // violet
  { fg: '#c2410c', bg: '#ffedd5', border: '#fdba74' }, // orange
  { fg: '#0f766e', bg: '#ccfbf1', border: '#5eead4' }, // teal
  { fg: '#9d174d', bg: '#fce7f3', border: '#f9a8d4' }, // pink
  { fg: '#0369a1', bg: '#e0f2fe', border: '#7dd3fc' }, // sky
  { fg: '#4d7c0f', bg: '#ecfccb', border: '#bef264' }, // lime
  { fg: '#7e22ce', bg: '#f3e8ff', border: '#d8b4fe' }, // purple
]

function hash(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = ((h << 5) - h + str.charCodeAt(i)) | 0
  return Math.abs(h)
}
// Resolve the color for a course. If an override index is provided (set by the
// user via the picker), use it; otherwise hash the courseId into the palette.
const colorFor = (courseId, override) => {
  if (override != null && PALETTE[override]) return PALETTE[override]
  return PALETTE[hash(courseId) % PALETTE.length]
}

const QUARTER_LABEL = { Q1: 'Q1', Q2: 'Q2', Q1Q2: 'Full', S1: 'S1', S2: 'S2', S1S2: 'Full' }
const QUARTER_COLOR = { Q1: '#7c3aed', Q2: '#0891b2', Q1Q2: '#6b7280', S1: '#7c3aed', S2: '#0891b2', S1S2: '#6b7280' }

function fmtHour(h) {
  const ampm = h >= 12 ? 'pm' : 'am'
  const hh = h > 12 ? h - 12 : h === 0 ? 12 : h
  return `${hh}${ampm}`
}
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

// Two qTerms overlap if they'd actually conflict. Q1+Q2 don't overlap (different
// halves of Fall); S1+S2 don't overlap (different halves of Spring). Anything in
// different semesters never conflicts.
function qTermsOverlap(a, b) {
  if (semesterFor(a) !== semesterFor(b)) return false
  const aFull = a === 'Q1Q2' || a === 'S1S2'
  const bFull = b === 'Q1Q2' || b === 'S1S2'
  if (aFull || bFull) return true
  return a === b
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 760)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 760)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isMobile
}

// ── iCal generation ───────────────────────────────────────────────────────────
// Fall 2026 dates from the official EC calendar; Spring 2027 dates are estimates
// (refine when the official Spring calendar is published).
const QTERM_DATES = {
  X: {
    Q1:   { start: '2026-09-02', until: '2026-10-19' },
    Q2:   { start: '2026-10-20', until: '2026-12-01' },
    Q1Q2: { start: '2026-09-02', until: '2026-12-01' },
    S1:   { start: '2027-01-25', until: '2027-03-12' },
    S2:   { start: '2027-03-15', until: '2027-05-07' },
    S1S2: { start: '2027-01-25', until: '2027-05-07' },
  },
  Y: {
    Q1:   { start: '2026-09-03', until: '2026-10-15' },
    Q2:   { start: '2026-10-16', until: '2026-12-03' },
    Q1Q2: { start: '2026-09-03', until: '2026-12-03' },
    S1:   { start: '2027-01-28', until: '2027-03-11' },
    S2:   { start: '2027-03-18', until: '2027-05-06' },
    S1S2: { start: '2027-01-28', until: '2027-05-06' },
  },
  W: {
    Q1:   { start: '2026-09-02', until: '2026-10-19' },
    Q2:   { start: '2026-10-21', until: '2026-12-02' },
    Q1Q2: { start: '2026-09-02', until: '2026-12-02' },
    S1:   { start: '2027-01-27', until: '2027-03-10' },
    S2:   { start: '2027-03-17', until: '2027-05-05' },
    S1S2: { start: '2027-01-27', until: '2027-05-05' },
  },
}

// Map qTerm → semester ('Fall' or 'Spring')
const SEMESTER_OF = { Q1: 'Fall', Q2: 'Fall', Q1Q2: 'Fall', S1: 'Spring', S2: 'Spring', S1S2: 'Spring' }
const semesterFor = (qTerm) => SEMESTER_OF[qTerm] ?? 'Fall'
const BYDAY_FOR = {
  X: { MON: ['MO'], TUE: ['TU'], null: ['MO', 'TU'] },
  Y: { THU: ['TH'], FRI: ['FR'], null: ['TH', 'FR'] },
  W: { WED: ['WE'] },
}
const ICAL_DAY_NUM = { SU: 0, MO: 1, TU: 2, WE: 3, TH: 4, FR: 5, SA: 6 }

function firstOccurrence(dateStr, bydays) {
  const targets = bydays.map(d => ICAL_DAY_NUM[d])
  let date = new Date(dateStr + 'T00:00:00')
  for (let i = 0; i < 7; i++) {
    if (targets.includes(date.getDay())) return date
    date = new Date(date.getTime() + 86400000)
  }
  return date
}
function pad(n) { return String(n).padStart(2, '0') }
function icsDateTime(date, time) {
  const [h, m] = time.split(':').map(Number)
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(h)}${pad(m)}00`
}
function icsUntil(dateStr) {
  return dateStr.replaceAll('-', '') + 'T235959'
}
function escapeICS(str) {
  return String(str).replace(/[\\,;]/g, m => '\\' + m).replace(/\n/g, '\\n')
}
function buildICS(build, courses, semester) {
  const semesterLabel = semester === 'Spring' ? 'Spring 2027' : 'Fall 2026'
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0',
    'PRODID:-//HBS Catalog//Schedule Planner//EN',
    'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    `X-WR-CALNAME:${escapeICS(build.name)} — HBS ${semesterLabel}`,
  ]
  for (const courseId of build.courseIds) {
    const course = courses.find(c => c.id === courseId)
    const sched  = getActiveSection(courseId, build.sections)
    if (!course || !sched) continue
    if (semesterFor(sched.qTerm) !== semester) continue
    const range = QTERM_DATES[sched.dayType]?.[sched.qTerm]
    if (!range) continue
    const bydays = BYDAY_FOR[sched.dayType]?.[sched.weekday] ?? []
    if (bydays.length === 0) continue
    const [startTime, endTime] = sched.timeSlot.split('-')
    const first = firstOccurrence(range.start, bydays)
    const sectionLabel = sched.section ? ` §${sched.section}` : ''
    const facultyLine = sched.faculty ?? course.faculty.join(', ')
    lines.push(
      'BEGIN:VEVENT',
      `UID:${course.id}-${sched.section ?? 'A'}-${sched.timeSlot.replace(':', '')}@hbs-catalog`,
      `DTSTAMP:${icsDateTime(new Date(), '00:00')}`,
      `DTSTART;TZID=America/New_York:${icsDateTime(first, startTime)}`,
      `DTEND;TZID=America/New_York:${icsDateTime(first, endTime)}`,
      `RRULE:FREQ=WEEKLY;BYDAY=${bydays.join(',')};UNTIL=${icsUntil(range.until)}`,
      `SUMMARY:${escapeICS(course.title + sectionLabel)} (${course.number})`,
      `DESCRIPTION:${escapeICS(`${facultyLine}\n${sched.qTerm} · ${course.credits} credits${sched.weekday === null ? '\nNote: Day rotates Mon/Tue or Thu/Fri weekly per EC calendar' : ''}`)}`,
      'END:VEVENT',
    )
  }
  lines.push('END:VCALENDAR')
  return lines.join('\r\n')
}
function downloadICS(build, courses, semester) {
  const ics = buildICS(build, courses, semester)
  const blob = new Blob([ics], { type: 'text/calendar' })
  const url  = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  const tag = semester === 'Spring' ? 'spring2027' : 'fall2026'
  a.download = `${build.name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-${tag}.ics`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

// ── Course block on the calendar ──────────────────────────────────────────────
function CourseBlock({ course, sched, sections, isConflict, lane, laneCount, onRemove, onSwitchSection, onColorPick, colorOverride, note }) {
  const [hovered, setHovered] = useState(false)
  const [s, e] = sched.timeSlot.split('-')
  const top = (toMin(s) - T_START) * PX_PER_MIN
  const height = (toMin(e) - toMin(s)) * PX_PER_MIN
  const c = colorFor(course.id, colorOverride)
  const rotates = sched.weekday === null && (sched.dayType === 'X' || sched.dayType === 'Y')

  const widthPct = 100 / laneCount
  const leftPct = lane * widthPct
  const hasMultiple = onSwitchSection && sections.length > 1 && sections.some(s => s.section != null)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'absolute',
        top, height,
        left: `calc(${leftPct}% + 2px)`,
        width: `calc(${widthPct}% - 4px)`,
        zIndex: hovered ? 20 : 2,
      }}
    >
      <Link
        to={`/courses/${course.id}`}
        title={`${course.title}\n${sched.faculty ?? course.faculty.join(', ')}\n${fmtTime(s)} – ${fmtTime(e)} · ${sched.qTerm}${rotates ? '\n(alternates weekly)' : ''}${note ? `\n\nNote: ${note}` : ''}`}
        style={{
          position: 'absolute', inset: 0,
          background: isConflict ? '#fef2f2' : c.bg,
          border: `1px ${rotates ? 'dashed' : 'solid'} ${isConflict ? '#fca5a5' : c.border}`,
          borderLeft: `3px solid ${isConflict ? '#ef4444' : c.fg}`,
          borderRadius: 5,
          padding: '5px 7px',
          textDecoration: 'none',
          color: isConflict ? '#b91c1c' : c.fg,
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          transition: 'box-shadow 0.12s, transform 0.12s',
          boxShadow: hovered ? '0 4px 14px rgba(0,0,0,0.13)' : 'none',
          transform: hovered ? 'translateY(-1px)' : 'none',
        }}
      >
        <div style={{
          fontSize: height < 40 ? '0.7rem' : '0.78rem',
          fontWeight: 700,
          lineHeight: 1.15,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {isConflict && <AlertTriangle size={10} style={{ display: 'inline', marginRight: 3, verticalAlign: '-1px' }} />}
          {course.title}
        </div>
        {height > 40 && (
          <div style={{
            fontSize: '0.65rem', fontWeight: 500, opacity: 0.8, marginTop: 3,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {fmtTime(s)} – {fmtTime(e)}
            {sched.qTerm !== 'Q1Q2' && (
              <span style={{ marginLeft: 6, fontWeight: 700, color: QUARTER_COLOR[sched.qTerm] }}>· {sched.qTerm}</span>
            )}
          </div>
        )}
        {height > 58 && sched.faculty && (
          <div style={{
            fontSize: '0.62rem', opacity: 0.7, marginTop: 2,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontStyle: 'italic',
          }}>
            {sched.faculty}
          </div>
        )}
        {note && !hovered && (
          <span style={{
            position: 'absolute', right: 4, bottom: 3,
            fontSize: 10, opacity: 0.7,
          }} title={note}>📝</span>
        )}
      </Link>

      {hovered && (onRemove || hasMultiple || onColorPick) && (
        <div style={{
          position: 'absolute', top: 3, right: 3, zIndex: 21,
          display: 'flex', gap: 3,
        }}>
          {onColorPick && (
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onColorPick(course.id, course.title) }}
              title="Change color"
              style={{
                width: 19, height: 19, borderRadius: '50%',
                background: '#fff', border: `1px solid ${c.fg}`,
                cursor: 'pointer', padding: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            ><Palette size={10} style={{ color: c.fg }} /></button>
          )}
          {hasMultiple && (
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onSwitchSection(course.id) }}
              title={`Switch section (${sections.length} available)`}
              style={{
                width: 19, height: 19, borderRadius: '50%',
                background: '#fff', border: `1px solid ${c.fg}`,
                cursor: 'pointer', padding: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            ><Repeat size={10} style={{ color: c.fg }} /></button>
          )}
          {onRemove && (
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onRemove(course.id) }}
              title="Remove from build"
              style={{
                width: 19, height: 19, borderRadius: '50%',
                background: '#fff', border: `1px solid ${c.fg}`,
                cursor: 'pointer', padding: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            ><X size={11} style={{ color: c.fg }} /></button>
          )}
        </div>
      )}
    </div>
  )
}

// Lane layout: overlapping items split horizontally inside a column.
function layoutLanes(items) {
  const sorted = [...items].sort((a, b) => {
    const as = toMin(a.sched.timeSlot.split('-')[0])
    const bs = toMin(b.sched.timeSlot.split('-')[0])
    return as - bs
  })
  const lanes = []
  const placement = []
  for (const item of sorted) {
    const [s, e] = item.sched.timeSlot.split('-').map(toMin)
    let laneIdx = lanes.findIndex(L => {
      const last = L[L.length - 1]
      const [, le] = last.sched.timeSlot.split('-').map(toMin)
      return le <= s
    })
    if (laneIdx === -1) { laneIdx = lanes.length; lanes.push([]) }
    lanes[laneIdx].push(item)
    placement.push({ item, lane: laneIdx, s, e })
  }
  return placement.map(({ item, lane, s, e }) => {
    const concurrent = placement.filter(p => p.s < e && p.e > s)
    const laneCount = Math.max(...concurrent.map(p => p.lane)) + 1
    return { ...item, lane, laneCount }
  })
}

function CalendarColumn({ items, onRemove, onSwitchSection, onColorPick, colorOverrides, isLast }) {
  const laid = useMemo(() => layoutLanes(items), [items])
  return (
    <div style={{
      flex: 1, position: 'relative',
      height: GRID_HEIGHT,
      borderRight: isLast ? 'none' : '1px solid #f1f5f9',
    }}>
      {HOURS.map(h => (
        <div key={h} style={{
          position: 'absolute', left: 0, right: 0,
          top: (h * 60 - T_START) * PX_PER_MIN,
          height: 1, background: '#f1f5f9', pointerEvents: 'none',
        }} />
      ))}
      {HOURS.map(h => (
        <div key={h + 'h'} style={{
          position: 'absolute', left: 0, right: 0,
          top: (h * 60 + 30 - T_START) * PX_PER_MIN,
          height: 1, background: '#f8fafc', pointerEvents: 'none',
        }} />
      ))}
      {laid.map((it) => (
        <CourseBlock
          key={`${it.course.id}-${it.sched.timeSlot}-${it.sched.dayType}`}
          {...it}
          colorOverride={colorOverrides?.[it.course.id]}
          onRemove={onRemove}
          onSwitchSection={onSwitchSection}
          onColorPick={onColorPick}
        />
      ))}
    </div>
  )
}

function TimeRuler() {
  return (
    <div style={{
      width: 58, flexShrink: 0,
      position: 'relative', height: GRID_HEIGHT,
    }}>
      {HOURS.map(h => (
        <div key={h} style={{
          position: 'absolute', right: 10,
          top: (h * 60 - T_START) * PX_PER_MIN - 7,
          fontSize: '0.7rem', color: '#9ca3af', fontWeight: 600,
        }}>{fmtHour(h)}</div>
      ))}
      {HOURS.map(h => (
        <div key={h + 't'} style={{
          position: 'absolute', right: 0, width: 4,
          top: (h * 60 - T_START) * PX_PER_MIN,
          height: 1, background: '#e5e7eb',
        }} />
      ))}
    </div>
  )
}

function DayHeader({ column }) {
  return (
    <div style={{
      flex: 1,
      padding: '0.7rem 0.5rem 0.55rem',
      borderRight: '1px solid #f1f5f9',
      textAlign: 'center',
      background: '#fafafa',
    }}>
      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827', letterSpacing: '-0.01em' }}>
        {column.label}
      </div>
      <div style={{ fontSize: '0.6rem', color: '#9ca3af', marginTop: 2, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {column.dayType} day
      </div>
    </div>
  )
}

// ── Mobile day list (one section per day) ─────────────────────────────────────
const mobileActionBtn = (color) => ({
  width: 30, height: 30, borderRadius: '50%',
  background: '#fff', border: '1px solid #e5e7eb',
  color, padding: 0,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', flexShrink: 0, fontFamily: 'inherit',
  WebkitTapHighlightColor: 'transparent',
})

function MobileDayList({ column, items, colorOverrides, onRemove, onSwitchSection, onColorPick }) {
  const sorted = [...items].sort((a, b) => a.sched.timeSlot.localeCompare(b.sched.timeSlot))
  const dc = { X: { bg: '#dbeafe', fg: '#1d4ed8' },
               Y: { bg: '#bbf7d0', fg: '#15803d' },
               W: { bg: '#fde68a', fg: '#92400e' } }[column.dayType]
  const isEmpty = sorted.length === 0

  return (
    <div style={{ marginBottom: isEmpty ? '0.5rem' : '0.875rem' }}>
      <div style={{
        display: 'flex', alignItems: 'baseline', gap: '0.5rem',
        padding: isEmpty ? '0.3rem 0.625rem' : '0.45rem 0.75rem',
        borderRadius: 6,
        background: isEmpty ? '#f3f4f6' : dc.bg,
        color: isEmpty ? '#9ca3af' : dc.fg,
        fontWeight: 700,
        fontSize: isEmpty ? '0.78rem' : '0.875rem',
        marginBottom: isEmpty ? 0 : '0.375rem',
      }}>
        {column.label}
        <span style={{ fontSize: '0.7rem', fontWeight: 500, opacity: 0.75 }}>
          {isEmpty ? 'free' : `${sorted.length} course${sorted.length !== 1 ? 's' : ''}`}
        </span>
      </div>
      {!isEmpty && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {sorted.map(({ course, sched, sections, isConflict, note }) => {
            const hasMulti = onSwitchSection && sections.length > 1 && sections.some(s => s.section != null)
            const cc = colorFor(course.id, colorOverrides?.[course.id])
            const [startTime, endTime] = sched.timeSlot.split('-')
            return (
              <div key={course.id + '-' + column.key + '-' + sched.timeSlot} style={{
                padding: '0.625rem 0.75rem',
                background: isConflict ? '#fee2e2' : '#fff',
                border: `1px solid ${isConflict ? '#fca5a5' : '#e5e7eb'}`,
                borderLeft: `4px solid ${isConflict ? '#ef4444' : cc.fg}`,
                borderRadius: 7,
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <Link to={`/courses/${course.id}`}
                    style={{
                      flex: 1, minWidth: 0,
                      textDecoration: 'none',
                      WebkitTapHighlightColor: 'transparent',
                    }}>
                    <div style={{
                      fontSize: '0.9rem', fontWeight: 700,
                      color: isConflict ? '#b91c1c' : '#111827',
                      lineHeight: 1.25,
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {isConflict && <AlertTriangle size={11} style={{ display: 'inline', verticalAlign: '-1px', marginRight: 3 }} />}
                      {course.title}
                    </div>
                    <div style={{
                      fontSize: '0.72rem', fontWeight: 500,
                      marginTop: 3,
                      display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap',
                    }}>
                      <span style={{ color: cc.fg, fontWeight: 700 }}>
                        {fmtTime(startTime)} – {fmtTime(endTime)}
                      </span>
                      {sched.section && (
                        <span style={{ fontFamily: 'monospace', color: '#9ca3af', fontWeight: 600 }}>§{sched.section}</span>
                      )}
                      {sched.qTerm !== 'Q1Q2' && sched.qTerm !== 'S1S2' && (
                        <span style={{ color: QUARTER_COLOR[sched.qTerm], fontWeight: 700 }}>· {sched.qTerm}</span>
                      )}
                      {sched.faculty && (
                        <span style={{ color: '#9ca3af', fontStyle: 'italic', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 140 }}>
                          · {sched.faculty}
                        </span>
                      )}
                    </div>
                  </Link>

                  <div style={{ display: 'flex', gap: 4 }}>
                    {onColorPick && (
                      <button onClick={() => onColorPick(course.id, course.title)} aria-label="Change color"
                        style={mobileActionBtn(cc.fg)}>
                        <Palette size={14} />
                      </button>
                    )}
                    {hasMulti && (
                      <button onClick={() => onSwitchSection(course.id)} aria-label="Switch section"
                        style={mobileActionBtn(cc.fg)}>
                        <Repeat size={14} />
                      </button>
                    )}
                    {onRemove && (
                      <button onClick={() => onRemove(course.id)} aria-label="Remove"
                        style={mobileActionBtn('#9ca3af')}>
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </div>
                {note && (
                  <div style={{
                    marginTop: 8, padding: '0.4rem 0.55rem',
                    background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 4,
                    fontSize: '0.72rem', color: '#92400e', whiteSpace: 'pre-wrap', lineHeight: 1.4,
                  }}>{note}</div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ── Add-courses panel ─────────────────────────────────────────────────────────
function CourseAdder({ activeBuild, addToBuild, setBuildSection, takenSlotsByType, semester }) {
  const [open, setOpen]         = useState(false)
  const [dayFilter, setDayFilter] = useState('all')
  const [search, setSearch]     = useState('')

  // Only show sections that match the semester being viewed — keeps the picker
  // consistent with the calendar (no cross-semester surprises when adding).
  const available = useMemo(() => {
    const inBuild = new Set(activeBuild.courseIds)
    const items = []
    for (const course of COURSES) {
      if (inBuild.has(course.id)) continue
      const sections = getCourseSections(course.id)
      for (const sched of sections) {
        if (semester && semesterFor(sched.qTerm) !== semester) continue
        items.push({ course, sched, sections })
      }
    }
    return items
  }, [activeBuild, semester])

  const filtered = useMemo(() => available.filter(({ course, sched }) => {
    if (dayFilter !== 'all' && sched.dayType !== dayFilter) return false
    if (search && !course.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  }), [available, dayFilter, search])

  const grouped = useMemo(() => {
    const groups = {}
    for (const item of filtered) {
      const k = item.sched.timeSlot
      if (!groups[k]) groups[k] = []
      groups[k].push(item)
    }
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b))
  }, [filtered])

  if (available.length === 0) return null

  return (
    <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '0.875rem', overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0.875rem 1.25rem',
          background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
          borderBottom: open ? '1px solid #f3f4f6' : 'none',
        }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={16} style={{ color: '#A41034' }} />
          <span style={{ fontSize: '0.925rem', fontWeight: 700, color: '#111827' }}>Add courses to this build</span>
          <span style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 400 }}>{available.length} available</span>
        </div>
        {open ? <ChevronUp size={16} style={{ color: '#9ca3af' }} /> : <ChevronDown size={16} style={{ color: '#9ca3af' }} />}
      </button>

      {open && (
        <div style={{ padding: '1rem 1.25rem 1.25rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search courses…"
              style={{ flex: '1 1 180px', padding: '0.4rem 0.625rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', fontSize: '0.8125rem', fontFamily: 'inherit', outline: 'none' }}
            />
            {[['all', 'All days'], ['X', 'X (Mon/Tue)'], ['W', 'Wed'], ['Y', 'Y (Thu/Fri)']].map(([val, lbl]) => (
              <button key={val} onClick={() => setDayFilter(val)}
                style={{
                  padding: '0.35rem 0.75rem', borderRadius: 20,
                  border: `1px solid ${dayFilter === val ? '#A41034' : '#e5e7eb'}`,
                  background: dayFilter === val ? '#fff1f2' : '#fff',
                  color: dayFilter === val ? '#A41034' : '#6b7280',
                  fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                }}>{lbl}</button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div style={{ color: '#9ca3af', fontSize: '0.875rem', padding: '0.5rem 0' }}>No courses match this filter.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {grouped.map(([slot, items]) => (
                <div key={slot}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>
                    {fmtSlot(slot)}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    {items.map(({ course, sched, sections }) => {
                      const taken = (takenSlotsByType[sched.dayType]?.get(sched.timeSlot) ?? [])
                        .some(qt => qTermsOverlap(qt, sched.qTerm))
                      const handleAdd = () => {
                        addToBuild(course.id, activeBuild.id)
                        if (sections.length > 1) setBuildSection(activeBuild.id, course.id, sched.section)
                      }
                      return (
                        <div key={course.id + '-' + (sched.section ?? 'only') + '-' + (sched.weekday ?? sched.dayType)} style={{
                          display: 'flex', alignItems: 'center', gap: '0.625rem',
                          padding: '0.5rem 0.75rem',
                          background: taken ? '#fff7ed' : '#f9fafb',
                          border: `1px solid ${taken ? '#fed7aa' : '#f3f4f6'}`,
                          borderRadius: '0.5rem', flexWrap: 'wrap',
                        }}>
                          <span style={{
                            fontSize: '0.65rem', fontWeight: 700, flexShrink: 0,
                            color: DAY_TYPE_COLOR[sched.dayType],
                            background: DAY_TYPE_BG[sched.dayType],
                            borderRadius: 10, padding: '2px 7px',
                          }}>
                            {DAY_TYPE_LABEL[sched.dayType]}{sched.weekday ? ` · ${sched.weekday[0] + sched.weekday.slice(1).toLowerCase()}` : ''}
                          </span>
                          {sched.section && (
                            <span style={{
                              fontSize: '0.65rem', fontWeight: 800, flexShrink: 0,
                              color: '#374151', background: '#fff',
                              border: '1px solid #e5e7eb',
                              borderRadius: 3, padding: '1px 5px', fontFamily: 'monospace',
                            }}>§{sched.section}</span>
                          )}
                          {sched.qTerm !== 'Q1Q2' && (
                            <span style={{
                              fontSize: '0.65rem', fontWeight: 700, flexShrink: 0,
                              color: QUARTER_COLOR[sched.qTerm], background: '#fff',
                              border: `1px solid ${QUARTER_COLOR[sched.qTerm]}40`,
                              borderRadius: 3, padding: '1px 5px',
                            }}>{sched.qTerm}</span>
                          )}
                          <Link to={`/courses/${course.id}`} style={{ flex: 1, minWidth: 140, fontSize: '0.875rem', fontWeight: 600, color: '#111827', textDecoration: 'none' }}>
                            {course.title}
                          </Link>
                          {sched.faculty && (
                            <span style={{ fontSize: '0.72rem', color: '#9ca3af', flexShrink: 0, fontStyle: 'italic' }}>{sched.faculty}</span>
                          )}
                          <span style={{ fontSize: '0.75rem', color: '#9ca3af', flexShrink: 0 }}>{course.credits}cr</span>
                          {taken && (
                            <span style={{ fontSize: '0.7rem', color: '#ea580c', fontWeight: 600, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 3 }}>
                              <AlertTriangle size={11} /> conflicts
                            </span>
                          )}
                          <button onClick={handleAdd}
                            style={{
                              flexShrink: 0, display: 'flex', alignItems: 'center', gap: '0.25rem',
                              padding: '0.3rem 0.625rem',
                              background: taken ? '#fff' : '#A41034',
                              border: taken ? '1px solid #fed7aa' : 'none',
                              borderRadius: '0.375rem',
                              color: taken ? '#ea580c' : '#fff',
                              fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                            }}>
                            <Plus size={11} /> Add
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Color picker modal ────────────────────────────────────────────────────────
function ColorPickerModal({ courseId, courseTitle, currentIdx, onPick, onClose }) {
  // Close on ESC
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Compute the auto color (what we'd use without an override) so the user can
  // see what they're customizing away from.
  const autoIdx = hash(courseId) % PALETTE.length

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(17, 24, 39, 0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: 12,
          padding: '1.25rem 1.5rem 1.5rem',
          width: '100%', maxWidth: 360,
          boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
        }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.25rem' }}>
          <Palette size={16} style={{ color: '#A41034' }} />
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Course color
          </span>
          <button onClick={onClose}
            style={{
              marginLeft: 'auto', background: 'none', border: 'none',
              cursor: 'pointer', color: '#9ca3af', padding: 2, display: 'flex',
            }}><X size={16} /></button>
        </div>
        <div style={{
          fontSize: '0.95rem', fontWeight: 700, color: '#111827', marginBottom: '0.875rem',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{courseTitle}</div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: 8,
          marginBottom: '0.875rem',
        }}>
          {PALETTE.map((p, idx) => {
            const isActive = currentIdx === idx
            const isAuto   = currentIdx == null && idx === autoIdx
            return (
              <button key={idx}
                onClick={() => onPick(idx)}
                title={isAuto ? 'Auto-assigned color' : `Color ${idx + 1}`}
                style={{
                  position: 'relative',
                  height: 36,
                  background: p.bg,
                  border: `2px solid ${isActive ? p.fg : (isAuto ? p.border : 'transparent')}`,
                  borderRadius: 6,
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                <div style={{
                  width: 12, height: 12, borderRadius: '50%',
                  background: p.fg,
                }} />
                {isActive && (
                  <div style={{
                    position: 'absolute', top: -4, right: -4,
                    width: 14, height: 14, borderRadius: '50%',
                    background: p.fg, color: '#fff',
                    fontSize: 9, fontWeight: 800,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>✓</div>
                )}
              </button>
            )
          })}
        </div>

        <button onClick={() => onPick(null)}
          style={{
            width: '100%', padding: '0.5rem',
            background: currentIdx == null ? '#f3f4f6' : '#fff',
            border: '1px solid #e5e7eb', borderRadius: 6,
            fontSize: '0.78rem', fontWeight: 600, color: '#374151',
            cursor: 'pointer', fontFamily: 'inherit',
          }}>
          {currentIdx == null ? '✓ Using auto color' : 'Reset to auto color'}
        </button>
      </div>
    </div>
  )
}

// ── Course sidebar (desktop drag-to-add rail) ─────────────────────────────────
function CourseSidebar({ activeBuild, addToBuild, setBuildSection, semester, takenSlotsByType, onDragStartItem, onDragEndItem }) {
  const [search, setSearch]       = useState('')
  const [dayFilter, setDayFilter] = useState('all')

  // All draggable sections for courses not yet in this build, filtered by semester.
  const available = useMemo(() => {
    if (!activeBuild) return []
    const inBuild = new Set(activeBuild.courseIds)
    const items = []
    for (const course of COURSES) {
      if (inBuild.has(course.id)) continue
      const sections = getCourseSections(course.id)
      if (sections.length === 0) continue
      for (const sched of sections) {
        if (semesterFor(sched.qTerm) !== semester) continue
        items.push({ course, sched, sections })
      }
    }
    return items
  }, [activeBuild, semester])

  const filtered = useMemo(() => available.filter(({ course, sched }) => {
    if (dayFilter !== 'all' && sched.dayType !== dayFilter) return false
    if (search) {
      const q = search.toLowerCase()
      const hay = course.title.toLowerCase() + ' ' + course.faculty.join(' ').toLowerCase() + ' ' + course.number
      if (!hay.includes(q)) return false
    }
    return true
  }), [available, dayFilter, search])

  // Group by exact time slot, sorted ascending
  const grouped = useMemo(() => {
    const groups = {}
    for (const item of filtered) {
      const k = item.sched.timeSlot
      if (!groups[k]) groups[k] = []
      groups[k].push(item)
    }
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b))
  }, [filtered])

  if (!activeBuild) {
    return (
      <div style={sidebarFrameStyle}>
        <div style={{ padding: '1rem 1rem 1.25rem', fontSize: '0.8rem', color: '#9ca3af', textAlign: 'center', lineHeight: 1.45 }}>
          Pick a build above to start dragging courses onto the calendar.
        </div>
      </div>
    )
  }

  const handleDragStart = (e, item) => {
    e.dataTransfer.effectAllowed = 'copy'
    e.dataTransfer.setData('text/plain', JSON.stringify({
      courseId:  item.course.id,
      sectionId: item.sched.section ?? null,
    }))
    onDragStartItem?.(item)
  }

  const handleClickAdd = (item) => {
    addToBuild(item.course.id, activeBuild.id)
    if (item.sections.length > 1 && item.sched.section) {
      setBuildSection(activeBuild.id, item.course.id, item.sched.section)
    }
  }

  return (
    <div style={sidebarFrameStyle}>
      {/* Sidebar header */}
      <div style={{ padding: '0.75rem 0.875rem 0.5rem', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
          <Plus size={14} style={{ color: '#A41034' }} />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827' }}>Add courses</span>
          <span style={{ fontSize: '0.7rem', color: '#9ca3af', fontWeight: 500, marginLeft: 'auto' }}>
            {available.length} available
          </span>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '0.5rem' }}>
          <Search size={12} style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search title, faculty, number…"
            style={{
              width: '100%', padding: '0.35rem 0.55rem 0.35rem 1.5rem',
              border: '1px solid #e5e7eb', borderRadius: '0.4rem',
              fontSize: '0.75rem', fontFamily: 'inherit', outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Day filter */}
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {[['all', 'All'], ['X', 'X'], ['W', 'W'], ['Y', 'Y']].map(([val, lbl]) => (
            <button key={val} onClick={() => setDayFilter(val)}
              title={val === 'X' ? 'Mon/Tue' : val === 'Y' ? 'Thu/Fri' : val === 'W' ? 'Wed' : 'All days'}
              style={{
                padding: '0.18rem 0.5rem', borderRadius: 12,
                border: `1px solid ${dayFilter === val ? '#A41034' : '#e5e7eb'}`,
                background: dayFilter === val ? '#fff1f2' : '#fff',
                color: dayFilter === val ? '#A41034' : '#6b7280',
                fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
              }}>{lbl}</button>
          ))}
        </div>
        <p style={{ fontSize: '0.65rem', color: '#9ca3af', margin: '0.5rem 0 0', lineHeight: 1.4 }}>
          Drag a course onto the calendar — or click to add.
        </p>
      </div>

      {/* Scrollable list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem 0.625rem 0.875rem' }}>
        {filtered.length === 0 ? (
          <div style={{ color: '#9ca3af', fontSize: '0.75rem', padding: '0.5rem 0.25rem', textAlign: 'center' }}>
            No courses match this filter.
          </div>
        ) : (
          grouped.map(([slot, items]) => (
            <div key={slot} style={{ marginBottom: '0.75rem' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#6b7280', padding: '0.25rem 0.25rem 0.35rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {fmtSlot(slot)}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {items.map((item) => {
                  const { course, sched, sections } = item
                  const c = colorFor(course.id, activeBuild?.colors?.[course.id])
                  const taken = (takenSlotsByType[sched.dayType]?.get(sched.timeSlot) ?? []).some(qt => qTermsOverlap(qt, sched.qTerm))
                  return (
                    <div
                      key={course.id + '-' + (sched.section ?? 'only') + '-' + (sched.weekday ?? sched.dayType)}
                      draggable
                      onDragStart={(e) => handleDragStart(e, item)}
                      onDragEnd={() => onDragEndItem?.()}
                      onClick={() => handleClickAdd(item)}
                      title={`${course.title}${sched.faculty ? ' — ' + sched.faculty : ''}\n${fmtSlot(sched.timeSlot)} · ${sched.qTerm}${taken ? '\nConflicts with existing course in this slot' : ''}`}
                      style={{
                        cursor: 'grab',
                        padding: '0.4rem 0.5rem',
                        background: taken ? '#fff7ed' : '#fff',
                        border: `1px solid ${taken ? '#fed7aa' : '#e5e7eb'}`,
                        borderLeft: `3px solid ${c.fg}`,
                        borderRadius: 5,
                        display: 'flex', alignItems: 'center', gap: 6,
                        fontFamily: 'inherit',
                      }}
                    >
                      <GripVertical size={11} style={{ color: '#cbd5e1', flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontSize: '0.72rem', fontWeight: 700, color: '#111827',
                          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                          lineHeight: 1.25,
                        }}>
                          {course.title}
                          {sched.section && (
                            <span style={{ marginLeft: 4, fontSize: '0.62rem', fontWeight: 700, color: '#9ca3af', fontFamily: 'monospace' }}>
                              §{sched.section}
                            </span>
                          )}
                        </div>
                        <div style={{
                          fontSize: '0.62rem', color: '#6b7280', marginTop: 1,
                          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                          display: 'flex', gap: 5, alignItems: 'center',
                        }}>
                          <span style={{ color: DAY_TYPE_COLOR[sched.dayType], fontWeight: 700 }}>
                            {DAY_TYPE_LABEL[sched.dayType]}{sched.weekday ? `·${sched.weekday[0]+sched.weekday.slice(1,3).toLowerCase()}` : ''}
                          </span>
                          {sched.qTerm !== 'Q1Q2' && sched.qTerm !== 'S1S2' && (
                            <span style={{ color: QUARTER_COLOR[sched.qTerm], fontWeight: 700 }}>· {sched.qTerm}</span>
                          )}
                          {sched.faculty && (
                            <span style={{ color: '#9ca3af', fontStyle: 'italic', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              · {sched.faculty}
                            </span>
                          )}
                        </div>
                      </div>
                      {taken && (
                        <AlertTriangle size={11} style={{ color: '#ea580c', flexShrink: 0 }} title="conflict" />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

const sidebarFrameStyle = {
  width: 290, flexShrink: 0,
  background: '#fff',
  border: '1px solid #e5e7eb',
  borderRadius: '0.875rem',
  display: 'flex', flexDirection: 'column',
  maxHeight: GRID_HEIGHT + 60,  // ~match calendar height
  overflow: 'hidden',
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function ScheduleView({ builds, addToBuild, removeFromBuild, setBuildSection, setBuildCourseColor }) {
  const [buildId, setBuildId]               = useState(() => builds[0]?.id ?? 'all')
  const [semester, setSemester]             = useState('Fall')  // 'Fall' | 'Spring'
  const [quarter, setQuarter]               = useState('all')    // 'all' | Q1/Q2 (Fall) | S1/S2 (Spring)
  const [meetingPattern, setMeetingPattern] = useState('all')    // 'all' | 'once' | 'rotating'
  const [filtersOpen, setFiltersOpen] = useState(false)
  const isMobile = useIsMobile()
  const filterCount = (semester !== 'Fall' ? 1 : 0) + (quarter !== 'all' ? 1 : 0) + (meetingPattern !== 'all' ? 1 : 0)

  const activeBuild = buildId === 'all' ? null : builds.find(b => b.id === buildId)
  const courseIdSet = activeBuild ? new Set(activeBuild.courseIds) : null

  // Quarter codes are semester-aware
  const Q_HALF1 = semester === 'Fall' ? 'Q1' : 'S1'
  const Q_HALF2 = semester === 'Fall' ? 'Q2' : 'S2'

  // Reset quarter filter when semester changes
  useEffect(() => { setQuarter('all') }, [semester])

  const matchesQuarter = (qTerm) => {
    if (quarter === 'all') return true
    return qTermsOverlap(qTerm, quarter)
  }
  const matchesSemester = (qTerm) => semesterFor(qTerm) === semester
  // 'once' = fixed weekday (War & Peace on Wed, IFCs on Thu, late-day seminars).
  // 'rotating' = courses with weekday: null that alternate Mon/Tue or Thu/Fri.
  const matchesPattern = (sched) => {
    if (meetingPattern === 'all') return true
    if (meetingPattern === 'once') return sched.weekday != null
    if (meetingPattern === 'rotating') return sched.weekday == null
    return true
  }

  // Resolve sections; co-meeting courses (multiple section-less entries) plot every entry.
  const scheduled = useMemo(() => {
    const buildSections = activeBuild?.sections ?? null
    return COURSES
      .filter(c => courseIdSet ? courseIdSet.has(c.id) : true)
      .flatMap(c => {
        const sections = getCourseSections(c.id)
        if (sections.length === 0) return []
        const isCoMeeting = sections.length > 1 && sections.every(s => s.section == null)
        if (isCoMeeting) return sections.map(sched => ({ course: c, sched, sections }))
        const sched = buildSections ? getActiveSection(c.id, buildSections) : sections[0]
        return sched ? [{ course: c, sched, sections }] : []
      })
      .filter(({ sched }) => matchesSemester(sched.qTerm) && matchesQuarter(sched.qTerm) && matchesPattern(sched))
  }, [buildId, builds, quarter, semester, meetingPattern, activeBuild])

  // Actual weekly meeting count. A weekday: null X-day or Y-day course meets
  // twice per week (renders in both columns); fixed-weekday sections meet once.
  const meetingsPerWeek = useMemo(() => {
    return scheduled.reduce((sum, { sched }) => {
      const renderedColumns = sched.weekday ? 1 : (sched.dayType === 'W' ? 1 : 2)
      return sum + renderedColumns
    }, 0)
  }, [scheduled])

  // Courses in this build that don't have any scheduling data, OR whose
  // scheduled sections all fall in the OTHER semester from the one being viewed.
  const unscheduled = useMemo(() => {
    if (!activeBuild) return []
    return COURSES.filter(c => {
      if (!activeBuild.courseIds.includes(c.id)) return false
      const sections = getCourseSections(c.id)
      if (sections.length === 0) return true
      return !sections.some(s => semesterFor(s.qTerm) === semester)
    })
  }, [buildId, builds, semester])

  const columnsWithItems = useMemo(() => {
    const buildNotes = activeBuild?.notes ?? {}
    // Only flag conflicts when planning an actual build. The "All courses" survey
    // view shares slots between every elective by definition — flagging those as
    // conflicts is noise that masks per-course colors.
    const detectConflicts = activeBuild != null
    return COLUMNS.map(col => {
      const items = scheduled
        .filter(({ sched }) => sched.dayType === col.dayType && col.accepts(sched.weekday))
        .map(it => ({ ...it, note: buildNotes[it.course.id] ?? null, isConflict: false }))
      if (detectConflicts) {
        for (let i = 0; i < items.length; i++) {
          for (let j = i + 1; j < items.length; j++) {
            if (items[i].sched.timeSlot === items[j].sched.timeSlot &&
                qTermsOverlap(items[i].sched.qTerm, items[j].sched.qTerm)) {
              items[i].isConflict = true
              items[j].isConflict = true
            }
          }
        }
      }
      return { column: col, items }
    })
  }, [scheduled, activeBuild])

  const takenSlotsByType = useMemo(() => {
    const map = { X: new Map(), Y: new Map(), W: new Map() }
    scheduled.forEach(({ sched }) => {
      const m = map[sched.dayType]
      const arr = m.get(sched.timeSlot) ?? []
      arr.push(sched.qTerm)
      m.set(sched.timeSlot, arr)
    })
    return map
  }, [scheduled])

  const totalConflicts = useMemo(() => {
    if (!activeBuild) return 0
    const seen = new Set()
    columnsWithItems.forEach(({ items }) => {
      for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
          if (items[i].sched.timeSlot === items[j].sched.timeSlot &&
              qTermsOverlap(items[i].sched.qTerm, items[j].sched.qTerm)) {
            const key = [items[i].course.id, items[j].course.id].sort().join('|')
            seen.add(key)
          }
        }
      }
    })
    return seen.size
  }, [columnsWithItems, activeBuild])

  const buildCredits = activeBuild
    ? activeBuild.courseIds.reduce((sum, id) => sum + (COURSES.find(x => x.id === id)?.credits ?? 0), 0)
    : 0
  const semesterTermLabel = semester === 'Fall' ? 'Fall 2026' : 'Spring 2027'
  const semesterCredits = activeBuild
    ? activeBuild.courseIds.reduce((sum, id) => {
        const c = COURSES.find(x => x.id === id)
        if (!c || c.term !== semesterTermLabel) return sum
        return sum + c.credits
      }, 0)
    : 0

  const isEmpty = activeBuild && activeBuild.courseIds.length === 0

  const handleRemove = activeBuild ? (courseId) => removeFromBuild(courseId, activeBuild.id) : null
  const handleSwitchSection = activeBuild ? (courseId) => {
    const sections = getCourseSections(courseId)
    if (sections.length < 2) return
    const current = activeBuild.sections?.[courseId] ?? sections[0].section
    const idx = Math.max(0, sections.findIndex(s => s.section === current))
    const next = sections[(idx + 1) % sections.length]
    setBuildSection(activeBuild.id, courseId, next.section)
  } : null
  const handleExport = () => { if (activeBuild) downloadICS(activeBuild, COURSES, semester) }

  // ── Color picker ────────────────────────────────────────────────────────────
  const [picker, setPicker] = useState(null)  // { courseId, courseTitle } | null
  const colorOverrides = activeBuild?.colors ?? {}
  const handleColorPick = activeBuild && setBuildCourseColor
    ? (courseId, courseTitle) => setPicker({ courseId, courseTitle })
    : null
  const handleColorPicked = (idx) => {
    if (!picker || !activeBuild) return
    setBuildCourseColor(activeBuild.id, picker.courseId, idx)
    setPicker(null)
  }

  // ── Drag-and-drop wiring ────────────────────────────────────────────────────
  const [isDragOver, setIsDragOver] = useState(false)
  const [draggingItem, setDraggingItem] = useState(null)

  const handleCalendarDragOver = (e) => {
    if (!activeBuild) return
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
    if (!isDragOver) setIsDragOver(true)
  }
  const handleCalendarDragLeave = (e) => {
    // Only clear when leaving the wrapper, not just moving over a child
    if (e.currentTarget === e.target) setIsDragOver(false)
  }
  const handleCalendarDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    setDraggingItem(null)
    if (!activeBuild) return
    try {
      const { courseId, sectionId } = JSON.parse(e.dataTransfer.getData('text/plain'))
      if (!courseId) return
      addToBuild(courseId, activeBuild.id)
      if (sectionId) setBuildSection(activeBuild.id, courseId, sectionId)
    } catch {}
  }

  return (
    <div style={{ background: '#f9f7f6', minHeight: 'calc(100vh - 56px)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: isMobile ? '1.25rem 0.75rem 2rem' : '1.25rem 1.5rem 3rem' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexWrap: 'wrap' }}>
              <CalendarDays size={isMobile ? 18 : 22} style={{ color: '#A41034' }} />
              <h1 style={{ fontSize: isMobile ? '1.25rem' : '1.5rem', fontWeight: 800, margin: 0, color: '#111827', letterSpacing: '-0.02em' }}>
                Weekly Schedule
              </h1>
              <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 600 }}>
                · {semesterTermLabel}
              </span>
            </div>
            <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginTop: 5, display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <span>{meetingsPerWeek} class meeting{meetingsPerWeek !== 1 ? 's' : ''}</span>
              {activeBuild && (
                <>
                  <span>·</span>
                  <span>
                    <strong style={{ color: '#A41034' }}>{semesterCredits}</strong> {semester} cr
                    {semesterCredits !== buildCredits && (
                      <span style={{ color: '#9ca3af' }}> ({buildCredits} total)</span>
                    )}
                  </span>
                </>
              )}
              {totalConflicts > 0 && (
                <>
                  <span>·</span>
                  <span style={{ color: '#ef4444', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}>
                    <AlertTriangle size={12} /> {totalConflicts} conflict{totalConflicts > 1 ? 's' : ''}
                  </span>
                </>
              )}
            </div>
          </div>
          <div style={{
            display: 'flex', gap: '0.4rem', alignItems: 'center', flexWrap: 'wrap',
            width: isMobile ? '100%' : 'auto',
          }}>
            <select value={buildId} onChange={e => setBuildId(e.target.value)}
              style={{
                padding: isMobile ? '0.55rem 0.75rem' : '0.45rem 0.75rem',
                border: '1px solid #e5e7eb', borderRadius: '0.5rem',
                background: '#fff', color: '#111827',
                fontSize: '0.875rem', fontFamily: 'inherit',
                cursor: 'pointer', outline: 'none', fontWeight: 600,
                flex: isMobile ? 1 : 'unset',
                minWidth: 0,
              }}>
              <option value="all">All courses</option>
              {builds.map(b => <option key={b.id} value={b.id}>{b.name} ({b.courseIds.length})</option>)}
            </select>
            {activeBuild && activeBuild.courseIds.length > 0 && (
              <button onClick={handleExport} title="Download .ics for Google/Apple Calendar" aria-label="Download calendar"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.3rem',
                  padding: isMobile ? '0.55rem 0.7rem' : '0.45rem 0.75rem',
                  border: '1px solid #e5e7eb', borderRadius: '0.5rem',
                  background: '#fff', color: '#374151',
                  fontSize: '0.875rem', fontFamily: 'inherit', cursor: 'pointer', fontWeight: 600,
                  flexShrink: 0,
                }}>
                <Download size={14} /> {isMobile ? '' : 'Calendar'}
              </button>
            )}
            {isMobile && (
              <button onClick={() => setFiltersOpen(o => !o)} title="Show filters" aria-label="Show filters"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.3rem',
                  padding: '0.55rem 0.7rem',
                  border: `1px solid ${filtersOpen || filterCount > 0 ? '#A41034' : '#e5e7eb'}`,
                  borderRadius: '0.5rem',
                  background: filtersOpen || filterCount > 0 ? '#fff1f2' : '#fff',
                  color: filtersOpen || filterCount > 0 ? '#A41034' : '#374151',
                  fontSize: '0.875rem', fontFamily: 'inherit', cursor: 'pointer', fontWeight: 600,
                  flexShrink: 0,
                }}>
                <SlidersHorizontal size={14} />
                {filterCount > 0 && (
                  <span style={{ fontSize: '0.7rem', background: '#A41034', color: '#fff', borderRadius: 10, padding: '0.05rem 0.4rem', fontWeight: 700 }}>
                    {filterCount}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Filters — semester + quarter + pattern in one row. Hidden on mobile when collapsed. */}
        <div style={{ display: isMobile && !filtersOpen ? 'none' : 'flex', gap: '0.875rem', marginBottom: '0.625rem', alignItems: 'center', flexWrap: 'wrap', rowGap: '0.5rem' }}>
          {/* Semester */}
          <div style={{ display: 'flex', gap: '0.375rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: '#6b7280', fontWeight: 600 }}>Semester:</span>
            {[
              ['Fall',   isMobile ? 'Fall'   : 'Fall 2026'],
              ['Spring', isMobile ? 'Spring' : 'Spring 2027'],
            ].map(([val, lbl]) => (
              <button key={val} onClick={() => setSemester(val)}
                style={{
                  padding: '0.3rem 0.75rem', borderRadius: 20,
                  border: `1px solid ${semester === val ? '#A41034' : '#e5e7eb'}`,
                  background: semester === val ? '#fff1f2' : '#fff',
                  color: semester === val ? '#A41034' : '#6b7280',
                  fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                }}>{lbl}</button>
            ))}
          </div>

          {/* Quarter */}
          <div style={{ display: 'flex', gap: '0.375rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: '#6b7280', fontWeight: 600 }}>Show:</span>
            {[
              ['all',   isMobile ? 'Both' : (semester === 'Fall' ? 'Both quarters' : 'Both halves'), '#374151'],
              [Q_HALF1, isMobile ? Q_HALF1 : `${Q_HALF1} only`, QUARTER_COLOR[Q_HALF1]],
              [Q_HALF2, isMobile ? Q_HALF2 : `${Q_HALF2} only`, QUARTER_COLOR[Q_HALF2]],
            ].map(([val, lbl, color]) => (
              <button key={val} onClick={() => setQuarter(val)}
                style={{
                  padding: '0.3rem 0.75rem', borderRadius: 20,
                  border: `1px solid ${quarter === val ? color : '#e5e7eb'}`,
                  background: quarter === val ? `${color}15` : '#fff',
                  color: quarter === val ? color : '#6b7280',
                  fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                }}>{lbl}</button>
            ))}
          </div>

          {/* Meeting pattern */}
          <div style={{ display: 'flex', gap: '0.375rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: '#6b7280', fontWeight: 600 }}>Pattern:</span>
            {[
              ['all',      isMobile ? 'All'      : 'All meetings',                       '#374151'],
              ['once',     isMobile ? 'Weekly'   : 'Once per week',                      '#0891b2'],
              ['rotating', isMobile ? 'Rotating' : 'Rotating Mon/Tue or Thu/Fri',        '#7c3aed'],
            ].map(([val, lbl, color]) => (
              <button key={val} onClick={() => setMeetingPattern(val)}
                title={
                  val === 'once'     ? 'Fixed-weekday courses (War & Peace, IFCs, late-day seminars)' :
                  val === 'rotating' ? 'Standard electives that alternate between Mon/Tue or Thu/Fri' :
                  'Show all meeting patterns'
                }
                style={{
                  padding: '0.3rem 0.75rem', borderRadius: 20,
                  border: `1px solid ${meetingPattern === val ? color : '#e5e7eb'}`,
                  background: meetingPattern === val ? `${color}15` : '#fff',
                  color: meetingPattern === val ? color : '#6b7280',
                  fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                }}>{lbl}</button>
            ))}
          </div>

          {semester === 'Spring' && !isMobile && (
            <span style={{ fontSize: '0.7rem', color: '#9ca3af', flexBasis: '100%' }}>
              Note: Spring schedule data is best-guess pending the official Spring 2027 timetable.
            </span>
          )}
          {!isMobile && (
            <span style={{ fontSize: '0.7rem', color: '#9ca3af', marginLeft: 'auto' }}>
              Dashed = alternates weekly · Hover a block to remove or switch sections
            </span>
          )}
        </div>

        {/* Calendar + (desktop) sidebar */}
        <div style={{
          display: 'flex', gap: '0.75rem',
          marginBottom: '0.75rem',
          alignItems: 'flex-start',
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            {isEmpty ? (
              <div style={{ textAlign: 'center', padding: '2.5rem 1.5rem', border: '2px dashed #e5e7eb', borderRadius: '0.875rem', color: '#9ca3af', background: '#fff' }}>
                <CalendarDays size={32} style={{ marginBottom: '0.5rem', opacity: 0.3 }} />
                <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#374151' }}>No courses in this build yet</div>
                <p style={{ fontSize: '0.875rem', margin: '0 0 1rem' }}>
                  {isMobile ? 'Add courses from the catalog or use the panel below.' : 'Drag a course from the side rail, or browse the catalog.'}
                </p>
                <Link to="/courses" style={{ color: '#A41034', fontSize: '0.875rem' }}>Browse the catalog →</Link>
              </div>
            ) : (
              <div
                onDragOver={handleCalendarDragOver}
                onDragLeave={handleCalendarDragLeave}
                onDrop={handleCalendarDrop}
                style={{
                  background: '#fff',
                  border: `1px solid ${isDragOver ? '#A41034' : '#e5e7eb'}`,
                  borderRadius: '0.875rem',
                  padding: isMobile ? '1rem' : 0,
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'border-color 0.12s, box-shadow 0.12s',
                  boxShadow: isDragOver ? '0 0 0 3px #fff1f2' : 'none',
                }}>
                {isMobile ? (
                  columnsWithItems.map(({ column, items }) => (
                    <MobileDayList key={column.key} column={column} items={items}
                      colorOverrides={colorOverrides}
                      onRemove={handleRemove}
                      onSwitchSection={handleSwitchSection}
                      onColorPick={handleColorPick} />
                  ))
                ) : (
                  <>
                    <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb' }}>
                      <div style={{ width: 58, flexShrink: 0, background: '#fafafa' }} />
                      {COLUMNS.map(col => <DayHeader key={col.key} column={col} />)}
                    </div>
                    <div style={{ display: 'flex' }}>
                      <TimeRuler />
                      {columnsWithItems.map(({ column, items }, idx) => (
                        <CalendarColumn key={column.key}
                          items={items}
                          colorOverrides={colorOverrides}
                          onRemove={handleRemove}
                          onSwitchSection={handleSwitchSection}
                          onColorPick={handleColorPick}
                          isLast={idx === columnsWithItems.length - 1}
                        />
                      ))}
                    </div>
                  </>
                )}
                {isDragOver && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(164, 16, 52, 0.04)',
                    border: '2px dashed #A41034',
                    borderRadius: '0.875rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    pointerEvents: 'none', zIndex: 30,
                  }}>
                    <div style={{
                      background: '#A41034', color: '#fff',
                      padding: '0.5rem 1rem', borderRadius: 20,
                      fontSize: '0.85rem', fontWeight: 700,
                      boxShadow: '0 4px 14px rgba(164,16,52,0.3)',
                    }}>
                      Drop to add to {activeBuild?.name}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Desktop sidebar (drag-to-add) */}
          {!isMobile && activeBuild && (
            <CourseSidebar
              activeBuild={activeBuild}
              addToBuild={addToBuild}
              setBuildSection={setBuildSection}
              semester={semester}
              takenSlotsByType={takenSlotsByType}
              onDragStartItem={setDraggingItem}
              onDragEndItem={() => { setDraggingItem(null); setIsDragOver(false) }}
            />
          )}
        </div>

        {unscheduled.length > 0 && (
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '0.875rem', padding: '1.25rem 1.5rem', marginBottom: '0.75rem' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#374151', marginBottom: '0.75rem' }}>
              Other semester courses in this build
              <span style={{ fontWeight: 400, color: '#9ca3af', marginLeft: '0.5rem' }}>— different semester, not plotted above</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.625rem' }}>
              {unscheduled.map(course => (
                <div key={course.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 0.75rem', background: '#f9fafb', border: '1px solid #f3f4f6', borderRadius: '0.5rem' }}>
                  <Link to={`/courses/${course.id}`} style={{ flex: 1, fontSize: '0.875rem', fontWeight: 600, color: '#111827', textDecoration: 'none' }}>
                    {course.title}
                    <div style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 400 }}>{course.term} · {course.credits}cr</div>
                  </Link>
                  {activeBuild && (
                    <button onClick={() => removeFromBuild(course.id, activeBuild.id)}
                      style={{ padding: '0.25rem', background: 'none', border: 'none', cursor: 'pointer', color: '#d1d5db', borderRadius: 4 }}
                      title="Remove from build">
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Add-courses panel: mobile only (desktop uses the drag rail). */}
        {activeBuild && isMobile && (
          <CourseAdder
            activeBuild={activeBuild}
            addToBuild={addToBuild}
            setBuildSection={setBuildSection}
            takenSlotsByType={takenSlotsByType}
            semester={semester}
          />
        )}
      </div>

      {picker && (
        <ColorPickerModal
          courseId={picker.courseId}
          courseTitle={picker.courseTitle}
          currentIdx={colorOverrides[picker.courseId]}
          onPick={handleColorPicked}
          onClose={() => setPicker(null)}
        />
      )}
    </div>
  )
}
