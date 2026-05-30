import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import { useCourseBuilds } from './hooks/useCourseBuilds'
import CourseCatalog from './pages/CourseCatalog'
import CourseDetail from './pages/CourseDetail'
import CourseBuilds from './pages/CourseBuilds'
import ScheduleView from './pages/ScheduleView'
import CompareBuilds from './pages/CompareBuilds'
import { BookOpen, BookMarked, CalendarDays, GitCompareArrows } from 'lucide-react'

function Nav() {
  // Under 768px we collapse labels and only show icons — keeps all 4 routes
  // visible on phones (including larger Pro Max devices and accessibility zoom)
  // without horizontal overflow.
  const [compact, setCompact] = useState(typeof window !== 'undefined' && window.innerWidth < 768)
  useEffect(() => {
    const h = () => setCompact(window.innerWidth < 768)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])

  const linkStyle = ({ isActive }) => ({
    display: 'flex', alignItems: 'center', gap: compact ? 0 : '0.375rem',
    padding: compact ? '0.4rem 0.55rem' : '0.375rem 0.625rem',
    borderRadius: 'var(--radius-sm)',
    fontSize: '0.9rem', fontWeight: 600,
    textDecoration: 'none',
    color: isActive ? '#fff' : 'rgba(255,255,255,0.75)',
    background: isActive ? 'rgba(255,255,255,0.18)' : 'transparent',
    transition: 'all 0.15s',
  })

  return (
    <header style={{
      background: 'var(--crimson)',
      borderBottom: '1px solid var(--crimson-dark)',
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        padding: compact ? '0 0.75rem' : '0 1.5rem',
        display: 'flex', alignItems: 'center', gap: compact ? '0.625rem' : '1.5rem',
        height: 56,
      }}>
        {/* Logo */}
        <NavLink to="/courses"
          style={{
            textDecoration: 'none',
            display: 'flex', flexDirection: 'column', lineHeight: 1.1,
            marginRight: compact ? 0 : '0.5rem',
            flexShrink: 0,
          }}
          aria-label="HBS Electives — Home"
        >
          <span style={{ fontWeight: 800, fontSize: compact ? '0.875rem' : '1rem', color: '#fff', letterSpacing: '-0.01em' }}>
            HBS Electives
          </span>
          {!compact && (
            <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              AY 2026–2027
            </span>
          )}
        </NavLink>

        <nav style={{ display: 'flex', gap: compact ? '0.125rem' : '0.25rem', marginLeft: compact ? 'auto' : 0 }}>
          <NavLink to="/courses" style={linkStyle} title="Courses" aria-label="Courses">
            <BookOpen size={compact ? 18 : 15} /> {!compact && 'Courses'}
          </NavLink>
          <NavLink to="/builds" style={linkStyle} title="My Builds" aria-label="My Builds">
            <BookMarked size={compact ? 18 : 15} /> {!compact && 'My Builds'}
          </NavLink>
          <NavLink to="/schedule" style={linkStyle} title="Schedule" aria-label="Schedule">
            <CalendarDays size={compact ? 18 : 15} /> {!compact && 'Schedule'}
          </NavLink>
          <NavLink to="/compare" style={linkStyle} title="Compare" aria-label="Compare">
            <GitCompareArrows size={compact ? 18 : 15} /> {!compact && 'Compare'}
          </NavLink>
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
      </Routes>
    </BrowserRouter>
  )
}
