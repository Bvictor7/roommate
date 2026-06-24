import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const tabs = [
  { label: 'Landing', path: '/' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Recherche', path: '/listings' },
]

export default function TopNav() {
  const location = useLocation()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-[#0f1117] border-b border-white/10 sticky top-0 z-50">
      <div className="px-4 sm:px-6 h-14 flex items-center justify-between gap-3">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-teal-400 flex items-center justify-center font-bold text-[#0f1117] text-xs">
            R
          </div>
          <span className="font-bold text-white text-sm hidden sm:block">RoomMate</span>
        </Link>

        {/* Tabs */}
        <div className="flex items-center gap-0.5 bg-white/10 rounded-full p-1">
          {tabs.map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition whitespace-nowrap ${
                isActive(tab.path)
                  ? 'bg-teal-400 text-[#0f1117]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        {/* Auth */}
        <div className="flex items-center gap-2 shrink-0">
          {user ? (
            <>
              <Link
                to="/profile"
                className="w-8 h-8 rounded-full bg-teal-400 flex items-center justify-center text-xs font-bold text-[#0f1117]"
              >
                {user.username?.[0]?.toUpperCase() || 'U'}
              </Link>
              <button
                onClick={handleLogout}
                className="hidden sm:block text-xs text-white/40 hover:text-red-400 transition"
              >
                Déco
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-xs sm:text-sm text-white/60 hover:text-white transition hidden sm:block"
              >
                Connexion
              </Link>
              <Link
                to="/register"
                className="text-xs sm:text-sm bg-teal-400 text-[#0f1117] px-3 py-1.5 rounded-full font-semibold hover:bg-teal-300 transition whitespace-nowrap"
              >
                Créer un compte
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
