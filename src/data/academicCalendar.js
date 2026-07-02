// EC Academic Calendar — AY 2026-27 (Class of 2027)
// Source: "MBA Program 2026-27 EC Academic Calendar" PDF (last updated 4/10/2026)
// Day-type codes:
//   X / Y     — class days on the X (Mon/Tue) or Y (Thu/Fri) schedule
//   STAR      — class day for once-weekly & Q4 courses (1/27 only)
//   REG       — required registration
//   HOLIDAY   — Harvard University holiday
//   EXAMS     — exam period
//   BRIDGES   — Bridges on-campus academic program (required)
//   SIPS      — Short Intensive Programs (optional, January term)
//   WS        — Weekend Sprint (optional)
//   OPEN      — open day (job search, trek coordination, breaks)
//   COMMENCE  — Commencement

export const CAL_LAST_UPDATED = '4.10.26'

export const TERM_INFO = [
  {
    name: 'Fall Term',
    quarters: 'Quarter 1 · Quarter 2',
    x: { sessions: 28, rows: [['Q1', '9/2 – 10/19'], ['Q2', '10/20 – 12/1']] },
    y: { sessions: 28, rows: [['Q1', '9/3 – 10/15'], ['Q2', '10/16 – 12/3']] },
  },
  {
    name: 'Spring Term',
    quarters: 'Quarter 3 · Quarter 4',
    x: { sessions: 27, rows: [['Q3', '1/25 – 3/8'], ['Q4', '3/9 – 4/20']] },
    y: { sessions: 27, rows: [['Q3', '1/26 – 3/5'], ['Q4', '3/10 – 4/21']] },
  },
]

export const TYPE_META = {
  X:        { label: 'X day (Mon/Tue schedule)',                  cls: 'is-x' },
  Y:        { label: 'Y day (Thu/Fri schedule)',                  cls: 'is-y' },
  STAR:     { label: 'Class day — once-weekly & Q4 courses',      cls: 'is-star' },
  REG:      { label: 'Registration (required)',                   cls: 'is-reg' },
  HOLIDAY:  { label: 'University holiday',                        cls: 'is-holiday' },
  EXAMS:    { label: 'Exams & papers',                            cls: 'is-exams' },
  BRIDGES:  { label: 'Bridges (required)',                        cls: 'is-bridges' },
  SIPS:     { label: 'SIPs (optional)',                           cls: 'is-sips' },
  WS:       { label: 'Weekend Sprint (optional)',                 cls: 'is-ws' },
  OPEN:     { label: 'Open day',                                  cls: 'is-open' },
  COMMENCE: { label: 'Commencement',                              cls: 'is-commence' },
}

// Legend order for the page
export const LEGEND_TYPES = ['X', 'Y', 'STAR', 'OPEN', 'REG', 'HOLIDAY', 'EXAMS', 'BRIDGES', 'SIPS', 'WS', 'COMMENCE']

// Months rendered on the page: [year, monthIndex(0-based), footnote]
export const CAL_MONTHS = [
  [2026, 8,  '9/1 Registration · 9/7 Labor Day · 9/26 Weekend Sprint'],
  [2026, 9,  '10/12 Indigenous Peoples’ Day · Q2 begins 10/16 (Y) / 10/20 (X)'],
  [2026, 10, '11/1 Weekend Sprint · 11/11 Veterans Day · 11/25–27 Thanksgiving'],
  [2026, 11, '12/4–11 Fall exams, then winter recess'],
  [2027, 0,  '1/11–22 SIPs · 1/18 MLK Day · 1/25–26 Q3 begins · 1/27 once-weekly class day'],
  [2027, 1,  '2/15 Presidents’ Day'],
  [2027, 2,  '3/6 Weekend Sprint · Q4 begins 3/9–10 · 3/13–21 Spring Break'],
  [2027, 3,  'Exams 4/22 – noon 4/28 · Bridges 4/28–30 (required)'],
  [2027, 4,  '5/24 Memorial Day · 5/27 Commencement, Class of 2027'],
]

