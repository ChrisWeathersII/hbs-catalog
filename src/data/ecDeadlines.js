// Fall 2026 EC registration deadlines — shared by the Guide page and the
// next-deadline pill in the nav. Source: my.hbs.edu (retrieved 7/1/26).
// `soft` = informational (webinars, openings) — shown on the Guide timeline
// but skipped by the nav pill, which only surfaces hard deadlines.

export const DEADLINES = [
  { date: '2026-07-15', d: 'Jul 15', t: '11:59 PM', label: 'Application-only course applications due', short: 'App-only courses due' },
  { date: '2026-07-16', d: 'Jul 16', t: '6:00 PM',  label: 'EC Registration webinar', href: 'https://hbs.zoom.us/j/94612230346', soft: true },
  { date: '2026-07-23', d: 'Jul 23', t: '8:00 AM',  label: 'EC Registration webinar', href: 'https://hbs.zoom.us/j/94089539256', soft: true },
  { date: '2026-07-27', d: 'Jul 27', t: '10:00 AM', label: 'Ranking window opens in Schedule Scout', short: 'Ranking opens' },
  { date: '2026-07-27', d: 'Jul 27', t: '3:00 PM',  label: 'Independent Project registration opens', soft: true },
  { date: '2026-08-10', d: 'Aug 10', t: '6:00 PM',  label: 'Ranking window closes — preferences locked', short: 'Ranking closes' },
  { date: '2026-08-17', d: 'Aug 17', t: null,       label: 'Initial schedules released', short: 'Schedules released' },
  { date: '2026-08-28', d: 'Aug 28', t: '6:00 PM',  label: 'Add/Drop batch 1', short: 'Add/Drop batch 1' },
  { date: '2026-09-03', d: 'Sep 3',  t: '6:00 PM',  label: 'Add/Drop batch 2', short: 'Add/Drop batch 2' },
  { date: '2026-09-11', d: 'Sep 11', t: '6:00 PM',  label: 'Add/Drop period ends · IP registration steps due', short: 'Add/Drop ends' },
]

export function todayKey() {
  const t = new Date()
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`
}

// Index of the first deadline on/after today (-1 when all are past)
export function nextDeadlineIndex(items = DEADLINES) {
  const key = todayKey()
  return items.findIndex(x => x.date >= key)
}

// Next hard (non-soft) deadline, for the nav pill. Null when the season is over.
export function nextHardDeadline() {
  const key = todayKey()
  return DEADLINES.find(x => !x.soft && x.date >= key) ?? null
}
