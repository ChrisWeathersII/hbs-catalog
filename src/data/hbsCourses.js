// HBS Elective Course Catalog (AY 2026-2027)
// Fall 2026: hand-entered from the EC timetable PDF (6.25.26). Courses offered in
//   both terms have a separate Spring entry (own id) in the generated module.
// Spring 2027: generated from the HBS catalog API by scripts/fetch-term.mjs
//   (src/data/terms/spring2027.js). Re-run the script to refresh it.
import { TERM_COURSES as SPRING_2027_COURSES, TERM_SECTIONS as SPRING_2027_SECTIONS, TERM_SRCDB as SPRING_2027_SRCDB } from './terms/spring2027.js'

// HBS catalog API term codes, so course descriptions come from the right term
export const TERM_SRCDB = { 'Fall 2026': '792148', 'Spring 2027': SPRING_2027_SRCDB }

const FALL_2026_COURSES = [
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
    id: '5a461398-905b-4dd2-93fc-61b209303897',
    number: '1985',
    title: 'B2B Sales and Distribution',
    units: ['Marketing', 'Entrepreneurial Management'],
    faculty: ['Ed Boyajian', 'Lou Shipley'],
    term: 'Fall 2026',
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
    title: 'Creating Brand Value', // listed as "Creating Brand Value AI" on 6.25.26 timetable — confirm exact title
    units: ['Marketing'],
    faculty: ['Julian de Freitas'],
    term: 'Fall 2026',
    credits: 1.5,
    assessment: 'Paper',
    popular: false,
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
    faculty: ['Nien-hê Hsieh', 'Amy Schulman'],
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

  // ── Fall 2026 additions (new on the 6.25.26 timetable update) ──
  {
    id: '3e8f5a72-91c4-4b6d-a527-8f1e4c9b2d63',
    number: '1613',
    title: 'Building an AI Venture',
    units: ['Entrepreneurial Management'],
    faculty: ['Shikhar Ghosh'],
    term: 'Fall 2026',
    credits: 1.5,
    assessment: null,
    popular: false,
  },
  {
    id: '9c2d7f41-5e8a-4b93-a614-2c7f9e3d8b52',
    number: '1705',
    title: 'Elections and Democracy',
    units: ['Business, Government & the International Economy'],
    faculty: ['White'], // first name not printed on the timetable — confirm
    term: 'Fall 2026',
    credits: 1.5,
    assessment: null,
    popular: false,
  },
  {
    id: '6b9e3d54-2f7c-4a81-b936-4e1d8c5a7f29',
    number: '1791',
    title: 'Systems Scaling Ventures', // abbreviated "Systems Scaling Vent." on timetable — confirm full title
    units: ['Accounting & Management', 'Entrepreneurial Management'],
    faculty: ['Tatiana Sandino'],
    term: 'Fall 2026',
    credits: 1.5,
    assessment: null,
    popular: false,
  },
]