// ── Day-by-day map ───────────────────────────────────────────────────────────
// Keyed 'YYYY-MM-DD'. Days not listed are ordinary non-class days.
export const CALENDAR_DAYS = {
  // September 2026
  '2026-09-01': { type: 'REG', note: 'EC Required Registration' },
  '2026-09-02': { type: 'X', note: 'Q1 begins (X)' },
  '2026-09-03': { type: 'Y', note: 'Q1 begins (Y)' },
  '2026-09-04': { type: 'OPEN' },
  '2026-09-07': { type: 'HOLIDAY', note: 'Labor Day' },
  '2026-09-08': { type: 'X' },
  '2026-09-09': { type: 'X' },
  '2026-09-10': { type: 'Y' },
  '2026-09-11': { type: 'Y' },
  '2026-09-14': { type: 'X' },
  '2026-09-15': { type: 'X' },
  '2026-09-16': { type: 'Y' },
  '2026-09-17': { type: 'Y' },
  '2026-09-18': { type: 'Y' },
  '2026-09-21': { type: 'OPEN' },
  '2026-09-22': { type: 'X' },
  '2026-09-23': { type: 'X' },
  '2026-09-24': { type: 'Y' },
  '2026-09-25': { type: 'Y' },
  '2026-09-26': { type: 'WS', note: 'Weekend Sprint' },
  '2026-09-28': { type: 'X' },
  '2026-09-29': { type: 'X' },
  '2026-09-30': { type: 'Y' },

  // October 2026
  '2026-10-01': { type: 'Y' },
  '2026-10-02': { type: 'Y' },
  '2026-10-05': { type: 'X' },
  '2026-10-06': { type: 'X' },
  '2026-10-07': { type: 'Y' },
  '2026-10-08': { type: 'Y' },
  '2026-10-09': { type: 'OPEN' },
  '2026-10-12': { type: 'HOLIDAY', note: 'Indigenous Peoples’ Day' },
  '2026-10-13': { type: 'X' },
  '2026-10-14': { type: 'X' },
  '2026-10-15': { type: 'Y', note: 'Q1 ends (Y)' },
  '2026-10-16': { type: 'Y', note: 'Q2 begins (Y)' },
  '2026-10-19': { type: 'X', note: 'Q1 ends (X)' },
  '2026-10-20': { type: 'X', note: 'Q2 begins (X)' },
  '2026-10-21': { type: 'X' },
  '2026-10-22': { type: 'Y' },
  '2026-10-23': { type: 'Y' },
  '2026-10-26': { type: 'X' },
  '2026-10-27': { type: 'X' },
  '2026-10-28': { type: 'Y' },
  '2026-10-29': { type: 'OPEN' },
  '2026-10-30': { type: 'Y' },

  // November 2026
  '2026-11-01': { type: 'WS', note: 'Weekend Sprint' },
  '2026-11-02': { type: 'X' },
  '2026-11-03': { type: 'X' },
  '2026-11-04': { type: 'Y' },
  '2026-11-05': { type: 'Y' },
  '2026-11-06': { type: 'Y' },
  '2026-11-09': { type: 'X' },
  '2026-11-10': { type: 'X' },
  '2026-11-11': { type: 'HOLIDAY', note: 'Veterans Day' },
  '2026-11-12': { type: 'Y' },
  '2026-11-13': { type: 'Y' },
  '2026-11-16': { type: 'X' },
  '2026-11-17': { type: 'OPEN' },
  '2026-11-18': { type: 'X' },
  '2026-11-19': { type: 'Y' },
  '2026-11-20': { type: 'Y' },
  '2026-11-23': { type: 'X' },
  '2026-11-24': { type: 'X' },
  '2026-11-25': { type: 'HOLIDAY', note: 'Thanksgiving Recess' },
  '2026-11-26': { type: 'HOLIDAY', note: 'Thanksgiving Recess' },
  '2026-11-27': { type: 'HOLIDAY', note: 'Thanksgiving Recess' },
  '2026-11-30': { type: 'X' },

  // December 2026
  '2026-12-01': { type: 'X', note: 'Q2 ends (X)' },
  '2026-12-02': { type: 'Y' },
  '2026-12-03': { type: 'Y', note: 'Q2 ends (Y)' },
  '2026-12-04': { type: 'EXAMS' },
  '2026-12-05': { type: 'EXAMS' },
  '2026-12-06': { type: 'EXAMS' },
  '2026-12-07': { type: 'EXAMS' },
  '2026-12-08': { type: 'EXAMS' },
  '2026-12-09': { type: 'EXAMS' },
  '2026-12-10': { type: 'EXAMS' },
  '2026-12-11': { type: 'EXAMS' },

  // January 2027 — January Term 1/4-22, SIPs 1/11-22
  '2027-01-11': { type: 'SIPS' },
  '2027-01-12': { type: 'SIPS' },
  '2027-01-13': { type: 'SIPS' },
  '2027-01-14': { type: 'SIPS' },
  '2027-01-15': { type: 'SIPS' },
  '2027-01-18': { type: 'HOLIDAY', note: 'Martin Luther King Jr. Day' },
  '2027-01-19': { type: 'SIPS' },
  '2027-01-20': { type: 'SIPS' },
  '2027-01-21': { type: 'SIPS' },
  '2027-01-22': { type: 'SIPS' },
  '2027-01-25': { type: 'X', note: 'Q3 begins (X)' },
  '2027-01-26': { type: 'Y', note: 'Q3 begins (Y)' },
  '2027-01-27': { type: 'STAR', note: 'Class day for once-weekly & Q4 courses' },
  '2027-01-28': { type: 'X' },
  '2027-01-29': { type: 'Y' },

  // February 2027
  '2027-02-01': { type: 'X' },
  '2027-02-02': { type: 'X' },
  '2027-02-03': { type: 'Y' },
  '2027-02-04': { type: 'Y' },
  '2027-02-05': { type: 'Y' },
  '2027-02-08': { type: 'X' },
  '2027-02-09': { type: 'X' },
  '2027-02-10': { type: 'Y' },
  '2027-02-11': { type: 'Y' },
  '2027-02-12': { type: 'Y' },
  '2027-02-15': { type: 'HOLIDAY', note: 'Presidents’ Day' },
  '2027-02-16': { type: 'X' },
  '2027-02-17': { type: 'X' },
  '2027-02-18': { type: 'Y' },
  '2027-02-19': { type: 'Y' },
  '2027-02-22': { type: 'X' },
  '2027-02-23': { type: 'X' },
  '2027-02-24': { type: 'Y' },
  '2027-02-25': { type: 'Y' },
  '2027-02-26': { type: 'OPEN' },

  // March 2027
  '2027-03-01': { type: 'X' },
  '2027-03-02': { type: 'X' },
  '2027-03-03': { type: 'X' },
  '2027-03-04': { type: 'Y' },
  '2027-03-05': { type: 'Y', note: 'Q3 ends (Y)' },
  '2027-03-06': { type: 'WS', note: 'Weekend Sprint' },
  '2027-03-08': { type: 'X', note: 'Q3 ends (X)' },
  '2027-03-09': { type: 'X', note: 'Q4 begins (X)' },
  '2027-03-10': { type: 'Y', note: 'Q4 begins (Y)' },
  '2027-03-11': { type: 'Y' },
  '2027-03-12': { type: 'Y' },
  '2027-03-15': { type: 'OPEN', note: 'Spring Break' },
  '2027-03-16': { type: 'OPEN', note: 'Spring Break' },
  '2027-03-17': { type: 'OPEN', note: 'Spring Break' },
  '2027-03-18': { type: 'OPEN', note: 'Spring Break' },
  '2027-03-19': { type: 'OPEN', note: 'Spring Break' },
  '2027-03-22': { type: 'X' },
  '2027-03-23': { type: 'X' },
  '2027-03-24': { type: 'X' },
  '2027-03-25': { type: 'Y' },
  '2027-03-26': { type: 'Y' },
  '2027-03-29': { type: 'OPEN' },
  '2027-03-30': { type: 'X' },
  '2027-03-31': { type: 'Y' },

  // April 2027
  '2027-04-01': { type: 'Y' },
  '2027-04-02': { type: 'Y' },
  '2027-04-05': { type: 'X' },
  '2027-04-06': { type: 'X' },
  '2027-04-07': { type: 'X' },
  '2027-04-08': { type: 'Y' },
  '2027-04-09': { type: 'Y' },
  '2027-04-12': { type: 'X' },
  '2027-04-13': { type: 'X' },
  '2027-04-14': { type: 'X' },
  '2027-04-15': { type: 'Y' },
  '2027-04-16': { type: 'Y' },
  '2027-04-19': { type: 'X' },
  '2027-04-20': { type: 'X', note: 'Q4 ends (X)' },
  '2027-04-21': { type: 'Y', note: 'Q4 ends (Y)' },
  '2027-04-22': { type: 'EXAMS', note: 'EC exams & papers begin' },
  '2027-04-23': { type: 'EXAMS' },
  '2027-04-24': { type: 'EXAMS' },
  '2027-04-25': { type: 'EXAMS' },
  '2027-04-26': { type: 'EXAMS' },
  '2027-04-27': { type: 'EXAMS' },
  '2027-04-28': { type: 'BRIDGES', note: 'Exams until noon, then Bridges' },
  '2027-04-29': { type: 'BRIDGES' },
  '2027-04-30': { type: 'BRIDGES' },

  // May 2027
  '2027-05-24': { type: 'HOLIDAY', note: 'Memorial Day' },
  '2027-05-27': { type: 'COMMENCE', note: 'Commencement — Class of 2027' },
}
