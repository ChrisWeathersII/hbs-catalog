import { BrowserRouter, Routes, Route, NavLink, Navigate, useLocation } from 'react-router-dom'
import { useCourseBuilds } from './hooks/useCourseBuilds'
import CourseCatalog from './pages/CourseCatalog'
import CourseDetail from './pages/CourseDetail'
import CourseBuilds from './pages/CourseBuilds'
import ScheduleView from './pages/ScheduleView'
import CompareBuilds from './pages/CompareBuilds'
import AcademicCalendar from './pages/AcademicCalendar'
import Guide from './pages/Guide'
import RankingView from './pages/RankingView'
import PowerRankings from './pages/PowerRankings'
import SuggestView from './pages/SuggestView'
import WelcomeTour from './components/WelcomeTour'
import { nextHardDeadline } from './data/ecDeadlines'
import { BookOpen, BookMarked, CalendarDays, GitCompareArrows, CalendarRange, Compass, ListOrdered, Clock, Sparkles } from 'lucide-react'

// Four top-level jobs: browse, plan, rank for Scout, reference. Plan and Guide
// group several pages behind a sub-tab strip; every route is unchanged.
const GROUPS = [
  { to: '/courses',  label: 'Courses', Icon: BookOpen,     paths: ['/courses'] },
  { to: '/schedule', label: 'Plan',    Icon: CalendarDays, paths: ['/schedule', '/suggest', '/compare', '/builds'],
    tabs: [
      { to: '/schedule', label: 'Schedule',  Icon: CalendarDays },
      { to: '/suggest',  label: 'Suggest',   Icon: Sparkles },
      { to: '/compare',  label: 'Compare',   Icon: GitCompareArrows },
      { to: '/builds',   label: 'My Builds', Icon: BookMarked },
    ] },
  { to: '/ranking',  label: 'Rank',    Icon: ListOrdered,  paths: ['/ranking'] },
  { to: '/guide',    label: 'Guide',   Icon: Compass,      paths: ['/guide', '/calendar'],
    tabs: [
      { to: '/guide',    label: 'Deadlines & how-to', Icon: Compass },
      { to: '/calendar', label: 'Calendar',           Icon: CalendarRange },
    ] },
]

const groupFor = (pathname) => GROUPS.find(g => g.paths.some(p => pathname === p || pathname.startsWith(p + '/')))

function SubNav() {
  const group = groupFor(useLocation().pathname)
  if (!group?.tabs) return null
  return (
    <div className="subnav">
      <nav className="subnav__inner" aria-label={group.label}>
        {group.tabs.map(({ to, label, Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => 'subnav__tab' + (isActive ? ' is-active' : '')}>
            <Icon size={14} strokeWidth={2} /><span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

function DeadlinePill() {
  const next = nextHardDeadline()
  if (!next) return null
  return (
    <NavLink to="/guide" className="nav__deadline" title={`${next.label}${next.t ? ` — ${next.t}` : ''}`}>
      <Clock size={12} strokeWidth={2.2} />
      <b>{next.d}</b>
      <span>{next.short}</span>
    </NavLink>
  )
}

function Nav() {
  const active = groupFor(useLocation().pathname)
  return (
    <header className="nav">
      <div className="nav__inner">
        <NavLink to="/courses" className="brand" aria-label="HBS Electives — Home">
          <span className="brand__mark">H</span>
          <span className="brand__text">
            <span className="brand__name">HBS Electives</span>
            <span className="brand__sub">AY 2026–2027</span>
          </span>
        </NavLink>
        <nav className="nav__links">
          <DeadlinePill />
          {GROUPS.map(g => (
            <NavLink key={g.label} to={g.to} title={g.label} aria-label={g.label}
              className={'nav__link' + (active === g ? ' is-active' : '')}>
              <g.Icon size={16} strokeWidth={1.9} /><span>{g.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default function App() {
  const courseBuildsHook = useCourseBuilds()

  return (
    <BrowserRouter>
      <Nav />
      <SubNav />
      <WelcomeTour />
      <Routes>
        <Route path="/" element={<Navigate to="/courses" replace />} />
        <Route path="/courses" element={<CourseCatalog {...courseBuildsHook} />} />
        <Route path="/courses/:id" element={<CourseDetail {...courseBuildsHook} />} />
        <Route path="/builds" element={<CourseBuilds {...courseBuildsHook} />} />
        <Route path="/schedule" element={<ScheduleView {...courseBuildsHook} />} />
        <Route path="/compare" element={<CompareBuilds {...courseBuildsHook} />} />
        <Route path="/calendar" element={<AcademicCalendar />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/ranking" element={<RankingView {...courseBuildsHook} />} />
        {/* Out of the nav for Spring: evals only cover Fall courses (6 of 56
            Spring courses rated). Still reachable by URL. */}
        <Route path="/power" element={<PowerRankings />} />
        <Route path="/suggest" element={<SuggestView {...courseBuildsHook} />} />
      </Routes>
    </BrowserRouter>
  )
}
