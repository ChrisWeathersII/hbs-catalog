// Student evaluation data — HBS course evaluations for Fall 2026 electives.
// Source: Course Catalog All Courses Evaluation Data.xlsx (Chris's pull, 8.7.26).
// Keyed by 4-digit course number. `evals` holds one row per evaluated section;
// quality / instr / prepHrs on the course object are response-weighted averages.
// Scale: quality + instr are 1-7. prepHrs = avg prep hours per class session.

export const COURSE_EVALS = {
  '1120': { code: "CATS 1120", quality: 7.0, instr: 6.9, prepHrs: 2.4, responses: 36, evals: [
    { term: "Fall '25", section: "1120-00", faculty: "Spar, Debora", prepHrs: 2.4, prepSD: 1.1, quality: 7.0, qualitySD: 0.2, instr: 6.9, instrSD: 0.3, responses: 36 },
  ] },
  '1130': { code: "EGC 1130", quality: 6.4, instr: 6.6, prepHrs: 1.4, responses: 46, evals: [
    { term: "Fall '25", section: "1130-00", faculty: "Jones, Geoffrey", prepHrs: 1.4, prepSD: 1.1, quality: 6.4, qualitySD: 1.0, instr: 6.6, instrSD: 0.8, responses: 46 },
  ] },
  '1143': { code: "SGI 1143", quality: 6.9, instr: 6.9, prepHrs: 1.3, responses: 31, evals: [
    { term: "Fall '25", section: "1143-00", faculty: "Trumbull, Gunnar", prepHrs: 1.3, prepSD: 0.9, quality: 6.9, qualitySD: 0.4, instr: 6.9, instrSD: 0.2, responses: 31 },
  ] },
  '1153': { code: "GCPPF 1153", quality: 6.7, instr: 6.9, prepHrs: 1.4, responses: 67, evals: [
    { term: "Fall '25", section: "1153-00", faculty: "Reinert, Sophus", prepHrs: 1.4, prepSD: 0.9, quality: 6.7, qualitySD: 0.7, instr: 6.9, instrSD: 0.4, responses: 67 },
  ] },
  '1180': { code: "IMAGE 1180", quality: 6.5, instr: 6.7, prepHrs: 1.6, responses: 159, evals: [
    { term: "Spring '25", section: "1180-01", faculty: "Pons, Vincent", prepHrs: 1.7, prepSD: 1.3, quality: 6.4, qualitySD: 1.0, instr: 6.5, instrSD: 0.9, responses: 48 },
    { term: "Spring '25", section: "1180-02", faculty: "Pons, Vincent", prepHrs: 1.9, prepSD: 1.3, quality: 6.5, qualitySD: 0.8, instr: 6.7, instrSD: 0.5, responses: 24 },
    { term: "Spring '26", section: "1180-01", faculty: "Pons, Vincent", prepHrs: 1.4, prepSD: 0.9, quality: 6.5, qualitySD: 0.8, instr: 6.7, instrSD: 0.6, responses: 53 },
    { term: "Spring '26", section: "1180-02", faculty: "Pons, Vincent", prepHrs: 1.4, prepSD: 1.0, quality: 6.6, qualitySD: 0.7, instr: 6.8, instrSD: 0.5, responses: 34 },
  ] },
  '1185': { code: "INNOV SCAL 1185", quality: 6.5, instr: 6.8, prepHrs: 1.3, responses: 24, evals: [
    { term: "Fall '25", section: "1185-00", faculty: "Roche, Maria", prepHrs: 1.3, prepSD: 1.1, quality: 6.5, qualitySD: 0.7, instr: 6.8, instrSD: 0.5, responses: 24 },
  ] },
  '1231': { code: "MCS 1231", quality: 6.0, instr: 6.4, prepHrs: 1.5, responses: 45, evals: [
    { term: "Fall '25", section: "1231-00", faculty: "Tamayo, Jorge", prepHrs: 1.6, prepSD: 1.5, quality: 6.5, qualitySD: 0.9, instr: 6.8, instrSD: 0.5, responses: 16 },
    { term: "Spring '25", section: "1231-00", faculty: "Tamayo, Jorge", prepHrs: 1.4, prepSD: 1.1, quality: 5.5, qualitySD: 1.7, instr: 5.9, instrSD: 1.8, responses: 20 },
    { term: "Spring '26", section: "1231-00", faculty: "Tamayo, Jorge", prepHrs: 1.4, prepSD: 1.0, quality: 6.4, qualitySD: 0.7, instr: 6.8, instrSD: 0.5, responses: 9 },
  ] },
  '1265': { code: "GC 1265", newCourse: true, evals: [] },
  '1286': { code: "STR TECH 1286", quality: 6.4, instr: 6.4, prepHrs: 1.3, responses: 127, evals: [
    { term: "Fall '25", section: "1286-01", faculty: "Yoffie, David", prepHrs: 1.3, prepSD: 1.1, quality: 6.5, qualitySD: 0.7, instr: 6.4, instrSD: 1.1, responses: 65 },
    { term: "Fall '25", section: "1286-02", faculty: "Yoffie, David", prepHrs: 1.4, prepSD: 1.3, quality: 6.3, qualitySD: 0.9, instr: 6.4, instrSD: 0.7, responses: 62 },
  ] },
  '1287': { code: "ACS 1287", quality: 6.3, instr: 6.8, prepHrs: 1.0, responses: 19, evals: [
    { term: "Fall '25", section: "1285-00", faculty: "Van den Steen, Eric", prepHrs: 1.0, prepSD: 0.5, quality: 6.3, qualitySD: 0.7, instr: 6.8, instrSD: 0.4, responses: 19 },
  ] },
  '1306': { code: "BAV 1306", quality: 6.5, instr: 6.8, prepHrs: 1.5, responses: 43, evals: [
    { term: "Fall '25", section: "1306-00", faculty: "Pacelli, Joseph", prepHrs: 1.5, prepSD: 0.9, quality: 6.5, qualitySD: 0.9, instr: 6.8, instrSD: 0.6, responses: 43 },
  ] },
  '1315': { code: "TAF 1315", quality: 6.5, instr: 6.8, prepHrs: 1.3, responses: 32, evals: [
    { term: "Fall '25", section: "1315-00", faculty: "Dey, Aiyesha; Heese, Jonas", prepHrs: 1.3, prepSD: 1.1, quality: 6.5, qualitySD: 0.7, instr: 6.8, instrSD: 0.4, responses: 32 },
  ] },
  '1340': { code: "OBD 1340", newCourse: true, evals: [] },
  '1412': { code: "ItFO 1412", quality: 5.2, instr: 5.7, prepHrs: 1.3, responses: 40, evals: [
    { term: "Spring '26", section: "1412-00", faculty: "Cohen, Lauren", prepHrs: 1.3, prepSD: 1.5, quality: 5.2, qualitySD: 1.7, instr: 5.7, instrSD: 1.6, responses: 40 },
  ] },
  '1416': { code: "CFO 1416", quality: 6.3, instr: 6.7, prepHrs: 1.2, responses: 99, evals: [
    { term: "Fall '25", section: "1416-00", faculty: "Foley, C. Fritz", prepHrs: 1.2, prepSD: 0.8, quality: 6.3, qualitySD: 0.7, instr: 6.7, instrSD: 0.5, responses: 99 },
  ] },
  '1428': { code: "VCPE 1428", quality: 6.3, instr: 6.6, prepHrs: 1.3, responses: 137, evals: [
    { term: "Fall '25", section: "1428-01", faculty: "Tango, Jo", prepHrs: 1.3, prepSD: 0.7, quality: 6.5, qualitySD: 0.8, instr: 6.6, instrSD: 0.8, responses: 78 },
    { term: "Fall '25", section: "1428-02", faculty: "Jones, Archie", prepHrs: 1.2, prepSD: 0.8, quality: 6.1, qualitySD: 1.1, instr: 6.6, instrSD: 0.8, responses: 59 },
  ] },
  '1440': { code: "PEF 1440", quality: 6.9, instr: 7.0, prepHrs: 1.6, responses: 164, evals: [
    { term: "Fall '25", section: "1440-01", faculty: "Berk, Edward", prepHrs: 1.6, prepSD: 1.2, quality: 6.9, qualitySD: 0.3, instr: 7.0, instrSD: 0.2, responses: 87 },
    { term: "Fall '25", section: "1440-02", faculty: "Berk, Edward", prepHrs: 1.5, prepSD: 0.9, quality: 7.0, qualitySD: 0.2, instr: 7.0, instrSD: 0.0, responses: 77 },
  ] },
  '1446': { code: "IMCM 1446", quality: 6.5, instr: 6.7, prepHrs: 1.3, responses: 160, evals: [
    { term: "Fall '25", section: "1446-01", faculty: "Viceira, Luis", prepHrs: 1.2, prepSD: 0.9, quality: 6.4, qualitySD: 0.9, instr: 6.7, instrSD: 0.8, responses: 93 },
    { term: "Fall '25", section: "1446-02", faculty: "Siriwardane, Emil", prepHrs: 1.4, prepSD: 1.1, quality: 6.6, qualitySD: 0.6, instr: 6.7, instrSD: 0.5, responses: 67 },
  ] },
  '1452': { code: "FMSF 1452", quality: 6.3, instr: 6.4, prepHrs: 1.0, responses: 169, evals: [
    { term: "Fall '25", section: "1452-01", faculty: "Ruback, Richard; Yudkoff, Royce", prepHrs: 1.0, prepSD: 0.9, quality: 6.3, qualitySD: 0.9, instr: 6.4, instrSD: 0.8, responses: 89 },
    { term: "Fall '25", section: "1452-02", faculty: "Ruback, Richard; Yudkoff, Royce", prepHrs: 0.9, prepSD: 0.7, quality: 6.3, qualitySD: 0.9, instr: 6.4, instrSD: 0.9, responses: 80 },
  ] },
  '1495': { code: "SUST INVES 1495", quality: 6.4, instr: 6.6, prepHrs: 1.3, responses: 22, evals: [
    { term: "Spring '26", section: "1495-00", faculty: "Cole, Shawn", prepHrs: 1.3, prepSD: 1.2, quality: 6.4, qualitySD: 0.7, instr: 6.6, instrSD: 0.6, responses: 22 },
  ] },
  '1504': { code: "BSSE 1504", quality: 6.6, instr: 6.6, prepHrs: 1.4, responses: 73, evals: [
    { term: "Fall '25", section: "1504-02", faculty: "van Bever, Derek", prepHrs: 1.4, prepSD: 0.9, quality: 6.6, qualitySD: 0.7, instr: 6.6, instrSD: 0.8, responses: 73 },
  ] },
  '1509': { code: "MIFS 1509", quality: 6.1, instr: 6.2, prepHrs: 1.5, responses: 99, evals: [
    { term: "Spring '25", section: "1509-00", faculty: "Scharfstein, David", prepHrs: 1.5, prepSD: 0.8, quality: 6.1, qualitySD: 0.9, instr: 6.1, instrSD: 1.0, responses: 52 },
    { term: "Spring '26", section: "1509-00", faculty: "Scharfstein, David", prepHrs: 1.4, prepSD: 0.8, quality: 6.2, qualitySD: 1.3, instr: 6.3, instrSD: 1.2, responses: 47 },
  ] },
  '1529': { code: "CCL 1529", quality: 4.7, instr: 5.3, prepHrs: 1.3, responses: 53, evals: [
    { term: "Fall '25", section: "1529-00", faculty: "Koehn, Nancy", prepHrs: 1.3, prepSD: 1.3, quality: 4.7, qualitySD: 1.8, instr: 5.3, instrSD: 1.8, responses: 53 },
  ] },
  '1540': { code: "LME 1540", quality: 6.6, instr: 6.7, prepHrs: 1.2, responses: 216, evals: [
    { term: "Fall '25", section: "1540-00", faculty: "Batter, John", prepHrs: 1.1, prepSD: 0.7, quality: 6.5, qualitySD: 0.8, instr: 6.8, instrSD: 0.5, responses: 68 },
    { term: "Spring '25", section: "1540-00", faculty: "Batter, John", prepHrs: 1.3, prepSD: 1.0, quality: 6.8, qualitySD: 0.5, instr: 6.8, instrSD: 0.4, responses: 74 },
    { term: "Spring '26", section: "1540-00", faculty: "Batter, John", prepHrs: 1.3, prepSD: 0.9, quality: 6.4, qualitySD: 1.0, instr: 6.4, instrSD: 1.1, responses: 74 },
  ] },
  '1562': { code: "ML 1562", newCourse: true, evals: [] },
  '1563': { code: "SLL 1563", quality: 5.8, instr: 6.2, prepHrs: 1.1, responses: 101, evals: [
    { term: "Spring '25", section: "1563-00", faculty: "Hsieh, Nien-he; van Bever, Derek", prepHrs: 1.3, prepSD: 1.2, quality: 5.6, qualitySD: 1.6, instr: 6.0, instrSD: 1.4, responses: 42 },
    { term: "Spring '26", section: "1563-00", faculty: "Hsieh, Nien-he; van Bever, Derek", prepHrs: 0.9, prepSD: 1.0, quality: 6.0, qualitySD: 1.3, instr: 6.3, instrSD: 1.1, responses: 59 },
  ] },
  '1581': { code: "SESC 1581", quality: 6.6, instr: 6.8, prepHrs: 1.3, responses: 143, evals: [
    { term: "Fall '25", section: "1581-01", faculty: "Trelstad, Brian", prepHrs: 1.3, prepSD: 1.0, quality: 6.8, qualitySD: 0.4, instr: 6.9, instrSD: 0.3, responses: 80 },
    { term: "Fall '25", section: "1581-02", faculty: "Chertavian, Gerald", prepHrs: 1.4, prepSD: 1.1, quality: 6.4, qualitySD: 0.9, instr: 6.6, instrSD: 0.8, responses: 63 },
  ] },
  '1613': { code: "BAIV 1613", newCourse: true, evals: [] },
  '1623': { code: "PUB ENT 1623", quality: 6.2, instr: 6.8, prepHrs: 1.1, responses: 61, evals: [
    { term: "Fall '25", section: "1623-00", faculty: "Weiss, Mitchell", prepHrs: 1.1, prepSD: 0.8, quality: 6.2, qualitySD: 1.0, instr: 6.8, instrSD: 0.5, responses: 61 },
  ] },
  '1625': { code: "ENT FIN 1625", quality: 4.5, instr: 4.7, prepHrs: 1.3, responses: 61, evals: [
    { term: "Fall '25", section: "1624-00", faculty: "Howell, Sabrina", prepHrs: 1.3, prepSD: 1.1, quality: 4.5, qualitySD: 1.4, instr: 4.7, instrSD: 1.7, responses: 61 },
  ] },
  '1632': { code: "3 TECH 1632", quality: 6.5, instr: 6.6, prepHrs: 1.3, responses: 45, evals: [
    { term: "Spring '26", section: "1632-00", faculty: "Ghosh, Shikhar", prepHrs: 1.3, prepSD: 0.9, quality: 6.5, qualitySD: 0.8, instr: 6.6, instrSD: 0.7, responses: 45 },
  ] },
  '1655': { code: "ES 101 1655", quality: 6.6, instr: 6.7, prepHrs: 1.7, responses: 488, evals: [
    { term: "Fall '25", section: "1655-01", faculty: "Roberge, Mark; Shipley, N. Louis", prepHrs: 1.6, prepSD: 1.2, quality: 6.6, qualitySD: 0.7, instr: 6.7, instrSD: 0.5, responses: 80 },
    { term: "Fall '25", section: "1655-02", faculty: "Roberge, Mark; Shipley, N. Louis", prepHrs: 1.7, prepSD: 1.3, quality: 6.6, qualitySD: 0.8, instr: 6.8, instrSD: 0.5, responses: 75 },
    { term: "Spring '25", section: "1655-01", faculty: "Roberge, Mark; Shipley, N. Louis", prepHrs: 1.7, prepSD: 1.2, quality: 6.5, qualitySD: 0.8, instr: 6.7, instrSD: 0.5, responses: 88 },
    { term: "Spring '25", section: "1655-02", faculty: "Roberge, Mark; Shipley, N. Louis", prepHrs: 1.7, prepSD: 1.2, quality: 6.5, qualitySD: 0.7, instr: 6.7, instrSD: 0.5, responses: 83 },
    { term: "Spring '26", section: "1655-02", faculty: "Roberge, Mark; Shipley, N. Louis", prepHrs: 1.7, prepSD: 1.1, quality: 6.6, qualitySD: 0.6, instr: 6.8, instrSD: 0.4, responses: 84 },
    { term: "Spring '26", section: "1655-03", faculty: "Roberge, Mark; Shipley, N. Louis", prepHrs: 1.7, prepSD: 1.2, quality: 6.6, qualitySD: 0.6, instr: 6.8, instrSD: 0.4, responses: 78 },
  ] },
  '1676': { code: "FM 1676", quality: 6.4, instr: 6.7, prepHrs: 1.3, responses: 138, evals: [
    { term: "Fall '25", section: "1676-01", faculty: "Satchu, Reza", prepHrs: 1.3, prepSD: 1.0, quality: 6.5, qualitySD: 0.9, instr: 6.7, instrSD: 0.9, responses: 73 },
    { term: "Fall '25", section: "1676-02", faculty: "Satchu, Reza", prepHrs: 1.2, prepSD: 0.9, quality: 6.3, qualitySD: 1.1, instr: 6.6, instrSD: 1.0, responses: 65 },
  ] },
  '1684': { code: "REAL PROP 1684", newCourse: true, evals: [] },
  '1705': { code: "EADTRPSL 1705", newCourse: true, evals: [] },
  '1757': { code: "LTV 1757", quality: 6.3, instr: 6.4, prepHrs: 1.2, responses: 232, evals: [
    { term: "Spring '25", section: "1757-00", faculty: "Bussgang, Jeffrey", prepHrs: 1.3, prepSD: 1.1, quality: 6.6, qualitySD: 0.7, instr: 6.8, instrSD: 0.6, responses: 89 },
    { term: "Spring '26", section: "1757-01", faculty: "Bussgang, Jeffrey", prepHrs: 1.3, prepSD: 0.8, quality: 6.8, qualitySD: 0.4, instr: 6.9, instrSD: 0.2, responses: 75 },
    { term: "Spring '26", section: "1757-02", faculty: "Mnookin, Allison", prepHrs: 1.0, prepSD: 0.9, quality: 5.3, qualitySD: 1.4, instr: 5.4, instrSD: 1.4, responses: 68 },
  ] },
  '1765': { code: "PROD MGMT 1765", quality: 6.5, instr: 6.8, prepHrs: 1.5, responses: 108, evals: [
    { term: "Spring '25", section: "1765-01", faculty: "Torti, Sara", prepHrs: 1.5, prepSD: 1.1, quality: 6.6, qualitySD: 0.6, instr: 6.8, instrSD: 0.5, responses: 54 },
    { term: "Spring '25", section: "1765-02", faculty: "Torti, Sara", prepHrs: 1.5, prepSD: 1.3, quality: 6.5, qualitySD: 0.9, instr: 6.7, instrSD: 0.7, responses: 54 },
  ] },
  '1777': { code: "EILS 1777", quality: 6.4, instr: 6.5, prepHrs: 1.6, responses: 74, evals: [
    { term: "Fall '25", section: "1777-00", faculty: "Tadikonda, Satish", prepHrs: 1.6, prepSD: 1.4, quality: 6.4, qualitySD: 1.0, instr: 6.5, instrSD: 0.8, responses: 74 },
  ] },
  '1791': { code: "SSV 1791", quality: 6.0, instr: 6.4, prepHrs: 1.5, responses: 18, evals: [
    { term: "Spring '26", section: "1789-00", faculty: "Sandino, Tatiana", prepHrs: 1.5, prepSD: 1.6, quality: 6.0, qualitySD: 1.0, instr: 6.4, instrSD: 0.7, responses: 18 },
  ] },
  '1816': { code: "MPGTD 1816", quality: 5.5, instr: 6.0, prepHrs: 1.1, responses: 84, evals: [
    { term: "Fall '25", section: "1816-00", faculty: "Whillans, Ashley", prepHrs: 1.1, prepSD: 0.7, quality: 5.3, qualitySD: 1.3, instr: 5.8, instrSD: 1.4, responses: 68 },
    { term: "Spring '25", section: "1816-00", faculty: "Whillans, Ashley", prepHrs: 1.2, prepSD: 0.6, quality: 6.6, qualitySD: 0.6, instr: 6.8, instrSD: 0.4, responses: 16 },
  ] },
  '1908': { code: "BBOP 1908", quality: 6.3, instr: 6.4, prepHrs: 1.5, responses: 33, evals: [
    { term: "Spring '25", section: "1908-00", faculty: "Rigol, Natalia; Roth, Benjamin", prepHrs: 1.7, prepSD: 1.5, quality: 6.2, qualitySD: 0.8, instr: 6.4, instrSD: 0.7, responses: 17 },
    { term: "Spring '26", section: "1908-00", faculty: "Rigol, Natalia; Roth, Benjamin", prepHrs: 1.3, prepSD: 1.0, quality: 6.4, qualitySD: 1.0, instr: 6.4, instrSD: 1.0, responses: 16 },
  ] },
  '1914': { code: "BEMS 1914", quality: 6.7, instr: 6.8, prepHrs: 1.2, responses: 132, evals: [
    { term: "Fall '25", section: "1914-01", faculty: "Elberse, Anita", prepHrs: 1.2, prepSD: 0.8, quality: 6.7, qualitySD: 0.6, instr: 6.8, instrSD: 0.5, responses: 71 },
    { term: "Fall '25", section: "1914-02", faculty: "Elberse, Anita", prepHrs: 1.1, prepSD: 0.6, quality: 6.6, qualitySD: 0.6, instr: 6.9, instrSD: 0.3, responses: 61 },
  ] },
  '1925': { code: "CBV 1925", quality: 5.1, instr: 5.9, prepHrs: 1.2, responses: 81, evals: [
    { term: "Spring '25", section: "1925-00", faculty: "De Freitas, Julian", prepHrs: 1.2, prepSD: 1.2, quality: 5.3, qualitySD: 1.4, instr: 5.9, instrSD: 0.9, responses: 43 },
    { term: "Spring '26", section: "1925-00", faculty: "De Freitas, Julian", prepHrs: 1.2, prepSD: 1.3, quality: 4.8, qualitySD: 1.2, instr: 5.8, instrSD: 1.2, responses: 38 },
  ] },
  '1985': { code: "B2B 1985", quality: 5.0, instr: 5.8, prepHrs: 0.9, responses: 95, evals: [
    { term: "Spring '25", section: "1985-00", faculty: "Shipley, N. Louis", prepHrs: 0.9, prepSD: 0.9, quality: 5.0, qualitySD: 1.3, instr: 5.7, instrSD: 1.2, responses: 66 },
    { term: "Spring '26", section: "1985-00", faculty: "Boyajian, Edward; Shipley, N. Louis", prepHrs: 0.9, prepSD: 0.8, quality: 5.1, qualitySD: 1.7, instr: 6.0, instrSD: 0.8, responses: 29 },
  ] },
  '1995': { code: "DMAIW 1995", quality: 5.4, instr: 5.9, prepHrs: 1.2, responses: 96, evals: [
    { term: "Fall '25", section: "1995-01", faculty: "Cook, Jacob", prepHrs: 1.3, prepSD: 1.1, quality: 5.5, qualitySD: 1.2, instr: 6.0, instrSD: 0.9, responses: 42 },
    { term: "Fall '25", section: "1995-02", faculty: "Cook, Jacob", prepHrs: 1.2, prepSD: 1.1, quality: 5.4, qualitySD: 1.4, instr: 5.8, instrSD: 1.4, responses: 54 },
  ] },
  '2043': { code: "MCAS 2043", quality: 6.7, instr: 6.9, prepHrs: 1.0, responses: 123, evals: [
    { term: "Spring '25", section: "2043-00", faculty: "Fubini, David", prepHrs: 1.0, prepSD: 0.8, quality: 6.6, qualitySD: 0.6, instr: 6.9, instrSD: 0.3, responses: 56 },
    { term: "Spring '26", section: "2043-00", faculty: "Fubini, David", prepHrs: 1.0, prepSD: 1.1, quality: 6.7, qualitySD: 0.5, instr: 6.9, instrSD: 0.4, responses: 67 },
  ] },
  '2061': { code: "MHC 2061", newCourse: true, evals: [] },
  '2077': { code: "LIFE 2077", quality: 6.5, instr: 6.7, prepHrs: 1.4, responses: 78, evals: [
    { term: "Fall '25", section: "2077-01", faculty: "Perlow, Leslie", prepHrs: 1.3, prepSD: 0.9, quality: 6.3, qualitySD: 1.0, instr: 6.6, instrSD: 0.8, responses: 38 },
    { term: "Fall '25", section: "2077-02", faculty: "Perlow, Leslie", prepHrs: 1.5, prepSD: 0.9, quality: 6.7, qualitySD: 0.6, instr: 6.8, instrSD: 0.5, responses: 40 },
  ] },
  '2108': { code: "SCM 2108", quality: 5.8, instr: 6.3, prepHrs: 1.2, responses: 130, evals: [
    { term: "Fall '25", section: "2108-00", faculty: "Ferreira, Kris", prepHrs: 1.3, prepSD: 0.9, quality: 6.0, qualitySD: 0.9, instr: 6.4, instrSD: 0.9, responses: 64 },
    { term: "Spring '25", section: "2108-00", faculty: "Ferreira, Kris", prepHrs: 1.2, prepSD: 0.9, quality: 5.7, qualitySD: 1.1, instr: 6.2, instrSD: 1.1, responses: 66 },
  ] },
  '2120': { code: "MSO 2120", quality: 6.2, instr: 6.6, prepHrs: 1.2, responses: 227, evals: [
    { term: "Fall '25", section: "2120-01", faculty: "Markey, Rob", prepHrs: 1.2, prepSD: 1.1, quality: 5.3, qualitySD: 1.3, instr: 5.7, instrSD: 1.3, responses: 56 },
    { term: "Fall '25", section: "2120-02", faculty: "Buell, Ryan", prepHrs: 1.2, prepSD: 0.7, quality: 6.6, qualitySD: 0.6, instr: 6.9, instrSD: 0.3, responses: 86 },
    { term: "Fall '25", section: "2120-03", faculty: "Buell, Ryan", prepHrs: 1.1, prepSD: 0.8, quality: 6.5, qualitySD: 0.8, instr: 6.8, instrSD: 0.4, responses: 85 },
  ] },
  '2158': { code: "FAMILY ENT 2158", quality: 6.1, instr: 6.5, prepHrs: 1.1, responses: 52, evals: [
    { term: "Fall '25", section: "2158-00", faculty: "Wing, Christina", prepHrs: 1.1, prepSD: 0.9, quality: 6.1, qualitySD: 0.9, instr: 6.5, instrSD: 0.6, responses: 52 },
  ] },
  '2165': { code: "Drv Pr Gro 2165", quality: 5.8, instr: 6.3, prepHrs: 1.2, responses: 45, evals: [
    { term: "Fall '25", section: "2165-00", faculty: "Alcacer, Juan; Sadun, Raffaella", prepHrs: 1.2, prepSD: 1.0, quality: 5.8, qualitySD: 1.4, instr: 6.3, instrSD: 1.0, responses: 45 },
  ] },
  '2185': { code: "IIH 2185", quality: 6.1, instr: 6.5, prepHrs: 1.5, responses: 28, evals: [
    { term: "Fall '25", section: "2185-00", faculty: "Creo, Benjamin (Ben); Herzlinger, Regina", prepHrs: 1.5, prepSD: 1.3, quality: 6.1, qualitySD: 1.1, instr: 6.5, instrSD: 1.0, responses: 28 },
  ] },
  '2218': { code: "NEG&DIP 2218", quality: 5.1, instr: 5.4, prepHrs: 1.5, responses: 33, evals: [
    { term: "Spring '26", section: "2218-00", faculty: "Burns, R. Nicholas; Sebenius, James", prepHrs: 1.5, prepSD: 1.5, quality: 5.1, qualitySD: 1.7, instr: 5.4, instrSD: 1.6, responses: 33 },
  ] },
  '2240': { code: "NEG 2240", quality: 6.6, instr: 6.8, prepHrs: 1.0, responses: 374, evals: [
    { term: "Fall '25", section: "2240-01", faculty: "Mohan, Kevin", prepHrs: 1.1, prepSD: 0.8, quality: 6.8, qualitySD: 0.4, instr: 6.9, instrSD: 0.3, responses: 54 },
    { term: "Fall '25", section: "2240-02", faculty: "Zlatev, Julian", prepHrs: 0.9, prepSD: 0.7, quality: 6.4, qualitySD: 0.7, instr: 6.6, instrSD: 0.8, responses: 56 },
    { term: "Fall '25", section: "2240-06", faculty: "Coffman, Katherine", prepHrs: 1.0, prepSD: 0.7, quality: 6.7, qualitySD: 0.8, instr: 6.9, instrSD: 0.3, responses: 54 },
    { term: "Fall '25", section: "2240-07", faculty: "Coffman, Katherine", prepHrs: 1.0, prepSD: 0.8, quality: 6.6, qualitySD: 0.6, instr: 6.9, instrSD: 0.3, responses: 53 },
    { term: "Spring '26", section: "2240-04", faculty: "Goldenberg, Amit", prepHrs: 1.1, prepSD: 1.0, quality: 6.7, qualitySD: 0.4, instr: 6.9, instrSD: 0.4, responses: 57 },
    { term: "Spring '26", section: "2240-05", faculty: "Goldenberg, Amit", prepHrs: 0.9, prepSD: 0.9, quality: 6.5, qualitySD: 0.8, instr: 6.8, instrSD: 0.5, responses: 56 },
    { term: "Spring '26", section: "2240-06", faculty: "Beshears, John", prepHrs: 1.1, prepSD: 1.2, quality: 6.6, qualitySD: 0.6, instr: 6.9, instrSD: 0.3, responses: 44 },
  ] },
  '2261': { code: "ADV-NEG 2261", quality: 5.6, instr: 5.9, prepHrs: 1.4, responses: 165, evals: [
    { term: "Spring '25", section: "2261-01", faculty: "Sebenius, James", prepHrs: 1.5, prepSD: 1.5, quality: 6.1, qualitySD: 1.3, instr: 6.4, instrSD: 0.8, responses: 55 },
    { term: "Spring '25", section: "2261-02", faculty: "Sebenius, James", prepHrs: 1.3, prepSD: 1.0, quality: 5.0, qualitySD: 1.5, instr: 5.4, instrSD: 1.6, responses: 75 },
    { term: "Spring '26", section: "2261-00", faculty: "Sebenius, James", prepHrs: 1.3, prepSD: 1.3, quality: 6.0, qualitySD: 1.6, instr: 6.1, instrSD: 1.4, responses: 35 },
  ] },
  '2265': { code: "DEALS 2265", quality: 6.7, instr: 6.9, prepHrs: 1.2, responses: 33, evals: [
    { term: "Fall '25", section: "2265-00", faculty: "Subramanian, Guhan", prepHrs: 1.2, prepSD: 0.9, quality: 6.7, qualitySD: 0.6, instr: 6.9, instrSD: 0.3, responses: 33 },
  ] },
  '2292': { code: "War&Peace 2292", quality: 6.3, instr: 6.5, prepHrs: 2.3, responses: 147, evals: [
    { term: "Fall '25", section: "2292-01", faculty: "Malhotra, Deepak", prepHrs: 2.4, prepSD: 1.5, quality: 6.5, qualitySD: 1.0, instr: 6.6, instrSD: 1.0, responses: 82 },
    { term: "Fall '25", section: "2292-02", faculty: "Mohan, Kevin", prepHrs: 2.2, prepSD: 1.3, quality: 6.1, qualitySD: 1.0, instr: 6.4, instrSD: 0.8, responses: 65 },
  ] },
  '5230': { code: "HBS-HKS 3 5230", quality: 5.2, instr: 5.6, prepHrs: 1.3, responses: 17, evals: [
    { term: "Fall '25", section: "5230-00", faculty: "Zelleke, Andy", prepHrs: 1.3, prepSD: 1.4, quality: 5.2, qualitySD: 1.8, instr: 5.6, instrSD: 1.5, responses: 17 },
  ] },
  '5240': { code: "DTV 5240", newCourse: true, evals: [] },
  '6333': { code: "FIELD X 6333", quality: 5.7, instr: 6.1, prepHrs: 1.5, responses: 67, evals: [
    { term: "Fall '25", section: "6333-00", faculty: "Cohen, Randolph", prepHrs: 1.5, prepSD: 2.1, quality: 5.7, qualitySD: 1.4, instr: 6.1, instrSD: 1.2, responses: 67 },
  ] },
  '6345': { code: "FC: BPIIHC 6345", quality: 6.3, instr: 6.5, prepHrs: 1.8, responses: 17, evals: [
    { term: "Fall '25", section: "6345-00", faculty: "Creo, Benjamin (Ben); Herzlinger, Regina", prepHrs: 1.8, prepSD: 2.0, quality: 6.3, qualitySD: 1.3, instr: 6.5, instrSD: 1.0, responses: 17 },
  ] },
  '6454': { code: "FC: SII 6454", quality: 5.8, instr: 6.2, prepHrs: 1.5, responses: 47, evals: [
    { term: "Spring '25", section: "6454-00", faculty: "Fleiss, Sara", prepHrs: 1.7, prepSD: 1.3, quality: 5.8, qualitySD: 1.0, instr: 6.1, instrSD: 0.9, responses: 27 },
    { term: "Spring '26", section: "6454-00", faculty: "Fleiss, Sara", prepHrs: 1.3, prepSD: 1.1, quality: 5.8, qualitySD: 1.5, instr: 6.3, instrSD: 1.1, responses: 20 },
  ] },
  '6605': { code: "FC: IFI 6605", quality: 6.0, instr: 6.3, prepHrs: 1.2, responses: 27, evals: [
    { term: "Fall '25", section: "6604-00", faculty: "Chertavian, Gerald; Jones, Archie; McComb, Emily; Trelstad, Brian", prepHrs: 1.2, prepSD: 0.8, quality: 6.0, qualitySD: 1.2, instr: 6.3, instrSD: 1.2, responses: 27 },
  ] },
  '6756': { code: "FC: LSHVC 6756", quality: 6.7, instr: 6.8, prepHrs: 2.2, responses: 16, evals: [
    { term: "Fall '25", section: "6756-00", faculty: "Tadikonda, Satish", prepHrs: 2.2, prepSD: 1.6, quality: 6.7, qualitySD: 0.6, instr: 6.8, instrSD: 0.4, responses: 16 },
  ] },
  '7515': { code: "ARTS 7515", quality: 5.8, instr: 6.1, prepHrs: 1.9, responses: 55, evals: [
    { term: "Spring '25", section: "7515-00", faculty: "Bertotti, Candace", prepHrs: 2.0, prepSD: 1.2, quality: 5.4, qualitySD: 1.6, instr: 5.8, instrSD: 1.6, responses: 27 },
    { term: "Spring '26", section: "7515-00", faculty: "Bertotti, Candace", prepHrs: 1.8, prepSD: 1.2, quality: 6.2, qualitySD: 0.9, instr: 6.3, instrSD: 0.9, responses: 28 },
  ] },
  '8031': { code: "IP: STRAT 8031", newCourse: true, evals: [] },
}

// Eval record for a course, by its 4-digit catalog number. Null when the
// spreadsheet has no row for it (mostly Spring 2027 courses).
export function getCourseEval(number) {
  return COURSE_EVALS[number] ?? null
}
