import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import { useCourseBuilds } from './hooks/useCourseBuilds'
import CourseCatalog from './pages/CourseCatalog'
import CourseDetail from './pages/CourseDetail'
import CourseBuilds from './pages/CourseBuilds'
import ScheduleView from './pages/ScheduleView'
import CompareBuilds from './pages/CompareBuilds'
import AcademicCalendar from './pages/AcademicCalendar'
import Guide from './pages/Guide'
import { BookOpen, BookMarked, CalendarDays, GitCompareArrows, CalendarRange, Compass } from 'lucide-react'

const LINKS = [
  { to: '/courses',  label: 'Courses',   Icon: BookOpen },
  { to: '/builds',   label: 'My Builds', Icon: BookMarked },
  { to: '/schedule', label: 'Schedule',  Icon: CalendarDays },
  { to: '/compare',  label: 'Compare',   Icon: GitCompareArrows },
  { to: '/calendar', label: 'Calendar',  Icon: CalendarRange },
  { to: '/guide',    label: 'Guide',     Icon: Compass },
]

function Nav() {
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
          {LINKS.map(({ to, label, Icon }) => (
            <NavLink key={to} to={to} title={label} aria-label={label}
              className={({ isActive }) => 'nav__link' + (isActive ? ' is-active' : '')}>
              <Icon size={16} strokeWidth={1.9} /><span>{label}</span>
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
      <Routes>
        <Route path="/" element={<Navigate to="/courses" replace />} />
        <Route path="/courses" element={<CourseCatalog {...courseBuildsHook} />} />
        <Route path="/courses/:id" element={<CourseDetail {...courseBuildsHook} />} />
        <Route path="/builds" element={<CourseBuilds {...courseBuildsHook} />} />
        <Route path="/schedule" element={<ScheduleView {...courseBuildsHook} />} />
        <Route path="/compare" element={<CompareBuilds {...courseBuildsHook} />} />
        <Route path="/calendar" element={<AcademicCalendar />} />
        <Route path="/guide" element={<Guide />} />
      </Routes>
    </BrowserRouter>
  )
}
