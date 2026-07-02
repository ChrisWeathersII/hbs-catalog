import { useMemo } from 'react'
import { CALENDAR_DAYS, CAL_MONTHS, TERM_INFO, TYPE_META, LEGEND_TYPES, CAL_LAST_UPDATED } from '../data/academicCalendar'

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']
const DOW = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const dateKey = (y, m, d) =>
  `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`

function todayKey() {
  const t = new Date()
  return dateKey(t.getFullYear(), t.getMonth(), t.getDate())
}

// ── One month card ────────────────────────────────────────────────────────────
function MonthCard({ year, month, footnote, today }) {
  const firstDow = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < firstDow; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <section className="mcal" aria-label={`${MONTH_NAMES[month]} ${year}`}>
      <header className="mcal__head">
        <h3 className="mcal__name">{MONTH_NAMES[month]}</h3>
        <span className="mcal__year">{year}</span>
      </header>
      <div className="mcal__grid" role="grid">
        {DOW.map((d, i) => <div key={'dow' + i} className="mcal__dow">{d}</div>)}
        {cells.map((d, i) => {
          if (d === null) return <div key={'pad' + i} className="dcell dcell--pad" />
          const key = dateKey(year, month, d)
          const info = CALENDAR_DAYS[key]
          const meta = info ? TYPE_META[info.type] : null
          const title = info
            ? `${MONTH_NAMES[month]} ${d} — ${info.note ? `${info.note} · ` : ''}${meta.label}`
            : undefined
          return (
            <div key={key}
              className={'dcell' + (meta ? ` ${meta.cls}` : '') + (key === today ? ' is-today' : '')}
              title={title}>
              {info?.type === 'STAR' ? <span className="dcell__star">{d}<i>*</i></span> : d}
            </div>
          )
        })}
      </div>
      {footnote && <p className="mcal__note">{footnote}</p>}
    </section>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function AcademicCalendar() {
  const today = useMemo(todayKey, [])

  return (
    <div className="page">
      <div className="wrap">
        <div className="page-head">
          <div>
            <h1 className="page-head__title">The Academic <em>Calendar</em></h1>
            <p className="page-head__sub">
              The full EC year at a glance — class days, quarters, exams, holidays, and breaks for the Class of 2027.
            </p>
          </div>
          <div className="page-head__meta">AY 2026–2027 · Updated {CAL_LAST_UPDATED}</div>
        </div>
        <div className="rule rule--soft" />

        {/* Term summaries */}
        <div className="cal-terms">
          {TERM_INFO.map(t => (
            <div key={t.name} className="termcard">
              <div className="termcard__head">
                <h2 className="termcard__name">{t.name}</h2>
                <span className="termcard__q">{t.quarters}</span>
              </div>
              <div className="termcard__grid">
                {[['x', 'X', t.x], ['y', 'Y', t.y]].map(([k, label, sched]) => (
                  <div key={k} className={`termcard__sched termcard__sched--${k}`}>
                    <div className="termcard__day">
                      <span className={`dot dot--${k}`} />
                      {label} schedule
                      <em>{sched.sessions} sessions</em>
                    </div>
                    {sched.rows.map(([q, range]) => (
                      <div key={q} className="termcard__row">
                        <b>{q}</b><span>{range}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="cal-legend" aria-label="Legend">
          {LEGEND_TYPES.map(t => (
            <span key={t} className="lg">
              <i className={`lg__swatch ${TYPE_META[t].cls}`} />
              {TYPE_META[t].label}
            </span>
          ))}
        </div>

        {/* Month grid */}
        <div className="cal-months">
          {CAL_MONTHS.map(([y, m, note]) => (
            <MonthCard key={`${y}-${m}`} year={y} month={m} footnote={note} today={today} />
          ))}
        </div>

        <p className="cal-fineprint">
          Calendar subject to change · Hover any day for details · Source: MBA Program 2026–27 EC Academic Calendar
        </p>
      </div>
    </div>
  )
}
