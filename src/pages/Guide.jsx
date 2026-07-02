import { useMemo } from 'react'
import { ListChecks, FlaskConical, ArrowLeftRight, ExternalLink, Video } from 'lucide-react'

// EC logistics distilled from my.hbs.edu (Registration Basics, Deadlines,
// Independent Projects, Cross-Registration pages — retrieved 7/1/26).

const DEADLINES = [
  { date: '2026-07-15', d: 'Jul 15', t: '11:59 PM', label: 'Application-only course applications due' },
  { date: '2026-07-16', d: 'Jul 16', t: '6:00 PM',  label: 'EC Registration webinar', href: 'https://hbs.zoom.us/j/94612230346', soft: true },
  { date: '2026-07-23', d: 'Jul 23', t: '8:00 AM',  label: 'EC Registration webinar', href: 'https://hbs.zoom.us/j/94089539256', soft: true },
  { date: '2026-07-27', d: 'Jul 27', t: '10:00 AM', label: 'Ranking window opens in Schedule Scout' },
  { date: '2026-07-27', d: 'Jul 27', t: '3:00 PM',  label: 'Independent Project registration opens', soft: true },
  { date: '2026-08-10', d: 'Aug 10', t: '6:00 PM',  label: 'Ranking window closes — preferences locked' },
  { date: '2026-08-17', d: 'Aug 17', t: null,       label: 'Initial schedules released' },
  { date: '2026-08-28', d: 'Aug 28', t: '6:00 PM',  label: 'Add/Drop batch 1' },
  { date: '2026-09-03', d: 'Sep 3',  t: '6:00 PM',  label: 'Add/Drop batch 2' },
  { date: '2026-09-11', d: 'Sep 11', t: '6:00 PM',  label: 'Add/Drop period ends · IP registration steps due' },
]

const CROSS_REG_SCHOOLS = [
  { label: 'HKS',      href: 'https://www.hks.harvard.edu/educational-programs/academic-calendars-policies' },
  { label: 'HLS',      href: 'https://hls.harvard.edu/academics/curriculum/cross-registration-at-harvard-law-school/cross-registration-calendar/' },
  { label: 'GSE',      href: 'https://www.gse.harvard.edu/community/students/academic-calendar' },
  { label: 'HMS',      href: 'https://meded.hms.harvard.edu/academic-calendars' },
  { label: 'HSPH',     href: 'https://hsph.harvard.edu/office/registrar/academic-calendar/' },
  { label: 'GSAS',     href: 'https://registrar.fas.harvard.edu/calendar' },
  { label: 'HDS',      href: 'https://www.hds.harvard.edu/academics/registrar/academic-calendar' },
  { label: 'GSD',      href: 'https://www.gsd.harvard.edu/resources/academic-calendars-schedules/' },
  { label: 'MIT',      href: 'https://registrar.mit.edu/calendar' },
  { label: 'Fletcher', href: 'https://fletcher.tufts.edu/programs/courses/class-schedules-academic-calendars' },
]

function nextDeadlineIndex(items) {
  const now = new Date()
  const todayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  return items.findIndex(x => x.date >= todayKey)
}