export const COURSES = [...FALL_2026_COURSES, ...SPRING_2027_COURSES]

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
//   weekday:   null = standard X-day or Y-day pattern (meets both days of the
//              dayType — Mon AND Tue, or Thu AND Fri — at the same time each week)
//              | 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' for fixed-day seminars
//              (typically 120-min late seminars, IFCs, joint-degree courses)
//   timeSlot:  'HH:MM-HH:MM' (24-hour)
//   qTerm:     'Q1' | 'Q2' | 'Q1Q2'
//   faculty:   short instructor name(s)
// Source: official HBS EC Fall 2026 timetable (updated 6.25.26)
const FALL_2026_SECTIONS = {
  // ── Single-section X day courses ────────────────────────────────────────────
  '85e66038': [{ section: null, dayType: 'X', weekday: null, timeSlot: '08:30-09:50', qTerm: 'Q1Q2', faculty: 'Sebenius' }],          // Advanced Negotiation
  '45817284': [{ section: null, dayType: 'X', weekday: null, timeSlot: '08:30-09:50', qTerm: 'Q1Q2', faculty: 'Van Bever' }],         // Building & Sustaining Enterprise
  'def08ede': [{ section: null, dayType: 'X', weekday: null, timeSlot: '08:30-09:50', qTerm: 'Q1Q2', faculty: 'Pacelli' }],           // Business Analysis & Valuation
  '6d66137a': [{ section: null, dayType: 'X', weekday: null, timeSlot: '08:30-09:50', qTerm: 'Q1Q2', faculty: 'Tadikonda' }],         // Entrep Innovation in Life Sciences
  'dca5b0af': [{ section: null, dayType: 'X', weekday: null, timeSlot: '13:30-14:50', qTerm: 'Q1',   faculty: 'Hsieh; Rouen' }],      // Q1: Ownership by Design
  '3d4d85f4': [{ section: null, dayType: 'X', weekday: null, timeSlot: '10:10-11:30', qTerm: 'Q1Q2', faculty: 'Reinert' }],           // Global Capitalism: Past Present Future
  '1015fd99': [{ section: null, dayType: 'X', weekday: null, timeSlot: '13:30-14:50', qTerm: 'Q1',   faculty: 'Roche' }],             // Q1: Innovating at Scale
  'f572e281': [{ section: null, dayType: 'X', weekday: null, timeSlot: '11:50-13:10', qTerm: 'Q1Q2', faculty: 'Ghosh' }],             // 3 Technologies Change World
  '4c22a2b9': [{ section: null, dayType: 'X', weekday: null, timeSlot: '11:50-13:10', qTerm: 'Q1Q2', faculty: 'Roth; Rigol' }],       // Business at Base of Pyramid
  'd50f9c8e': [{ section: null, dayType: 'X', weekday: null, timeSlot: '11:50-13:10', qTerm: 'Q1Q2', faculty: 'Koehn' }],             // Crucibles of Crisis Leadership
  'aa8ac56e': [{ section: null, dayType: 'X', weekday: null, timeSlot: '13:30-14:50', qTerm: 'Q2',   faculty: 'Howell' }],            // Q2: Entrepreneurial Finance
  '4b11ee4c': [ // Founder Mindset — two sections in 6.25.26 update
    { section: '01', dayType: 'X', weekday: null, timeSlot: '11:50-13:10', qTerm: 'Q1Q2', faculty: 'Satchu' },
    { section: '02', dayType: 'X', weekday: null, timeSlot: '13:30-14:50', qTerm: 'Q1Q2', faculty: 'Satchu' },
  ],
  'cb453539': [{ section: null, dayType: 'X', weekday: null, timeSlot: '13:30-14:50', qTerm: 'Q1Q2', faculty: 'Batter' }],            // Law, Management & Entrepreneurship
  'b69961c3': [{ section: null, dayType: 'X', weekday: null, timeSlot: '13:30-14:50', qTerm: 'Q1Q2', faculty: 'Scharfstein' }],       // Managing & Innovating in Financial Services
  '8accc7f5': [ // Negotiation and Diplomacy — meets MON & WED 1:30-2:45pm at HKS (per 6.25.26 grid)
    { section: null, dayType: 'X', weekday: 'MON', timeSlot: '13:30-14:45', qTerm: 'Q1Q2', faculty: 'Sebenius; Burns' },
    { section: null, dayType: 'W', weekday: 'WED', timeSlot: '13:30-14:45', qTerm: 'Q1Q2', faculty: 'Sebenius; Burns' },
  ],
  'f59a3258': [{ section: null, dayType: 'X', weekday: null, timeSlot: '13:30-14:50', qTerm: 'Q1Q2', faculty: 'Weiss' }],             // Public Entrepreneurship
  '772ec662': [{ section: null, dayType: 'X', weekday: null, timeSlot: '13:30-15:30', qTerm: 'Q2',   faculty: 'Subramanian' }],       // Q2: Deals
  '4896291a': [{ section: null, dayType: 'X', weekday: null, timeSlot: '11:50-13:10', qTerm: 'Q1',   faculty: 'Creo; Herzlinger' }],  // Q1: Innovating in Healthcare (moved from Y day in 6.25.26 update)
  '65c49a3c': [{ section: null, dayType: 'X', weekday: null, timeSlot: '11:50-13:10', qTerm: 'Q2',   faculty: 'Creo; Herzlinger' }],  // Q2: FC: Innovating in Healthcare (11:50 per catalog API, 10.21.26)
  '4ab8a95a': [{ section: null, dayType: 'X', weekday: null, timeSlot: '13:30-14:50', qTerm: 'Q2',   faculty: 'Bertotti' }],          // Q2: Arts of Communication (was Y/Q1; X day Q2 per 6.25.26 update)
  '5a461398': [{ section: null, dayType: 'X', weekday: null, timeSlot: '13:30-14:50', qTerm: 'Q2',   faculty: 'Shipley; Boyajian' }], // Q2: B2B Sales and Distribution (Fall per 6.25.26 update)
  // ── Single-section X weekly Tue ─────────────────────────────────────────────
  '975a5281': [{ section: null, dayType: 'X', weekday: 'TUE', timeSlot: '15:10-17:10', qTerm: 'Q1Q2', faculty: 'Van den Steen' }],    // Advanced Competitive Strategy
  'b62437c6': [{ section: null, dayType: 'X', weekday: 'TUE', timeSlot: '15:10-17:10', qTerm: 'Q1Q2', faculty: 'Spar' }],             // Capitalism and the State
  'a98bc8bd': [{ section: null, dayType: 'X', weekday: 'TUE', timeSlot: '15:10-17:10', qTerm: 'Q1Q2', faculty: 'R. Cohen' }],         // FC: Field X
  'd92e6279': [{ section: null, dayType: 'X', weekday: 'TUE', timeSlot: '15:10-17:10', qTerm: 'Q1Q2', faculty: 'Sucher' }],           // The Moral Leader
  '0aadf2d0': [{ section: null, dayType: 'X', weekday: 'TUE', timeSlot: '15:10-17:10', qTerm: 'Q2',   faculty: 'Hill; Khanna' }],     // Q2: Grand Challenges — Unicorns
  '3e8f5a72': [{ section: null, dayType: 'X', weekday: 'TUE', timeSlot: '15:10-17:10', qTerm: 'Q2',   faculty: 'Ghosh' }],            // Q2: Building an AI Venture (new in 6.25.26 update)
  'a01180d1': [{ section: null, dayType: 'X', weekday: 'TUE', timeSlot: '15:10-17:10', qTerm: 'Q1',   faculty: 'de Freitas' }],       // Q1: Creating Brand Value (AI) (Fall per 6.25.26 update)
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
  'ee22c766': [ // Crafting Your Life — Tuesday class plus shared WED 4:00-6:00pm plenary (per 6.25.26 grid)
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
  '5081cddf': [ // Q1: AI-Powered Digital Marketing — two sections in 6.25.26 update
    { section: '01', dayType: 'Y', weekday: null, timeSlot: '11:50-13:10', qTerm: 'Q1', faculty: 'Cook' },
    { section: '02', dayType: 'Y', weekday: null, timeSlot: '13:30-14:50', qTerm: 'Q1', faculty: 'Cook' },
  ],
  '2fd39bf3': [{ section: null, dayType: 'Y', weekday: null, timeSlot: '11:50-13:10', qTerm: 'Q1',   faculty: 'Fubini' }],            // Q1: Mastering Consulting Skills
  '6993442c': [{ section: null, dayType: 'Y', weekday: null, timeSlot: '13:30-14:50', qTerm: 'Q1',   faculty: 'Tamayo' }],            // Q1: Modern Corporate Strategy
  '5228d56b': [{ section: null, dayType: 'Y', weekday: null, timeSlot: '13:30-14:50', qTerm: 'Q1Q2', faculty: 'Whillans' }],          // Motivating People
  '13e6c05a': [{ section: null, dayType: 'Y', weekday: null, timeSlot: '13:30-14:50', qTerm: 'Q1Q2', faculty: 'Hsieh; Van Bever' }],  // Spiritual Lives of Leaders
  'eabe7b68': [{ section: null, dayType: 'Y', weekday: null, timeSlot: '13:30-14:50', qTerm: 'Q1',   faculty: 'Dey; Heese' }],        // Q1: Anatomy of Fraud
  '98279899': [{ section: null, dayType: 'Y', weekday: null, timeSlot: '13:30-14:50', qTerm: 'Q1',   faculty: 'Cole; Gandhi' }],      // Q1: Sustainable Investing
  'ae780de8': [{ section: null, dayType: 'Y', weekday: null, timeSlot: '11:50-13:10', qTerm: 'Q2',   faculty: 'Zhang' }],             // Q2: Managing Human Capital
  '2461b9e5': [{ section: null, dayType: 'Y', weekday: null, timeSlot: '13:30-14:50', qTerm: 'Q2',   faculty: 'Chertavian; Jones; McComb; Trelstad' }], // Q2: FC: Investing for Impact
  '3f90dbf9': [{ section: null, dayType: 'Y', weekday: null, timeSlot: '10:10-11:30', qTerm: 'Q2',   faculty: 'Alcacer; Sadun' }],    // Q2: Driving Profitable Growth
  '8f2c21c5': [{ section: null, dayType: 'Y', weekday: null, timeSlot: '11:50-13:10', qTerm: 'Q1Q2', faculty: 'Wing' }],              // Demystifying Family Enterprise (moved from X 8:30 in 6.25.26 update)
  '6b9e3d54': [{ section: null, dayType: 'Y', weekday: null, timeSlot: '13:30-14:50', qTerm: 'Q2',   faculty: 'Sandino' }],           // Q2: Systems Scaling Ventures (new in 6.25.26 update)
  // ── Single-section Y weekly Thu (Immersive Field Courses) ───────────────────
  'a2eda43b': [{ section: null, dayType: 'Y', weekday: 'THU', timeSlot: '15:10-17:10', qTerm: 'Q1Q2', faculty: 'Belo-Osagie; Macomber' }],   // IFC: Cape Town
  '60c474fa': [{ section: null, dayType: 'Y', weekday: 'THU', timeSlot: '15:10-17:10', qTerm: 'Q1Q2', faculty: 'Hsieh; Schulman' }],   // IFC: Singapore
  '7a65b59f': [{ section: null, dayType: 'Y', weekday: 'THU', timeSlot: '15:10-17:10', qTerm: 'Q1Q2', faculty: 'Gandhi' }],            // IFC: India
  'd56fe353': [{ section: null, dayType: 'Y', weekday: 'THU', timeSlot: '15:10-17:10', qTerm: 'Q1Q2', faculty: 'Reinert; Roscini' }],  // IFC: Italy
  '14adf598': [{ section: null, dayType: 'Y', weekday: 'THU', timeSlot: '15:10-17:10', qTerm: 'Q1Q2', faculty: 'Rithmire; Shih' }],    // IFC: China
  '14791e4d': [{ section: null, dayType: 'Y', weekday: 'THU', timeSlot: '15:10-17:10', qTerm: 'Q1Q2', faculty: 'Amano; Casadesus-Masanell' }], // IFC: Japan
  '3f064746': [{ section: null, dayType: 'Y', weekday: 'THU', timeSlot: '15:10-17:10', qTerm: 'Q1Q2', faculty: 'Roberge' }],           // IFC: Silicon Valley
  '4e72d08b': [{ section: null, dayType: 'Y', weekday: 'THU', timeSlot: '15:10-17:10', qTerm: 'Q1Q2', faculty: 'Khanna; Zelleke' }],   // IFC: Saudi Arabia

  // ── Multi-section Y day courses ─────────────────────────────────────────────
  'c403f8f6': [{ section: null, dayType: 'Y', weekday: null, timeSlot: '08:30-09:50', qTerm: 'Q1Q2', faculty: 'G. Jones' }], // Entrepreneurship & Global Capitalism (§02 cancelled per catalog API, 10.21.26)
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
  '70db20e6': [{ section: null, dayType: 'X', weekday: 'TUE', timeSlot: '15:10-17:10', qTerm: 'Q1Q2', faculty: 'Tadikonda' }],         // FC: Life Sciences Venture Creation (Tue per catalog API, 10.21.26)
  'e6189e3f': [{ section: null, dayType: 'W', weekday: 'WED', timeSlot: '15:10-17:10', qTerm: 'Q1Q2', faculty: 'L. Cohen' }],          // FC: Inside the Family Office
  'd77157c7': [{ section: null, dayType: 'W', weekday: 'WED', timeSlot: '15:10-17:10', qTerm: 'Q1Q2', faculty: 'Fleiss' }],            // FC: Seminar in Investing
  '9c2d7f41': [{ section: null, dayType: 'W', weekday: 'WED', timeSlot: '15:10-17:10', qTerm: 'Q1',   faculty: 'White' }],             // Q1: Elections & Democracy (new in 6.25.26 update)
  'bbe21c16': [ // War & Peace: Lessons of History
    { section: '01', dayType: 'W', weekday: 'WED', timeSlot: '15:10-17:10', qTerm: 'Q1Q2', faculty: 'Malhotra' },
    { section: '02', dayType: 'W', weekday: 'WED', timeSlot: '15:10-17:10', qTerm: 'Q1Q2', faculty: 'Mohan' },
  ],
}

export const COURSE_SECTIONS = { ...FALL_2026_SECTIONS, ...SPRING_2027_SECTIONS }

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
