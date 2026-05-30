// HBS Elective Course Catalog — 122 courses (AY 2026-2027)
// Sources: Fall 2026 EC timetable (PDF, 4.22.26) + Spring 2026 catalog screenshots
//   used as proxy for Spring 2027 since the 2027 timetable isn't published yet.
// Dual-listed courses (offered both terms) are kept in Fall only.

export const COURSES = [
  {
    id: 'f572e281-6fa9-431d-b8a8-40c1094fd386',
    number: '1632',
    title: '3 Technologies that Will Change the World',
    units: ['Entrepreneurial Management'],
    faculty: ['Shikhar Ghosh'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Paper',
    popular: true,
  },
  {
    id: '975a5281-53ec-41b5-b193-9ef9cfc60250',
    number: '1287',
    title: 'Advanced Competitive Strategy',
    units: ['Strategy'],
    faculty: ['Eric J. Van den Steen'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Exam or paper',
    popular: true,
  },
  {
    id: '85e66038-c1a8-446d-8e59-a58cd843a12f',
    number: '2261',
    title: 'Advanced Negotiation: Great Dealmakers, Diplomats, and Deals',
    units: ['Negotiation', 'Organizations & Markets'],
    faculty: ['James Sebenius'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Optional',
    popular: true,
  },
  {
    id: '5081cddf-c9ba-446f-854d-72686905802a',
    number: '1995',
    title: 'AI-Powered Digital Marketing: The Operator\'s Workshop',
    units: ['Marketing'],
    faculty: ['Jacob Cook'],
    term: 'Fall 2026',
    credits: 1.5,
    assessment: 'Paper',
    popular: true,
  },
  {
    id: 'df94eb75-1354-415c-9754-22387adffbdf',
    number: '2090',
    title: 'Authentic Leader Development',
    units: ['Organizational Behavior'],
    faculty: ['Robin Ely', 'Deborah Winshel', 'Monique Burns Thompson'],
    term: 'Spring 2027',
    credits: 3.0,
    assessment: 'Paper',
    popular: true,
  },
  {
    id: '5a461398-905b-4dd2-93fc-61b209303897',
    number: '1985',
    title: 'B2B Sales and Distribution',
    units: ['Marketing', 'Entrepreneurial Management'],
    faculty: ['Ed Boyajian', 'Lou Shipley'],
    term: 'Spring 2027',
    credits: 1.5,
    assessment: 'Other',
    popular: false,
  },
  {
    id: '45817284-20d7-4993-8192-3f106cbd96a1',
    number: '1504',
    title: 'Building and Sustaining a Successful Enterprise',
    units: ['Technology & Operations Management', 'General Management'],
    faculty: ['Derek van Bever'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: null,
    popular: false,
  },
  {
    id: 'def08ede-a6bf-4fb1-bf5d-7d254dd55cf4',
    number: '1306',
    title: 'Business Analysis and Valuation Using Financial Statements',
    units: ['Accounting & Management'],
    faculty: ['Joseph Pacelli'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: '4c22a2b9-d146-4bdc-a6da-40b1b2fded75',
    number: '1908',
    title: 'Business at the Base of the Pyramid',
    units: ['Entrepreneurial Management'],
    faculty: ['Natalia Rigol', 'Benjamin N. Roth'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: 'b62437c6-6e44-43b1-a228-a2c822df455d',
    number: '1120',
    title: 'Capitalism and the State (CATS)',
    units: ['Business, Government & the International Economy', 'General Management'],
    faculty: ['Debora L. Spar'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Paper',
    popular: true,
  },
  {
    id: '82681870-6cb1-4b7b-a2f4-76e2a52c4284',
    number: '1564',
    title: 'Challenges and Opportunities in the Restaurant Industry',
    units: ['General Management', 'Entrepreneurial Management'],
    faculty: ['Andy Pforzheimer', 'Michael S. Kaufman'],
    term: 'Spring 2027',
    credits: 3.0,
    assessment: 'Exam',
    popular: false,
  },
  {
    id: '93d534d5-334e-40d4-928f-278434f383de',
    number: '1416',
    title: 'Corporate Finance: Corporate Financial Operations (CFO)',
    units: ['Finance'],
    faculty: ['C. Fritz Foley'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Exam',
    popular: true,
  },
  {
    id: 'ee22c766-8ae7-4b6e-b460-819c2e5efa78',
    number: '2077',
    title: 'Crafting Your Life: The First 10 Years Post MBA',
    units: ['Organizational Behavior'],
    faculty: ['Leslie Perlow'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Paper',
    popular: true,
  },
  {
    id: 'a01180d1-f53d-4a0b-accc-56b151b8f2f5',
    number: '1925',
    title: 'Creating Brand Value',
    units: ['Marketing'],
    faculty: ['Julian de Freitas'],
    term: 'Spring 2027',
    credits: 1.5,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: 'dfe57052-c00b-4728-9013-8e32a6f97b0e',
    number: '1160',
    title: 'Creating the Modern Financial System',
    units: ['Business, Government & the International Economy'],
    faculty: ['David Moss'],
    term: 'Spring 2027',
    credits: 3.0,
    assessment: 'Paper',
    popular: true,
  },
  {
    id: '4c3a5082-3948-47d8-a83f-2717f341e340',
    number: '5230',
    title: 'Creating Value in Business and Government (HKS-HBS Joint Degree Seminar)',
    units: ['General Management'],
    faculty: ['Andy Zelleke'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: '9f6772cb-47fc-4d7e-a367-7f719f5ed948',
    number: '1420',
    title: 'Creating Value Through Corporate Restructuring',
    units: ['Finance'],
    faculty: ['Stuart C. Gilson'],
    term: 'Spring 2027',
    credits: 3.0,
    assessment: 'Exam',
    popular: false,
  },
  {
    id: 'd50f9c8e-aa40-48db-a7dd-2d249c97cd01',
    number: '1529',
    title: 'Crucibles of Crisis Leadership',
    units: ['Entrepreneurial Management'],
    faculty: ['Nancy Koehn'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: '772ec662-27e7-44fb-9562-fc32315ee968',
    number: '2265',
    title: 'Deals',
    units: ['Negotiation', 'Organizations & Markets'],
    faculty: ['Guhan Subramanian'],
    term: 'Fall 2026',
    credits: 1.5,
    assessment: 'Paper',
    popular: true,
  },
  {
    id: '8f2c21c5-6cf6-4543-bcaa-62f2565d7a63',
    number: '2158',
    title: 'Demystifying the Family Enterprise',
    units: ['Technology & Operations Management'],
    faculty: ['Christina Wing'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: '142fde83-d8f5-41c5-a762-a7ff91830929',
    number: '5240',
    title: 'Designing Tech Ventures',
    units: ['Technology & Operations Management'],
    faculty: ['Robert Howe', 'Tom Clay'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: null,
    popular: false,
  },
  {
    id: '5a16b429-4c4b-4396-a8a9-7f899ce18115',
    number: '2111',
    title: 'Digital Operations',
    units: ['Technology & Operations Management'],
    faculty: ['Antonio Moreno'],
    term: 'Spring 2027',
    credits: 3.0,
    assessment: null,
    popular: false,
  },
  {
    id: '3f90dbf9-f939-43ed-949a-ffaf0d4bcf83',
    number: '2165',
    title: 'Driving Profitable Growth',
    units: ['Strategy'],
    faculty: ['Raffaella Sadun', 'Juan Alcacer'],
    term: 'Fall 2026',
    credits: 1.5,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: '5e7d49b5-760e-4c69-a9ef-eb29a1408480',
    number: '1105',
    title: 'Energy',
    units: ['Business, Government & the International Economy', 'General Management'],
    faculty: ['Dustin Tingley'],
    term: 'Spring 2027',
    credits: 1.5,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: '27577ad6-92bd-46ab-8e21-a84c6b3b354d',
    number: '1625',
    title: 'Entrepreneurial Finance',
    units: ['Entrepreneurial Management', 'Finance'],
    faculty: ['Raymond Kluender'],
    term: 'Spring 2027',
    credits: 3.0,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: 'aa8ac56e-c421-42ad-8062-76128e12308b',
    number: '1625',
    title: 'Entrepreneurial Finance (Q2)',
    units: ['Entrepreneurial Management'],
    faculty: ['Sabrina Howell'],
    term: 'Fall 2026',
    credits: 1.5,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: '5da00f30-d3c9-4722-8dbc-0a51fa2a2f7c',
    number: '1655',
    title: 'Entrepreneurial Sales 101: Founder Selling',
    units: ['Entrepreneurial Management'],
    faculty: ['Mark Roberge', 'Lou Shipley'],
    term: 'Fall 2026',
    credits: 1.5,
    assessment: null,
    popular: true,
  },
  {
    id: '15a51b39-9215-4889-9571-58b32a7aee1b',
    number: '1695',
    title: 'Entrepreneurial Sales 102: Building the First Sales Team',
    units: ['Entrepreneurial Management'],
    faculty: ['Lou Shipley'],
    term: 'Spring 2027',
    credits: 1.5,
    assessment: 'Paper/Project',
    popular: false,
  },
  {
    id: 'c403f8f6-61fb-42c7-b4c2-a29c80e0da92',
    number: '1130',
    title: 'Entrepreneurship and Global Capitalism',
    units: ['General Management'],
    faculty: ['Geoffrey Jones'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Exam with Paper option',
    popular: false,
  },
  {
    id: '6d66137a-ca41-4623-89f5-69fa7abca529',
    number: '1777',
    title: 'Entrepreneurship and Innovation in the Life Sciences',
    units: ['Entrepreneurial Management'],
    faculty: ['Satish Tadikonda'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: 'c3a7d1df-0b36-4e27-af68-02479817590e',
    number: '6340',
    title: 'Field Course: Advanced Business Plans for Innovating in Health Care',
    units: ['General Management'],
    faculty: ['Ben Creo', 'Regina Herzlinger'],
    term: 'Spring 2027',
    credits: 3.0,
    assessment: 'Paper/Project',
    popular: false,
  },
  {
    id: '3b6d720e-5775-407d-b621-e37d9d0a1a81',
    number: '6913',
    title: 'Field Course: Business of the Arts',
    units: ['General Management', 'Entrepreneurial Management'],
    faculty: ['Rohit Deshpande', 'Henry McGee'],
    term: 'Spring 2027',
    credits: 3.0,
    assessment: 'Project',
    popular: false,
  },
  {
    id: '65c49a3c-62af-4264-9754-a65eb03efb19',
    number: '6345',
    title: 'Field Course: Business Plans for Innovating in Health Care',
    units: ['General Management'],
    faculty: ['Ben Creo', 'Regina Herzlinger'],
    term: 'Fall 2026',
    credits: 1.5,
    assessment: 'Project',
    popular: false,
  },
  {
    id: 'a98bc8bd-59ae-40d6-bd5f-5f9b76116099',
    number: '6333',
    title: 'Field Course: Field X',
    units: ['Finance'],
    faculty: ['Randolph Cohen'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: '37529849-eba3-4a07-9c1a-75732d026061',
    number: '6334',
    title: 'Field Course: Field Y: Projects in Business Management',
    units: ['Finance', 'Entrepreneurial Management'],
    faculty: ['Randolph Cohen'],
    term: 'Spring 2027',
    credits: 3.0,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: 'e6189e3f-3484-422b-aded-83fca41a38c7',
    number: '1412',
    title: 'Field Course: Inside the Family Office: A FIELD Immersion',
    units: ['Finance', 'Entrepreneurial Management'],
    faculty: ['Lauren Cohen'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: '2461b9e5-4e78-4e15-957a-220651867fe8',
    number: '6605',
    title: 'Field Course: Investing for Impact',
    units: ['General Management', 'Entrepreneurial Management'],
    faculty: ['Gerald Chertavian', 'Archie L. Jones', 'Emily R. McComb', 'Brian Trelstad'],
    term: 'Fall 2026',
    credits: 1.5,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: '70db20e6-fd66-4d43-b77e-b9d5c6d25162',
    number: '6756',
    title: 'Field Course: Life Sciences Venture Creation',
    units: ['Entrepreneurial Management'],
    faculty: ['Satish Tadikonda'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: 'eaf694dc-9a09-499d-aa28-3d4c69f0c2b9',
    number: '6440',
    title: 'Field Course: Private Equity Projects and Ecosystems',
    units: ['Finance'],
    faculty: ['John Dionne'],
    term: 'Spring 2027',
    credits: 3.0,
    assessment: 'Project',
    popular: false,
  },
  {
    id: 'd77157c7-6e36-4594-b23a-a4dca810ae91',
    number: '6454',
    title: 'Field Course: Seminar in Investing',
    units: ['Finance'],
    faculty: ['Sara Fleiss'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Project',
    popular: false,
  },
  {
    id: '4d2a32ae-de8a-49a7-828f-6397c2a8cfee',
    number: '6673',
    title: 'Field Course: Startup Operations',
    units: ['Entrepreneurial Management'],
    faculty: ['Christina Wallace'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: 'e88f7aa9-1ed8-436a-9b72-4ef59eef84b9',
    number: '6453',
    title: 'Field Course: Value Creation in Small and Medium Firms',
    units: ['Finance'],
    faculty: ['Jason Pananos'],
    term: 'Spring 2027',
    credits: 3.0,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: '34e64e6d-360c-48a5-b6cd-b3bc9fe0a329',
    number: '1452',
    title: 'Financial Management of Smaller Firms',
    units: ['Finance', 'Entrepreneurial Management'],
    faculty: ['Royce Yudkoff', 'Richard Ruback'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Exam',
    popular: true,
  },
  {
    id: '3d4d85f4-714b-41f4-9840-c1391910492a',
    number: '1153',
    title: 'Global Capitalism: Past, Present, Future',
    units: ['Business, Government & the International Economy'],
    faculty: ['Sophus A. Reinert'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Exam with Paper option',
    popular: false,
  },
  {
    id: '50f42be2-d4b3-4ce2-a663-f7626b0e16fa',
    number: '1631',
    title: 'Global Entrepreneurship',
    units: ['Entrepreneurial Management', 'Finance'],
    faculty: ['Paul Gompers'],
    term: 'Spring 2027',
    credits: 3.0,
    assessment: null,
    popular: false,
  },
  {
    id: '8cba66cb-4f50-4190-964d-e96a2d0361a9',
    number: '1151',
    title: 'Globalization and Emerging Markets',
    units: ['Business, Government & the International Economy'],
    faculty: ['Reshmaan Hussam'],
    term: 'Spring 2027',
    credits: 3.0,
    assessment: 'Final Exam',
    popular: false,
  },
  {
    id: '0aadf2d0-7745-42b9-9404-a54cc09a31ce',
    number: '1265',
    title: 'Grand Challenges: How Great Leaders Build "Unicorns"',
    units: ['Organizational Behavior', 'Strategy'],
    faculty: ['Tarun Khanna', 'Linda Hill'],
    term: 'Fall 2026',
    credits: 1.5,
    assessment: 'Deliverables TBA',
    popular: false,
  },
  {
    id: 'a2eda43b-886c-4aea-b24b-001cc9f2c3b2',
    number: '6057',
    title: 'Immersive Field Course: Cape Town — Africa Rising',
    units: ['General Management', 'Finance'],
    faculty: ['John Macomber', 'Hakeem I. Belo-Osagie'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: null,
    popular: false,
  },
  {
    id: '14adf598-34a8-43e8-afe7-9d42cebdb011',
    number: '6089',
    title: 'Immersive Field Course: China — Geopolitics, Trade, Supply Chains in Time of Change',
    units: ['Business, Government & the International Economy', 'Technology & Operations Management'],
    faculty: ['Meg Rithmire', 'Willy Shih'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: null,
    popular: true,
  },
  {
    id: '7a65b59f-ad84-4090-a90b-84a3f00e3d28',
    number: '6066',
    title: 'Immersive Field Course: India — Development at Scale: Energy, Industry, and AI',
    units: ['General Management'],
    faculty: ['Vikram Gandhi'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: null,
    popular: false,
  },
  {
    id: 'd56fe353-0288-4cde-85e3-1f392ab3ce72',
    number: '6052',
    title: 'Immersive Field Course: Italy — Tradition and Innovation',
    units: ['Business, Government & the International Economy'],
    faculty: ['Sophus A. Reinert', 'Dante Roscini'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: null,
    popular: true,
  },
  {
    id: '14791e4d-8128-4955-a8b1-b42b8316498c',
    number: '6062',
    title: "Immersive Field Course: Japan — Exploring Japan's Innovation Ecosystem",
    units: ['Strategy', 'Marketing'],
    faculty: ['Tomomichi Amano', 'Ramon Casadesus-Masanell'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: null,
    popular: false,
  },
  {
    id: '4e72d08b-52d3-41f4-b6ad-3cdf459e519c',
    number: '6060',
    title: "Immersive Field Course: Saudi Arabia — A Nation and its Oil Economy Reimagined",
    units: ['Strategy', 'General Management'],
    faculty: ['Tarun Khanna', 'Andy Zelleke'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: null,
    popular: false,
  },
  {
    id: '3f064746-0033-43d5-ae69-df0010c2590c',
    number: '6094',
    title: 'Immersive Field Course: Silicon Valley — Disrupting Silicon Valley with AI',
    units: ['Entrepreneurial Management'],
    faculty: ['Mark Roberge'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: null,
    popular: false,
  },
  {
    id: '60c474fa-df5e-4cbd-b969-b978d21cd36f',
    number: '6093',
    title: 'Immersive Field Course: Singapore — Shaping a Global Innovation Hub',
    units: ['General Management'],
    faculty: ['Amy Schulman', 'TBC'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: null,
    popular: false,
  },
  {
    id: '1015fd99-f583-41a4-ab7e-e3123bef65a3',
    number: '1185',
    title: 'Innovating at Scale',
    units: ['Strategy'],
    faculty: ['Maria Roche'],
    term: 'Fall 2026',
    credits: 1.5,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: '4896291a-08a6-4e96-80eb-d4d0c9482866',
    number: '2185',
    title: 'Innovating in Health Care',
    units: ['General Management'],
    faculty: ['Ben Creo', 'Regina Herzlinger', 'Divya Srungaram'],
    term: 'Fall 2026',
    credits: 1.5,
    assessment: null,
    popular: false,
  },
  {
    id: '9a1da3c4-b304-43ee-86ca-5f5548537f25',
    number: '1955',
    title: 'Innovation and Renovation: Building and Renewing Consumer and Market Relevance',
    units: ['Marketing'],
    faculty: ['Tomomichi Amano'],
    term: 'Spring 2027',
    credits: 1.5,
    assessment: 'Exam',
    popular: false,
  },
  {
    id: 'd1698a48-b5f5-49cf-acd7-e25ec0996e0d',
    number: '1180',
    title: 'Institutions, Macroeconomics, and the Global Economy',
    units: ['Business, Government & the International Economy'],
    faculty: ['Vincent Pons'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Exam',
    popular: false,
  },
  {
    id: 'a9cbeea4-dca2-4346-8f9c-482f24b6c18b',
    number: '1446',
    title: 'Investment Management and Capital Markets',
    units: ['Finance'],
    faculty: ['Luis Viceira', 'Emil Siriwardane'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Exam',
    popular: false,
  },
  {
    id: '5201a574-3779-4b9f-85a3-be7511ce3e42',
    number: '1425',
    title: 'Investment Strategies',
    units: ['Finance'],
    faculty: ['Marco Sammon', 'William Vrattos'],
    term: 'Spring 2027',
    credits: 3.0,
    assessment: 'Exam',
    popular: false,
  },
  {
    id: '8d3d4ccf-0828-465f-8cdc-f8b3e07469d1',
    number: '5241',
    title: 'Launch Lab/Capstone 1',
    units: ['Entrepreneurial Management'],
    faculty: ['Alan MacCormack', 'Russell J Wilcox'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: null,
    popular: false,
  },
  {
    id: 'ea3604b0-b2ea-4c6a-b1ef-77c6558c8507',
    number: '5242',
    title: 'Launch Lab/Capstone 2',
    units: ['Entrepreneurial Management'],
    faculty: ['Alan MacCormack', 'Russell J Wilcox'],
    term: 'Spring 2027',
    credits: 3.0,
    assessment: null,
    popular: false,
  },
  {
    id: '0f273725-da50-4d3f-9b17-510c2baee136',
    number: '1757',
    title: 'Launching Tech Ventures in the Age of AI (LTV)',
    units: ['Entrepreneurial Management', 'Technology & Operations Management'],
    faculty: ['Allison Mnookin', 'Jeffrey Bussgang'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Paper',
    popular: true,
  },
  {
    id: 'cb453539-b093-4399-a4af-5a956addfb54',
    number: '1540',
    title: 'Law, Management and Entrepreneurship',
    units: ['General Management', 'Entrepreneurial Management'],
    faculty: ['John Batter'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Exam',
    popular: false,
  },
  {
    id: '1440b3ee-9bfe-4ce1-a19e-47d9ddea1428',
    number: '2031',
    title: 'Leadership Execution and Action Planning',
    units: ['Organizational Behavior'],
    faculty: ['David G. Fubini'],
    term: 'Spring 2027',
    credits: 3.0,
    assessment: 'Optional',
    popular: false,
  },
  {
    id: '23ba66a3-5898-4f80-a958-bf724e843883',
    number: '1895',
    title: 'Leading a Family Business',
    units: ['Strategy'],
    faculty: ['Josh Baron'],
    term: 'Spring 2027',
    credits: 1.5,
    assessment: null,
    popular: false,
  },
  {
    id: '891a2a94-5995-4f14-8bed-b2362275b226',
    number: '1556',
    title: "Making Difficult Decisions: The General Manager's Role",
    units: ['Technology & Operations Management', 'Strategy', 'General Management'],
    faculty: ['Tiona Zuzul', 'Amy Edmondson'],
    term: 'Spring 2027',
    credits: 3.0,
    assessment: 'Exam',
    popular: false,
  },
  {
    id: 'b69961c3-6c67-4f26-aa36-5eb7ef10f7de',
    number: '1509',
    title: 'Managing and Innovating in Financial Services',
    units: ['Finance'],
    faculty: ['David Scharfstein'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Exam',
    popular: false,
  },
  {
    id: 'ae780de8-2f28-4083-b27c-31d538aade4c',
    number: '2061',
    title: 'Managing Human Capital',
    units: ['Organizational Behavior'],
    faculty: ['Ting Zhang'],
    term: 'Fall 2026',
    credits: 1.5,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: 'c0489fed-0d74-4266-b8b2-f4fa3220374f',
    number: '2120',
    title: 'Managing Service Operations',
    units: ['Technology & Operations Management'],
    faculty: ['Robert Markey', 'Ryan Buell'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Paper/Project',
    popular: false,
  },
  {
    id: '2fd39bf3-2bdb-4304-9460-11bc7addf6fd',
    number: '2043',
    title: 'Mastering Consulting and Advisory Skills',
    units: ['Organizational Behavior'],
    faculty: ['David G. Fubini'],
    term: 'Fall 2026',
    credits: 1.5,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: '6993442c-ce58-464d-870d-5f904ffb94cf',
    number: '1231',
    title: 'Modern Corporate Strategy: Revitalizing the Corporation',
    units: ['Strategy'],
    faculty: ['Jorge Tamayo'],
    term: 'Fall 2026',
    credits: 1.5,
    assessment: 'Paper/Project',
    popular: false,
  },
  {
    id: '5228d56b-d955-45cf-8556-c53e964fa6d9',
    number: '1816',
    title: 'Motivating People to Get Things Done',
    units: ['Negotiation', 'Organizations & Markets'],
    faculty: ['Ashley Whillans'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Exam',
    popular: false,
  },
  {
    id: 'aa2e3eba-5128-4d01-8542-74947db1f91a',
    number: '1731',
    title: 'Navigating Your Worth: AI, Negotiations, and the Nature of Expertise',
    units: ['Entrepreneurial Management'],
    faculty: ['Zoe Cullen'],
    term: 'Spring 2027',
    credits: 3.0,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: '918e0798-1d9c-4446-8395-caec506cbc37',
    number: '2240',
    title: 'Negotiation',
    units: ['Negotiation', 'Organizations & Markets'],
    faculty: ['John Beshears', 'Katherine Coffman', 'Amit Goldenberg', 'Julian J. Zlatev', 'Kevin Mohan'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Exam',
    popular: true,
  },
  {
    id: '8accc7f5-88fa-41a6-8675-a739f659de13',
    number: '2218',
    title: 'Negotiation and Diplomacy',
    units: ['Negotiation', 'Organizations & Markets'],
    faculty: ['James Sebenius'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Exam with Paper option',
    popular: false,
  },
  {
    id: 'd5d828b1-40ec-4401-9e41-542fd506b19f',
    number: '1235',
    title: 'OWN: The Power of Company Ownership',
    units: ['Strategy'],
    faculty: ['Josh Baron'],
    term: 'Spring 2027',
    credits: 1.5,
    assessment: 'Exam or Paper',
    popular: false,
  },
  {
    id: 'dca5b0af-4ec7-442e-abf3-b5f001f35634',
    number: '1340',
    title: 'Ownership by Design',
    units: ['Accounting & Management', 'General Management'],
    faculty: ['Ethan Rouen', 'Nien-hê Hsieh'],
    term: 'Fall 2026',
    credits: 1.5,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: '1ec0cf69-0d1f-44bb-816e-accf97892385',
    number: '1440',
    title: 'Private Equity Finance',
    units: ['Finance'],
    faculty: ['Ted Berk', 'Victoria Ivashina'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Exam',
    popular: true,
  },
  {
    id: '3c9d4e30-471b-4c33-95fa-c14ab149095a',
    number: '1765',
    title: 'Product Management',
    units: ['Entrepreneurial Management'],
    faculty: ['Sara McKinley Torti'],
    term: 'Fall 2026',
    credits: 1.5,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: 'f59a3258-9baf-4498-bbf1-4e6251ba46a0',
    number: '1623',
    title: 'Public Entrepreneurship',
    units: ['Entrepreneurial Management'],
    faculty: ['Mitchell Weiss'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Exam',
    popular: false,
  },
  {
    id: 'b33ecb09-e4e0-4285-a448-d67f106be00c',
    number: '1475',
    title: 'Real Estate Investing',
    units: ['Finance'],
    faculty: ['Dwight Angelini', 'W. Matt Kelly'],
    term: 'Spring 2027',
    credits: 1.5,
    assessment: 'Exam',
    popular: false,
  },
  {
    id: 'ebedf80e-d9e7-4c95-a1eb-21abcd6fbb1b',
    number: '1484',
    title: 'Real Estate Private Equity',
    units: ['Finance', 'Entrepreneurial Management'],
    faculty: ['Nori Gerardo Lietz'],
    term: 'Spring 2027',
    credits: 3.0,
    assessment: 'Project',
    popular: false,
  },
  {
    id: 'fc3a4c6d-5ff3-4f1f-8f5e-73fa2b2527f3',
    number: '1684',
    title: 'Real Property',
    units: ['Finance'],
    faculty: ['Roberto Charvel', 'Charles Wu', 'Dan Dubrowski'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Exam',
    popular: false,
  },
  {
    id: '0c01a0e4-a902-465d-af96-7f1b5bbdd1f2',
    number: '1553',
    title: 'Reweaving Ourselves and the World: New Perspectives on Climate Change',
    units: ['General Management'],
    faculty: ['Rebecca Henderson'],
    term: 'Spring 2027',
    credits: 3.0,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: '72ffc0d0-1ffc-48cc-9630-4a8a713fa3ad',
    number: '1177',
    title: 'SPACE: Space, Public and Commercial Economics',
    units: ['Business, Government & the International Economy'],
    faculty: ['Matthew Weinzierl'],
    term: 'Spring 2027',
    credits: 3.0,
    assessment: null,
    popular: false,
  },
  {
    id: '131a07d6-8032-439f-95d0-c902aace5edc',
    number: '1788',
    title: 'Scaling Technology Ventures',
    units: ['Entrepreneurial Management'],
    faculty: ['Jeffrey Rayport'],
    term: 'Spring 2027',
    credits: 3.0,
    assessment: 'Exam or Project',
    popular: false,
  },
  {
    id: '89d47676-490b-44cc-b147-9915bd556f2d',
    number: '1581',
    title: 'Social Entrepreneurship and Systems Change',
    units: ['General Management'],
    faculty: ['Gerald Chertavian', 'Brian Trelstad'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: 'd5c23210-f95f-40af-83e9-39643ec6513f',
    number: '1286',
    title: 'Strategy and Technology',
    units: ['Strategy'],
    faculty: ['David Yoffie'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Paper',
    popular: true,
  },
  {
    id: '993b2798-01a2-4543-b438-f20b57828008',
    number: '1257',
    title: 'Strategy for Entrepreneurs',
    units: ['Entrepreneurial Management'],
    faculty: ['Rembrand Koning'],
    term: 'Spring 2027',
    credits: 3.0,
    assessment: 'Project',
    popular: false,
  },
  {
    id: 'e3044dbf-ea79-483e-9b0c-a7c90f288054',
    number: '1143',
    title: 'Strategy in Green Industries',
    units: ['Business, Government & the International Economy'],
    faculty: ['Gunnar Trumbull'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: 'ad4b72c2-fd61-4902-96e8-fb71f4209816',
    number: '2108',
    title: 'Supply Chain Management',
    units: ['Technology & Operations Management'],
    faculty: ['Kris Ferreira'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: '98279899-4987-40f6-9292-a614f2493fb4',
    number: '1495',
    title: 'Sustainable Investing',
    units: ['Finance'],
    faculty: ['Vikram Gandhi', 'Shawn Cole'],
    term: 'Fall 2026',
    credits: 1.5,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: 'eabe7b68-0d33-4bb6-af51-afd6a3c29698',
    number: '1315',
    title: 'The Anatomy of Fraud',
    units: ['Accounting & Management'],
    faculty: ['Jonas Heese', 'Aiyesha Dey'],
    term: 'Fall 2026',
    credits: 1.5,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: '4ab8a95a-4d59-4ff0-b699-ffcad8d636e9',
    number: '7515',
    title: 'The Arts of Communication',
    units: ['General Management'],
    faculty: ['Candace Bertotti'],
    term: 'Fall 2026',
    credits: 1.5,
    assessment: null,
    popular: false,
  },
  {
    id: '365fb511-1e50-44b1-9770-3d4ccfcc8f22',
    number: '1914',
    title: 'The Business of Entertainment, Media, and Sports',
    units: ['General Management', 'Marketing'],
    faculty: ['Anita Elberse'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Paper',
    popular: true,
  },
  {
    id: 'f777d9ea-fbf0-437a-bd4f-7a3cfcd361df',
    number: '1122',
    title: 'The Coming of Managerial Capitalism',
    units: ['Entrepreneurial Management'],
    faculty: ['Tom Nicholas'],
    term: 'Spring 2027',
    credits: 3.0,
    assessment: 'Exam',
    popular: false,
  },
  {
    id: '4b11ee4c-cc62-475d-bc70-0ed34b97c49c',
    number: '1676',
    title: 'The Founder Mindset',
    units: ['Entrepreneurial Management'],
    faculty: ['Reza Satchu'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: 'd92e6279-f298-4e73-ab21-fda3bd85f352',
    number: '1562',
    title: 'The Moral Leader',
    units: ['General Management'],
    faculty: ['Sandra Sucher'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: '13e6c05a-3c54-4943-9a0b-b8d536463435',
    number: '1563',
    title: 'The Spiritual Lives of Leaders',
    units: ['General Management'],
    faculty: ['Derek van Bever', 'Nien-hê Hsieh'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: '97c68398-8231-4949-b875-fda43774fe80',
    number: '1727',
    title: 'Tough Tech Ventures',
    units: ['Entrepreneurial Management'],
    faculty: ['Joshua Lev Krieger'],
    term: 'Spring 2027',
    credits: 3.0,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: '7e57f029-5a6a-4d79-9849-d54346734e54',
    number: '2195',
    title: 'Transforming Health Care Delivery',
    units: ['Technology & Operations Management', 'Accounting & Management'],
    faculty: ['Robert Huckman', 'Susanna Gallani'],
    term: 'Spring 2027',
    credits: 1.5,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: '501b8333-e2ff-43ac-8bb4-ab480fe7f7ea',
    number: '1428',
    title: 'Venture Capital and Private Equity',
    units: ['Entrepreneurial Management'],
    faculty: ['Jo Tango', 'Archie L. Jones'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Paper',
    popular: true,
  },
  {
    id: 'bbe21c16-93f9-43e6-8bcf-66e694fdf4be',
    number: '2292',
    title: 'War & Peace: The Lessons of History for Leadership, Strategy, Negotiation & Humanity',
    units: ['Negotiation', 'Organizations & Markets'],
    faculty: ['Deepak Malhotra', 'Kevin Mohan'],
    term: 'Fall 2026',
    credits: 3.0,
    assessment: 'Paper',
    popular: true,
  },

  // ── Spring 2027 additions (from Spring 2026 screenshots, treated as proxy) ──
  {
    id: 'a7d92511-3e8f-4a17-9c2d-1b8f3a6d9c47',
    number: '2267',
    title: 'Deals (Spring)',
    units: ['Negotiation', 'Organizations & Markets'],
    faculty: ['Guhan Subramanian'],
    term: 'Spring 2027',
    credits: 1.5,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: '88c4f3b2-9d6e-4f51-a18c-3e7d2b9a5c81',
    number: '1885',
    title: 'Leadership and Happiness',
    units: ['Organizational Behavior'],
    faculty: ['Arthur C. Brooks'],
    term: 'Spring 2027',
    credits: 1.5,
    assessment: 'Paper',
    popular: true,
  },
  {
    id: '2f8d9a01-7c4b-4e93-b256-8a1f3d7e9c64',
    number: '8223',
    title: 'Independent Project in Finance',
    units: ['Finance'],
    faculty: ['Jason Pananos'],
    term: 'Spring 2027',
    credits: 3.0,
    assessment: 'Project',
    popular: false,
  },
  {
    id: '5b6e2c47-8d91-4a32-9f17-2e6c4b8a3d59',
    number: '2010',
    title: 'Corporate Governance and Boards of Directors',
    units: ['Accounting & Management', 'Organizational Behavior'],
    faculty: ['Suraj Srinivasan'],
    term: 'Spring 2027',
    credits: 3.0,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: '9a2c8e13-4f6b-4d28-a91e-5c8d2a7f3e94',
    number: '1645',
    title: 'Launching Global Ventures',
    units: ['Entrepreneurial Management'],
    faculty: ['Leonard Iyoha'],
    term: 'Spring 2027',
    credits: 1.5,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: '3d7b9a62-8e1f-4c47-b395-7a2d9c4e8f51',
    number: '5223',
    title: 'Capstone Project',
    units: ['Entrepreneurial Management'],
    faculty: ['Edward A. Anderson'],
    term: 'Spring 2027',
    credits: 3.0,
    assessment: 'Project',
    popular: false,
  },
  {
    id: '7e1f4c89-2a6d-4b35-9f17-8c4e3d9a2b71',
    number: '1578',
    title: 'Doing Business with China 2025',
    units: ['Business, Government & the International Economy'],
    faculty: ['William C. Kirby'],
    term: 'Spring 2027',
    credits: 3.0,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: 'c8b2d7e5-3a4f-4e91-b687-9d2c1e8a4f63',
    number: '1601',
    title: 'Transforming Education through Social Entrepreneurship',
    units: ['Entrepreneurial Management', 'General Management'],
    faculty: ['V. Kasturi Rangan', 'Kim Smith'],
    term: 'Spring 2027',
    credits: 3.0,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: 'f3a91b46-7c8d-4e25-a193-6b4f2d8e1c97',
    number: '1418',
    title: 'Strategies for Value Creation — Abridged',
    units: ['Finance', 'Strategy'],
    faculty: ['Edward A. Mayfield'],
    term: 'Spring 2027',
    credits: 1.5,
    assessment: 'Exam',
    popular: false,
  },
  {
    id: '6e4c8d72-9a3f-4b18-c275-1d8e3a6f9c42',
    number: '8312',
    title: 'Independent Project in Entrepreneurial Management',
    units: ['Entrepreneurial Management'],
    faculty: ['Satish Tadikonda'],
    term: 'Spring 2027',
    credits: 3.0,
    assessment: 'Project',
    popular: false,
  },
  {
    id: 'b9f7e2a1-5c4d-4e76-9183-2a8d6f3e1c95',
    number: '1155',
    title: 'Business and Geopolitics',
    units: ['Business, Government & the International Economy'],
    faculty: ['Jeremy Friedman'],
    term: 'Spring 2027',
    credits: 1.5,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: 'd2a4c891-7e3f-4b92-a486-5c1d8a3f9e67',
    number: '6665',
    title: 'Field Course: Entrepreneurial Sales 103',
    units: ['Entrepreneurial Management'],
    faculty: ['Lou Shipley'],
    term: 'Spring 2027',
    credits: 3.0,
    assessment: 'Project',
    popular: false,
  },
  {
    id: 'e58a7d34-1c9f-4b27-a695-8d2e4a7f3c81',
    number: '1507',
    title: 'Building and Sustaining a Successful Enterprise Intensive',
    units: ['Technology & Operations Management', 'General Management'],
    faculty: ['Willy Shih'],
    term: 'Spring 2027',
    credits: 1.5,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: '4c8b2f96-7d3e-4a85-b194-6c2f9a8d3e71',
    number: '1608',
    title: 'AI Systems & Bayesian Strategy',
    units: ['Technology & Operations Management', 'Entrepreneurial Management'],
    faculty: ['Reza Satchu'],
    term: 'Spring 2027',
    credits: 1.5,
    assessment: 'Paper',
    popular: true,
  },
  {
    id: '7d3e9a18-4c5f-4b62-a791-8e2d3a6f9c47',
    number: '1607',
    title: 'Founder Launch',
    units: ['Entrepreneurial Management'],
    faculty: ['Reza Satchu'],
    term: 'Spring 2027',
    credits: 3.0,
    assessment: 'Project',
    popular: true,
  },
  {
    id: '2a8c4e75-9b3d-4f81-c697-1a4d8e2f3c95',
    number: '1921',
    title: 'AI-Driven Marketing for Entrepreneurs and Enterprises',
    units: ['Marketing', 'Entrepreneurial Management'],
    faculty: ['Sunil Gupta', 'Rajiv Lal'],
    term: 'Spring 2027',
    credits: 1.5,
    assessment: 'Paper',
    popular: false,
  },
  {
    id: '8c6f3e74-2a9d-4b15-c397-6e1f8a3d9c52',
    number: '6454',
    title: 'Field Course: Public Markets Investing Seminar',
    units: ['Finance'],
    faculty: ['Daniel Leventhal'],
    term: 'Spring 2027',
    credits: 3.0,
    assessment: 'Project',
    popular: false,
  },
]

// Canonical unit list for filtering
export const UNITS = [
  'Accounting & Management',
  'Business, Government & the International Economy',
  'Entrepreneurial Management',
  'Finance',
  'General Management',
  'Marketing',
  'Negotiation',
  'Organizations & Markets',
  'Organizational Behavior',
  'Strategy',
  'Technology & Operations Management',
]

// ── Section data ─────────────────────────────────────────────────────────────
// Each course maps to an array of available sections, since most popular HBS
// courses run multiple sections at different times.
// Section shape: { section, dayType, weekday, timeSlot, qTerm, faculty }
//   section:   '01' / '02' / null  (null = single-section course)
//   dayType:   'X' (Mon/Tue) | 'Y' (Thu/Fri) | 'W' (Wed-only)
//   weekday:   null = rotates Mon↔Tue or Thu↔Fri | 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI'
//   timeSlot:  'HH:MM-HH:MM' (24-hour)
//   qTerm:     'Q1' | 'Q2' | 'Q1Q2'
//   faculty:   short instructor name(s)
// Source: official HBS EC Fall 2026 timetable (updated 4.22.26)
export const COURSE_SECTIONS = {
  // ── Single-section X day courses ────────────────────────────────────────────
  '85e66038': [{ section: null, dayType: 'X', weekday: null, timeSlot: '08:30-09:50', qTerm: 'Q1Q2', faculty: 'Sebenius' }],          // Advanced Negotiation
  '45817284': [{ section: null, dayType: 'X', weekday: null, timeSlot: '08:30-09:50', qTerm: 'Q1Q2', faculty: 'Van Bever' }],         // Building & Sustaining Enterprise
  'def08ede': [{ section: null, dayType: 'X', weekday: null, timeSlot: '08:30-09:50', qTerm: 'Q1Q2', faculty: 'Pacelli' }],           // Business Analysis & Valuation
  '8f2c21c5': [{ section: null, dayType: 'X', weekday: null, timeSlot: '08:30-09:50', qTerm: 'Q1Q2', faculty: 'Wing' }],              // Demystifying Family Enterprise
  '6d66137a': [{ section: null, dayType: 'X', weekday: null, timeSlot: '08:30-09:50', qTerm: 'Q1Q2', faculty: 'Tadikonda' }],         // Entrep Innovation in Life Sciences
  'dca5b0af': [{ section: null, dayType: 'X', weekday: null, timeSlot: '13:30-14:50', qTerm: 'Q1',   faculty: 'Hsieh; Rouen' }],      // Q1: Ownership by Design
  '3d4d85f4': [{ section: null, dayType: 'X', weekday: null, timeSlot: '10:10-11:30', qTerm: 'Q1Q2', faculty: 'Reinert' }],           // Global Capitalism: Past Present Future
  '1015fd99': [{ section: null, dayType: 'X', weekday: null, timeSlot: '13:30-14:50', qTerm: 'Q1',   faculty: 'Roche' }],             // Q1: Innovating at Scale
  'f572e281': [{ section: null, dayType: 'X', weekday: null, timeSlot: '11:50-13:10', qTerm: 'Q1Q2', faculty: 'Ghosh' }],             // 3 Technologies Change World
  '4c22a2b9': [{ section: null, dayType: 'X', weekday: null, timeSlot: '11:50-13:10', qTerm: 'Q1Q2', faculty: 'Roth; Rigol' }],       // Business at Base of Pyramid
  'd50f9c8e': [{ section: null, dayType: 'X', weekday: null, timeSlot: '11:50-13:10', qTerm: 'Q1Q2', faculty: 'Koehn' }],             // Crucibles of Crisis Leadership
  'aa8ac56e': [{ section: null, dayType: 'X', weekday: null, timeSlot: '13:30-14:50', qTerm: 'Q2',   faculty: 'Howell' }],            // Q2: Entrepreneurial Finance
  '4b11ee4c': [{ section: null, dayType: 'X', weekday: null, timeSlot: '13:30-14:50', qTerm: 'Q1Q2', faculty: 'Satchu' }],            // Founder Mindset
  'cb453539': [{ section: null, dayType: 'X', weekday: null, timeSlot: '13:30-14:50', qTerm: 'Q1Q2', faculty: 'Batter' }],            // Law, Management & Entrepreneurship
  'b69961c3': [{ section: null, dayType: 'X', weekday: null, timeSlot: '13:30-14:50', qTerm: 'Q1Q2', faculty: 'Scharfstein' }],       // Managing & Innovating in Financial Services
  '8accc7f5': [{ section: null, dayType: 'X', weekday: null, timeSlot: '13:30-14:50', qTerm: 'Q1Q2', faculty: 'Sebenius; Burns' }],   // Negotiation and Diplomacy
  'f59a3258': [{ section: null, dayType: 'X', weekday: null, timeSlot: '13:30-14:50', qTerm: 'Q1Q2', faculty: 'Weiss' }],             // Public Entrepreneurship
  '772ec662': [{ section: null, dayType: 'X', weekday: null, timeSlot: '13:30-15:30', qTerm: 'Q2',   faculty: 'Subramanian' }],       // Q2: Deals
  // ── Single-section X weekly Tue ─────────────────────────────────────────────
  '975a5281': [{ section: null, dayType: 'X', weekday: 'TUE', timeSlot: '15:10-17:10', qTerm: 'Q1Q2', faculty: 'Van den Steen' }],    // Advanced Competitive Strategy
  'b62437c6': [{ section: null, dayType: 'X', weekday: 'TUE', timeSlot: '15:10-17:10', qTerm: 'Q1Q2', faculty: 'Spar' }],             // Capitalism and the State
  'a98bc8bd': [{ section: null, dayType: 'X', weekday: 'TUE', timeSlot: '15:10-17:10', qTerm: 'Q1Q2', faculty: 'R. Cohen' }],         // FC: Field X
  '4d2a32ae': [{ section: null, dayType: 'X', weekday: 'TUE', timeSlot: '15:10-17:10', qTerm: 'Q1Q2', faculty: 'Wallace' }],          // FC: Startup Operations
  'd92e6279': [{ section: null, dayType: 'X', weekday: 'TUE', timeSlot: '15:10-17:10', qTerm: 'Q1Q2', faculty: 'Sucher' }],           // The Moral Leader
  '0aadf2d0': [{ section: null, dayType: 'X', weekday: 'TUE', timeSlot: '15:10-17:10', qTerm: 'Q2',   faculty: 'Hill; Khanna' }],     // Q2: Grand Challenges — Unicorns
  // ── Single-section X weekly Mon (joint-degree) ──────────────────────────────
  '4c3a5082': [{ section: null, dayType: 'X', weekday: 'MON', timeSlot: '16:30-18:45', qTerm: 'Q1Q2', faculty: 'Zelleke' }],          // HKS-HBS Joint Seminar
  '142fde83': [ // Designing Tech Ventures (HBS-SEAS) — meets MON & WED 3:50–5:10pm
    { section: null, dayType: 'X', weekday: 'MON', timeSlot: '15:50-17:10', qTerm: 'Q1Q2', faculty: 'Clay; Howe' },
    { section: null, dayType: 'W', weekday: 'WED', timeSlot: '15:50-17:10', qTerm: 'Q1Q2', faculty: 'Clay; Howe' },
  ],

  // ── Multi-section X day courses ─────────────────────────────────────────────
  'a9cbeea4': [ // Investment Management
    { section: '01', dayType: 'X', weekday: null, timeSlot: '08:30-09:50', qTerm: 'Q1Q2', faculty: 'Viceira' },
    { section: '02', dayType: 'X', weekday: null, timeSlot: '10:10-11:30', qTerm: 'Q1Q2', faculty: 'Siriwardane' },
  ],
  'c0489fed': [ // Managing Service Operations
    { section: '01', dayType: 'X', weekday: null, timeSlot: '08:30-09:50', qTerm: 'Q1Q2', faculty: 'Markey' },
    { section: '02', dayType: 'X', weekday: null, timeSlot: '10:10-11:30', qTerm: 'Q1Q2', faculty: 'Buell' },
    { section: '03', dayType: 'X', weekday: null, timeSlot: '11:50-13:10', qTerm: 'Q1Q2', faculty: 'Buell' },
  ],
  '93d534d5': [ // Corporate Finance: CFO
    { section: '01', dayType: 'X', weekday: null, timeSlot: '10:10-11:30', qTerm: 'Q1Q2', faculty: 'Foley' },
    { section: '02', dayType: 'X', weekday: null, timeSlot: '11:50-13:10', qTerm: 'Q1Q2', faculty: 'Foley' },
  ],
  'ee22c766': [ // Crafting Your Life (also has Wed 4–6pm plenary)
    { section: '01', dayType: 'X', weekday: 'TUE', timeSlot: '10:10-11:30', qTerm: 'Q1Q2', faculty: 'Perlow' },
    { section: '02', dayType: 'X', weekday: 'TUE', timeSlot: '11:50-13:10', qTerm: 'Q1Q2', faculty: 'Perlow' },
  ],
  '0f273725': [ // Launching Tech Ventures (AI)
    { section: '01', dayType: 'X', weekday: null, timeSlot: '10:10-11:30', qTerm: 'Q1Q2', faculty: 'Bussgang' },
    { section: '02', dayType: 'X', weekday: null, timeSlot: '11:50-13:10', qTerm: 'Q1Q2', faculty: 'Mnookin' },
  ],
  '365fb511': [ // Business of Entertainment, Media, Sports
    { section: '01', dayType: 'X', weekday: null, timeSlot: '10:10-11:30', qTerm: 'Q1Q2', faculty: 'Elberse' },
    { section: '02', dayType: 'X', weekday: null, timeSlot: '11:50-13:10', qTerm: 'Q1Q2', faculty: 'Elberse' },
  ],
  '3c9d4e30': [ // Q2: Product Management
    { section: '01', dayType: 'X', weekday: null, timeSlot: '08:30-09:50', qTerm: 'Q2', faculty: 'Torti' },
    { section: '02', dayType: 'X', weekday: null, timeSlot: '10:10-11:30', qTerm: 'Q2', faculty: 'Torti' },
  ],

  // ── Single-section Y day courses ────────────────────────────────────────────
  'ad4b72c2': [{ section: null, dayType: 'Y', weekday: null, timeSlot: '10:10-11:30', qTerm: 'Q1Q2', faculty: 'Ferreira' }],          // Supply Chain Management
  'fc3a4c6d': [{ section: null, dayType: 'Y', weekday: null, timeSlot: '10:10-11:30', qTerm: 'Q1Q2', faculty: 'Charvel; Dubrowski; Wu' }], // Real Property
  'e3044dbf': [{ section: null, dayType: 'Y', weekday: null, timeSlot: '11:50-13:10', qTerm: 'Q1Q2', faculty: 'Trumbull' }],          // Strategy in Green Industries
  '5081cddf': [{ section: null, dayType: 'Y', weekday: null, timeSlot: '11:50-13:10', qTerm: 'Q1',   faculty: 'Cook' }],              // Q1: AI-Powered Digital Marketing
  '4896291a': [{ section: null, dayType: 'Y', weekday: null, timeSlot: '11:50-13:10', qTerm: 'Q1',   faculty: 'Creo; Herzlinger' }],  // Q1: Innovating in Healthcare
  '2fd39bf3': [{ section: null, dayType: 'Y', weekday: null, timeSlot: '11:50-13:10', qTerm: 'Q1',   faculty: 'Fubini' }],            // Q1: Mastering Consulting Skills
  '6993442c': [{ section: null, dayType: 'Y', weekday: null, timeSlot: '13:30-14:50', qTerm: 'Q1',   faculty: 'Tamayo' }],            // Q1: Modern Corporate Strategy
  '5228d56b': [{ section: null, dayType: 'Y', weekday: null, timeSlot: '13:30-14:50', qTerm: 'Q1Q2', faculty: 'Whillans' }],          // Motivating People
  '13e6c05a': [{ section: null, dayType: 'Y', weekday: null, timeSlot: '13:30-14:50', qTerm: 'Q1Q2', faculty: 'Hsieh; Van Bever' }],  // Spiritual Lives of Leaders
  'eabe7b68': [{ section: null, dayType: 'Y', weekday: null, timeSlot: '13:30-14:50', qTerm: 'Q1',   faculty: 'Dey; Heese' }],        // Q1: Anatomy of Fraud
  '4ab8a95a': [{ section: null, dayType: 'Y', weekday: null, timeSlot: '13:30-14:50', qTerm: 'Q1',   faculty: 'Bertotti' }],          // Q1: Arts of Communication
  '98279899': [{ section: null, dayType: 'Y', weekday: null, timeSlot: '13:30-14:50', qTerm: 'Q1',   faculty: 'Cole; Gandhi' }],      // Q1: Sustainable Investing
  'ae780de8': [{ section: null, dayType: 'Y', weekday: null, timeSlot: '11:50-13:10', qTerm: 'Q2',   faculty: 'Zhang' }],             // Q2: Managing Human Capital
  '65c49a3c': [{ section: null, dayType: 'Y', weekday: null, timeSlot: '11:50-13:10', qTerm: 'Q2',   faculty: 'Creo; Herzlinger' }],  // Q2: FC: Innovating in Healthcare
  '2461b9e5': [{ section: null, dayType: 'Y', weekday: null, timeSlot: '13:30-14:50', qTerm: 'Q2',   faculty: 'Chertavian; Jones; McComb; Trelstad' }], // Q2: FC: Investing for Impact
  '3f90dbf9': [{ section: null, dayType: 'Y', weekday: null, timeSlot: '10:10-11:30', qTerm: 'Q2',   faculty: 'Alcacer; Sadun' }],    // Q2: Driving Profitable Growth
  // ── Single-section Y weekly Thu (Immersive Field Courses) ───────────────────
  'a2eda43b': [{ section: null, dayType: 'Y', weekday: 'THU', timeSlot: '15:10-17:10', qTerm: 'Q1Q2', faculty: 'Belo-Osagie; Macomber' }],   // IFC: Cape Town
  '60c474fa': [{ section: null, dayType: 'Y', weekday: 'THU', timeSlot: '15:10-17:10', qTerm: 'Q1Q2', faculty: 'Schulman' }],          // IFC: Singapore
  '7a65b59f': [{ section: null, dayType: 'Y', weekday: 'THU', timeSlot: '15:10-17:10', qTerm: 'Q1Q2', faculty: 'Gandhi' }],            // IFC: India
  'd56fe353': [{ section: null, dayType: 'Y', weekday: 'THU', timeSlot: '15:10-17:10', qTerm: 'Q1Q2', faculty: 'Reinert; Roscini' }],  // IFC: Italy
  '14adf598': [{ section: null, dayType: 'Y', weekday: 'THU', timeSlot: '15:10-17:10', qTerm: 'Q1Q2', faculty: 'Rithmire; Shih' }],    // IFC: China
  '14791e4d': [{ section: null, dayType: 'Y', weekday: 'THU', timeSlot: '15:10-17:10', qTerm: 'Q1Q2', faculty: 'Amano; Casadesus-Masanell' }], // IFC: Japan
  '3f064746': [{ section: null, dayType: 'Y', weekday: 'THU', timeSlot: '15:10-17:10', qTerm: 'Q1Q2', faculty: 'Roberge' }],           // IFC: Silicon Valley
  '4e72d08b': [{ section: null, dayType: 'Y', weekday: 'THU', timeSlot: '15:10-17:10', qTerm: 'Q1Q2', faculty: 'Khanna; Zelleke' }],   // IFC: Saudi Arabia

  // ── Multi-section Y day courses ─────────────────────────────────────────────
  'c403f8f6': [ // Entrepreneurship & Global Capitalism
    { section: '01', dayType: 'Y', weekday: null, timeSlot: '08:30-09:50', qTerm: 'Q1Q2', faculty: 'G. Jones' },
    { section: '02', dayType: 'Y', weekday: null, timeSlot: '10:10-11:30', qTerm: 'Q1Q2', faculty: 'G. Jones' },
  ],
  '34e64e6d': [ // Financial Management of Smaller Firms
    { section: '01', dayType: 'Y', weekday: null, timeSlot: '08:30-09:50', qTerm: 'Q1Q2', faculty: 'Ruback; Yudkoff' },
    { section: '02', dayType: 'Y', weekday: null, timeSlot: '10:10-11:30', qTerm: 'Q1Q2', faculty: 'Ruback; Yudkoff' },
  ],
  'd1698a48': [ // Institutions, Macro & Global Economy
    { section: '01', dayType: 'Y', weekday: null, timeSlot: '08:30-09:50', qTerm: 'Q1Q2', faculty: 'Pons' },
    { section: '02', dayType: 'Y', weekday: null, timeSlot: '10:10-11:30', qTerm: 'Q1Q2', faculty: 'Pons' },
  ],
  '89d47676': [ // Social Entrepreneurship & Systems Change
    { section: '01', dayType: 'Y', weekday: null, timeSlot: '08:30-09:50', qTerm: 'Q1Q2', faculty: 'Trelstad' },
    { section: '02', dayType: 'Y', weekday: null, timeSlot: '10:10-11:30', qTerm: 'Q1Q2', faculty: 'Chertavian' },
  ],
  'd5c23210': [ // Strategy and Technology
    { section: '01', dayType: 'Y', weekday: null, timeSlot: '10:10-11:30', qTerm: 'Q1Q2', faculty: 'Yoffie' },
    { section: '02', dayType: 'Y', weekday: null, timeSlot: '11:50-13:10', qTerm: 'Q1Q2', faculty: 'Yoffie' },
  ],
  '501b8333': [ // Venture Capital and Private Equity
    { section: '01', dayType: 'Y', weekday: null, timeSlot: '10:10-11:30', qTerm: 'Q1Q2', faculty: 'Tango' },
    { section: '02', dayType: 'Y', weekday: null, timeSlot: '11:50-13:10', qTerm: 'Q1Q2', faculty: 'A. Jones' },
  ],
  '1ec0cf69': [ // Private Equity Finance
    { section: '01', dayType: 'Y', weekday: null, timeSlot: '10:10-11:30', qTerm: 'Q1Q2', faculty: 'Berk; Ivashina' },
    { section: '02', dayType: 'Y', weekday: null, timeSlot: '11:50-13:10', qTerm: 'Q1Q2', faculty: 'Berk; Ivashina' },
  ],
  '918e0798': [ // Negotiation — 6 sections per the timetable
    { section: '01', dayType: 'X', weekday: null, timeSlot: '10:10-11:30', qTerm: 'Q1Q2', faculty: 'Mohan' },
    { section: '02', dayType: 'X', weekday: null, timeSlot: '11:50-13:10', qTerm: 'Q1Q2', faculty: 'Zlatev' },
    { section: '03', dayType: 'X', weekday: null, timeSlot: '13:30-14:50', qTerm: 'Q1Q2', faculty: 'Beshears' },
    { section: '04', dayType: 'Y', weekday: null, timeSlot: '10:10-11:30', qTerm: 'Q1Q2', faculty: 'Goldenberg' },
    { section: '05', dayType: 'Y', weekday: null, timeSlot: '11:50-13:10', qTerm: 'Q1Q2', faculty: 'Goldenberg' },
    { section: '06', dayType: 'Y', weekday: null, timeSlot: '13:30-14:50', qTerm: 'Q1Q2', faculty: 'Coffman' },
  ],
  '5da00f30': [ // Q2: Entrepreneurial Sales 101
    { section: '01', dayType: 'Y', weekday: null, timeSlot: '11:50-13:10', qTerm: 'Q2', faculty: 'Roberge; Shipley' },
    { section: '02', dayType: 'Y', weekday: null, timeSlot: '13:30-14:50', qTerm: 'Q2', faculty: 'Roberge; Shipley' },
  ],

  // ── Wednesday-specific courses ───────────────────────────────────────────────
  '70db20e6': [{ section: null, dayType: 'W', weekday: 'WED', timeSlot: '15:10-17:10', qTerm: 'Q1Q2', faculty: 'Tadikonda' }],         // FC: Life Sciences Venture Creation
  'e6189e3f': [{ section: null, dayType: 'W', weekday: 'WED', timeSlot: '15:10-17:10', qTerm: 'Q1Q2', faculty: 'L. Cohen' }],          // FC: Inside the Family Office
  'd77157c7': [{ section: null, dayType: 'W', weekday: 'WED', timeSlot: '15:10-17:10', qTerm: 'Q1Q2', faculty: 'Fleiss' }],            // FC: Seminar in Investing
  'bbe21c16': [ // War & Peace: Lessons of History
    { section: '01', dayType: 'W', weekday: 'WED', timeSlot: '15:10-17:10', qTerm: 'Q1Q2', faculty: 'Malhotra' },
    { section: '02', dayType: 'W', weekday: 'WED', timeSlot: '15:10-17:10', qTerm: 'Q1Q2', faculty: 'Mohan' },
  ],

  // ── Spring 2027 courses ─────────────────────────────────────────────────────
  // Time slots inferred from Spring 2026 catalog screenshots (used as proxy for
  // Spring 2027). Day-type (X/Y/W) is best-guess: most slots default to X day
  // (rotating Mon/Tue); 3:10-5:10 seminars default to W day (Wed). Refine when
  // the official Spring 2027 timetable is published. qTerm: S1, S2, S1S2.

  // Spring X-day 8:30-9:50
  '82681870': [{ section: null, dayType: 'X', weekday: null, timeSlot: '08:30-09:50', qTerm: 'S1S2', faculty: 'Kaufman; Pforzheimer' }],  // 1564 Restaurant Industry
  'ebedf80e': [{ section: null, dayType: 'X', weekday: null, timeSlot: '08:30-09:50', qTerm: 'S1S2', faculty: 'Lietz' }],                 // 1484 Real Estate PE
  '993b2798': [{ section: null, dayType: 'X', weekday: null, timeSlot: '08:30-09:50', qTerm: 'S1S2', faculty: 'Koning' }],                // 1257 Strategy for Entrepreneurs
  'b9f7e2a1': [{ section: null, dayType: 'X', weekday: null, timeSlot: '08:30-09:50', qTerm: 'S1',   faculty: 'Friedman' }],              // 1155 Business and Geopolitics

  // Spring X-day 10:10-11:30
  'b33ecb09': [{ section: null, dayType: 'X', weekday: null, timeSlot: '10:10-11:30', qTerm: 'S1',   faculty: 'Angelini' }],              // 1475 Real Estate Investing
  '27577ad6': [{ section: null, dayType: 'X', weekday: null, timeSlot: '10:10-11:30', qTerm: 'S1',   faculty: 'Kluender' }],              // 1625 Entrep Finance (Spring)
  '2a8c4e75': [{ section: null, dayType: 'X', weekday: null, timeSlot: '10:10-11:30', qTerm: 'S1',   faculty: 'Lal' }],                   // 1921 AI-Driven Marketing

  // Spring X-day 11:50-1:10
  'c3a7d1df': [{ section: null, dayType: 'X', weekday: null, timeSlot: '11:50-13:10', qTerm: 'S1S2', faculty: 'Herzlinger; Creo' }],      // 6340 FC: Adv BP Healthcare
  '8cba66cb': [{ section: null, dayType: 'X', weekday: null, timeSlot: '11:50-13:10', qTerm: 'S1S2', faculty: 'Hussam' }],                // 1151 Globalization & Emerging Markets
  '50f42be2': [{ section: null, dayType: 'X', weekday: null, timeSlot: '11:50-13:10', qTerm: 'S1S2', faculty: 'Gompers' }],               // 1631 Global Entrepreneurship
  '5b6e2c47': [{ section: null, dayType: 'X', weekday: null, timeSlot: '11:50-13:10', qTerm: 'S1S2', faculty: 'Srinivasan' }],            // 2010 Corporate Governance
  '9a2c8e13': [{ section: null, dayType: 'X', weekday: null, timeSlot: '11:50-13:10', qTerm: 'S2',   faculty: 'Iyoha' }],                 // 1645 Launching Global Ventures
  '5a461398': [{ section: null, dayType: 'X', weekday: null, timeSlot: '11:50-13:10', qTerm: 'S1',   faculty: 'Shipley' }],               // 1985 B2B Sales and Distribution

  // Spring X-day 1:30-2:50
  'a01180d1': [{ section: null, dayType: 'X', weekday: null, timeSlot: '13:30-14:50', qTerm: 'S1',   faculty: 'De Freitas' }],            // 1925 Creating Brand Value
  'd5d828b1': [{ section: null, dayType: 'X', weekday: null, timeSlot: '13:30-14:50', qTerm: 'S1',   faculty: 'Baron' }],                 // 1235 OWN
  '72ffc0d0': [{ section: null, dayType: 'X', weekday: null, timeSlot: '13:30-14:50', qTerm: 'S1',   faculty: 'Weinzierl' }],             // 1177 SPACE
  '7e57f029': [{ section: null, dayType: 'X', weekday: null, timeSlot: '13:30-14:50', qTerm: 'S1',   faculty: 'Huckman; Gallani' }],      // 2195 Transforming Health Care
  '5e7d49b5': [{ section: null, dayType: 'X', weekday: null, timeSlot: '13:30-14:50', qTerm: 'S2',   faculty: 'Tingley' }],               // 1105 Energy
  '15a51b39': [{ section: null, dayType: 'X', weekday: null, timeSlot: '13:30-14:50', qTerm: 'S2',   faculty: 'Shipley' }],               // 1695 Entrep Sales 102
  '9a1da3c4': [{ section: null, dayType: 'X', weekday: null, timeSlot: '13:30-14:50', qTerm: 'S1S2', faculty: 'Amano' }],                 // 1955 Innovation and Renovation

  // Spring extended slot 1:30-3:30 (Deals-style)
  'a7d92511': [{ section: null, dayType: 'X', weekday: null, timeSlot: '13:30-15:30', qTerm: 'S1S2', faculty: 'Subramanian' }],           // 2267 Deals (Spring)

  // Spring multi-section X-day
  'df94eb75': [ // 2090 Authentic Leader Development
    { section: '01', dayType: 'X', weekday: null, timeSlot: '10:10-11:30', qTerm: 'S1S2', faculty: 'Ely' },
    { section: '02', dayType: 'X', weekday: null, timeSlot: '13:30-14:50', qTerm: 'S1S2', faculty: 'Burns' },
  ],
  '9f6772cb': [ // 1420 Creating Value Through Corporate Restructuring
    { section: '01', dayType: 'X', weekday: null, timeSlot: '10:10-11:30', qTerm: 'S1S2', faculty: 'Gilson' },
    { section: '02', dayType: 'X', weekday: null, timeSlot: '11:50-13:10', qTerm: 'S1S2', faculty: 'Gilson' },
  ],
  '1440b3ee': [ // 2031 Leadership Execution and Action Planning
    { section: '01', dayType: 'X', weekday: null, timeSlot: '10:10-11:30', qTerm: 'S1S2', faculty: 'Raffaelli' },
    { section: '02', dayType: 'X', weekday: null, timeSlot: '11:50-13:10', qTerm: 'S1S2', faculty: 'Raffaelli' },
  ],
  '891a2a94': [ // 1556 Making Difficult Decisions
    { section: '01', dayType: 'X', weekday: null, timeSlot: '10:10-11:30', qTerm: 'S1S2', faculty: 'Edmondson' },
    { section: '02', dayType: 'X', weekday: null, timeSlot: '11:50-13:10', qTerm: 'S1S2', faculty: 'Zuzul' },
  ],
  '131a07d6': [ // 1788 Scaling Technology Ventures
    { section: '01', dayType: 'X', weekday: null, timeSlot: '10:10-11:30', qTerm: 'S1S2', faculty: 'Rayport' },
    { section: '02', dayType: 'X', weekday: null, timeSlot: '11:50-13:10', qTerm: 'S1S2', faculty: 'Rayport' },
  ],
  'f777d9ea': [ // 1122 The Coming of Managerial Capitalism
    { section: '01', dayType: 'X', weekday: null, timeSlot: '08:30-09:50', qTerm: 'S1S2', faculty: 'Nicholas' },
    { section: '02', dayType: 'X', weekday: null, timeSlot: '10:10-11:30', qTerm: 'S1S2', faculty: 'Nicholas' },
  ],
  '97c68398': [ // 1727 Tough Tech Ventures
    { section: '01', dayType: 'X', weekday: null, timeSlot: '10:10-11:30', qTerm: 'S1S2', faculty: 'Krieger' },
    { section: '02', dayType: 'X', weekday: null, timeSlot: '11:50-13:10', qTerm: 'S1S2', faculty: 'Krieger' },
  ],
  '88c4f3b2': [ // 1885 Leadership and Happiness
    { section: '01', dayType: 'X', weekday: null, timeSlot: '08:30-09:50', qTerm: 'S1', faculty: 'Brooks' },
    { section: '02', dayType: 'X', weekday: null, timeSlot: '10:10-11:30', qTerm: 'S1', faculty: 'Brooks' },
  ],
  '5201a574': [ // 1425 Investment Strategies
    { section: '01', dayType: 'X', weekday: null, timeSlot: '13:30-14:50', qTerm: 'S2', faculty: 'Vrattos' },
    { section: '02', dayType: 'X', weekday: null, timeSlot: '11:50-13:10', qTerm: 'S2', faculty: 'Vrattos' },
  ],
  'f3a91b46': [ // 1418 Strategies for Value Creation — Abridged
    { section: '01', dayType: 'X', weekday: null, timeSlot: '11:50-13:10', qTerm: 'S1', faculty: 'Mayfield' },
    { section: '02', dayType: 'X', weekday: null, timeSlot: '10:10-11:30', qTerm: 'S1', faculty: 'Mayfield' },
  ],
  'e58a7d34': [ // 1507 Building and Sustaining a Successful Enterprise Intensive
    { section: '01', dayType: 'X', weekday: null, timeSlot: '11:50-13:10', qTerm: 'S1', faculty: 'Shih' },
    { section: '02', dayType: 'X', weekday: null, timeSlot: '11:50-13:10', qTerm: 'S2', faculty: 'Shih' },
  ],

  // Spring Wednesday seminars (3:10-5:10)
  'dfe57052': [{ section: null, dayType: 'W', weekday: 'WED', timeSlot: '15:10-17:10', qTerm: 'S1S2', faculty: 'Moss' }],                  // 1160 Modern Financial System
  '3b6d720e': [{ section: null, dayType: 'W', weekday: 'WED', timeSlot: '15:10-17:10', qTerm: 'S1S2', faculty: 'Deshpande; McGee' }],      // 6913 FC: Business of the Arts
  '37529849': [{ section: null, dayType: 'W', weekday: 'WED', timeSlot: '15:10-17:10', qTerm: 'S1S2', faculty: 'R. Cohen' }],              // 6334 FC: Field Y
  'eaf694dc': [{ section: null, dayType: 'W', weekday: 'WED', timeSlot: '15:10-17:10', qTerm: 'S1S2', faculty: 'Dionne' }],                // 6440 FC: PE Projects
  'e88f7aa9': [{ section: null, dayType: 'W', weekday: 'WED', timeSlot: '15:10-17:10', qTerm: 'S1S2', faculty: 'Pananos' }],               // 6453 FC: Value Creation SM Firms
  'd2a4c891': [{ section: null, dayType: 'W', weekday: 'WED', timeSlot: '15:10-17:10', qTerm: 'S1S2', faculty: 'Shipley' }],               // 6665 FC: Entrep Sales 103
  '8c6f3e74': [{ section: null, dayType: 'W', weekday: 'WED', timeSlot: '15:10-17:10', qTerm: 'S1S2', faculty: 'Leventhal' }],             // 6454 FC: Public Markets Investing

  // Spring late-day specials
  'ea3604b0': [{ section: null, dayType: 'W', weekday: 'WED', timeSlot: '16:00-18:00', qTerm: 'S1S2', faculty: 'Wilcox; MacCormack' }],    // 5242 Launch Lab/Capstone 2
  'aa2e3eba': [{ section: null, dayType: 'W', weekday: 'WED', timeSlot: '14:10-17:10', qTerm: 'S1S2', faculty: 'Cullen' }],                // 1731 Navigating Your Worth
  '7d3e9a18': [{ section: null, dayType: 'W', weekday: 'WED', timeSlot: '14:10-17:10', qTerm: 'S1S2', faculty: 'Satchu' }],                // 1607 Founder Launch
  '4c8b2f96': [{ section: null, dayType: 'W', weekday: 'WED', timeSlot: '15:10-16:30', qTerm: 'S1S2', faculty: 'Satchu' }],                // 1608 AI Systems & Bayesian Strategy
}

// ── Section helpers ──────────────────────────────────────────────────────────
// Courses are looked up by 8-char prefix of their UUID.

// All sections offered for a course.
export function getCourseSections(courseId) {
  return COURSE_SECTIONS[courseId?.slice(0, 8)] ?? []
}

// Specific section by id, or first if id is null/missing.
export function getCourseSection(courseId, sectionId) {
  const sections = getCourseSections(courseId)
  if (sections.length === 0) return null
  if (sectionId == null) return sections[0]
  return sections.find(s => s.section === sectionId) ?? sections[0]
}

// Single-section convenience: returns the chosen section (from build) or first.
// `buildSections` is an object like { [courseId]: sectionId }.
export function getActiveSection(courseId, buildSections) {
  return getCourseSection(courseId, buildSections?.[courseId])
}

// Backwards-compatible: returns the first section's schedule shape.
export function getCourseSchedule(courseId) {
  const sections = getCourseSections(courseId)
  return sections[0] ?? null
}

// Whether this course has more than one section to choose from.
export function hasMultipleSections(courseId) {
  return getCourseSections(courseId).length > 1
}

// Friendly schedule label for a section (or schedule-shaped object).
const _DAY_LABEL_FULL    = { X: 'X day', Y: 'Y day', W: 'Wednesday' }
const _DAY_LABEL_COMPACT = { X: 'X', Y: 'Y', W: 'W' }
const _DAY_SUFFIX        = { X: '(Mon/Tue)', Y: '(Thu/Fri)', W: '' }

export function scheduleLabel(sched, compact = false) {
  if (!sched) return ''
  const day  = compact ? _DAY_LABEL_COMPACT[sched.dayType] : _DAY_LABEL_FULL[sched.dayType]
  const suff = sched.weekday ? `(${sched.weekday[0] + sched.weekday.slice(1).toLowerCase()})` : (compact ? '' : _DAY_SUFFIX[sched.dayType])
  const time = sched.timeSlot
  return [day, suff, '·', time].filter(Boolean).join(' ')
}

// Derive a sorted, unique faculty list from courses
export function getFacultyList() {
  const map = new Map()
  for (const course of COURSES) {
    for (const name of course.faculty) {
      if (!map.has(name)) {
        map.set(name, { name, courses: [] })
      }
      map.get(name).courses.push(course)
    }
  }
  return Array.from(map.values()).sort((a, b) => {
    const aLast = a.name.split(' ').pop()
    const bLast = b.name.split(' ').pop()
    return aLast.localeCompare(bLast)
  })
}
