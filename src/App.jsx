import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import { useCourseBuilds } from './hooks/useCourseBuilds'
import CourseCatalog from './pages/CourseCatalog'
import CourseDetail from './pages/CourseDetail'
import CourseBuilds from './pages/CourseBuilds'
import { BookOpen, BookMarked } from 'lucide-react'

function Nav() {
  const linkStyle = ({ isActive }) => ({
    display: 'flex', alignItems: 'center', gap: '0.375rem',
    padding: '0.375rem 0.625rem',
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
        padding: '0 1.5rem',
        display: 'flex', alignItems: 'center', gap: '1.5rem',
        height: 56,
      }}>
        {/* Logo */}
        <NavLink to="/courses" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', lineHeight: 1.1, marginRight: '0.5rem' }}>
          <span style={{ fontWeight: 800, fontSize: '1rem', color: '#fff', letterSpacing: '-0.01em' }}>
            HBS Electives
          </span>
          <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            AY 2026–2027
          </span>
        </NavLink>

        <nav style={{ display: 'flex', gap: '0.25rem' }}>
          <NavLink to="/courses" style={linkStyle}>
            <BookOpen size={15} /> Courses
          </NavLink>
          <NavLink to="/builds" style={linkStyle}>
            <BookMarked size={15} /> My Builds
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
      </Routes>
    </BrowserRouter>
  )
}