export default function Guide() {
  const nextIdx = useMemo(() => nextDeadlineIndex(DEADLINES), [])

  return (
    <div className="page">
      <div className="wrap">
        <div className="page-head">
          <div>
            <h1 className="page-head__title">The EC <em>Guide</em></h1>
            <p className="page-head__sub">
              Registration deadlines, how Schedule Scout works, Independent Projects, and cross-registration — the essentials, without the tabs.
            </p>
          </div>
          <div className="page-head__meta">Fall 2026 · From my.hbs.edu</div>
        </div>
        <div className="rule rule--soft" />

        <div className="guide">
          {/* ── Deadlines timeline ── */}
          <section className="gcard gcard--tl">
            <h2 className="gcard__title">Fall registration deadlines</h2>
            <ol className="tl">
              {DEADLINES.map((x, i) => {
                const past = i < nextIdx || nextIdx === -1
                const isNext = i === nextIdx
                return (
                  <li key={i} className={'tl__row' + (past ? ' is-past' : '') + (isNext ? ' is-next' : '') + (x.soft ? ' is-soft' : '')}>
                    <span className="tl__date">{x.d}</span>
                    <span className="tl__dot" />
                    <span className="tl__body">
                      {x.href
                        ? <a href={x.href} target="_blank" rel="noreferrer">{x.label} <Video size={12} /></a>
                        : x.label}
                      {x.t && <em>{x.t}</em>}
                      {isNext && <b className="tl__next">Next</b>}
                    </span>
                  </li>
                )
              })}
            </ol>
          </section>

          {/* ── Schedule Scout ── */}
          <section className="gcard">
            <h2 className="gcard__title"><ListChecks size={17} /> How Schedule Scout works</h2>
            <p className="gcard__lede">
              Registration runs through <b>Schedule Scout</b>, a strategy-proof matching algorithm — rank courses honestly; there's no gaming it.
            </p>
            <ul className="gcard__list">
              <li>Drag courses into four buckets — <b>Favorite · Great · Good · Acceptable</b>. Order <i>within</i> each bucket matters too.</li>
              <li>Rank at least <b>2× as many courses as you need</b>, and include every section of a course you'd take.</li>
              <li>Never rank a course you wouldn't actually want — you may get it.</li>
              <li>The algorithm assigns all schedules at once, respecting capacity and time conflicts.</li>
              <li>You're auto-waitlisted for everything you ranked above your best enrollment — no action needed.</li>
              <li>Then refine during Add/Drop: add open courses, drop, join or leave waitlists.</li>
            </ul>
            <p className="gcard__fine">Questions → ecreg@hbs.edu</p>
          </section>

          {/* ── Independent Projects ── */}
          <section className="gcard">
            <h2 className="gcard__title"><FlaskConical size={17} /> Independent Projects</h2>
            <p className="gcard__lede">
              Field-based credit: research, analysis, a report, and a final presentation — supervised by an HBS faculty member (required; no emeriti).
            </p>
            <ul className="gcard__list">
              <li>Register: complete the IP form, upload to the <a href="https://pine.hbs.edu/ip/student/" target="_blank" rel="noreferrer">IP Registration tool <ExternalLink size={11} /></a>, and get all e-signatures by <b>Sep 11, 6:00 PM</b>.</li>
              <li>Deliverables due to your supervisor by <b>mid-December</b> (Fall) or <b>late April</b> (Spring).</li>
              <li>Watch the <b>16.5-credit term limit</b> — going over blocks you from Add/Drop until you drop something.</li>
              <li>Pursuing 4.5–6 credits? Email independentproject@hbs.edu first.</li>
              <li>Find projects via the <a href="https://my.hbs.edu/mba/support/academics/planning/independent-projects-opportunity-postings" target="_blank" rel="noreferrer">opportunity postings <ExternalLink size={11} /></a> or faculty from past coursework.</li>
              <li>Company wants an NDA? Use the HBS template (protects your IP ownership). Travel isn't reimbursed — Social Enterprise IPs may qualify for a grant.</li>
            </ul>
            <p className="gcard__fine">Questions → independentproject@hbs.edu</p>
          </section>

          {/* ── Cross-Registration ── */}
          <section className="gcard gcard--wide">
            <h2 className="gcard__title"><ArrowLeftRight size={17} /> Cross-registration</h2>
            <p className="gcard__lede">
              Take courses at other Harvard schools, MIT, or Tufts Fletcher. No pre-registering — it happens at the start of the host school's term, and most start later than HBS.
            </p>
            <ul className="gcard__list">
              <li>Browse the catalog and petition via <a href="https://my.harvard.edu/" target="_blank" rel="noreferrer">my.harvard.edu <ExternalLink size={11} /></a> (Fletcher uses its own paper form).</li>
              <li>Keep a <b>full HBS course load</b> — and attend those classes — until the host school confirms your enrollment.</li>
              <li>Dropping a cross-reg course? Tell ectoolkit@hbs.edu before the late-drop deadline, and notify the host school.</li>
              <li>Materials are on your own dime; a partial Program Fee refund applies if you finish under 30 HBS credits.</li>
              <li><b>MIT in Spring:</b> confirm up front that the instructor can submit your grade by mid-May, or it can hold up graduation. You'll also need an MIT ID + Kerberos account.</li>
            </ul>
            <div className="gcard__links">
              <span className="gcard__linklabel">Host school calendars</span>
              {CROSS_REG_SCHOOLS.map(s => (
                <a key={s.label} className="glink" href={s.href} target="_blank" rel="noreferrer">
                  {s.label} <ExternalLink size={10} />
                </a>
              ))}
            </div>
          </section>
        </div>

        <p className="cal-fineprint">
          Distilled from my.hbs.edu · Retrieved 7/1/26 · Policies live in the MBA Student Handbook
        </p>
      </div>
    </div>
  )
}
