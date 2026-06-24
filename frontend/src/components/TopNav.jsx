import { Link, useLocation } from 'react-router-dom'

const tabs = [
  { label: 'Landing', path: '/' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Recherche', path: '/listings' },
]

export default function TopNav() {
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="bg-[#0f1117] border-b border-white/10 sticky top-0 z-50">
      <div className="px-4 h-14 flex items-center justify-between gap-2">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-teal-400 flex items-center justify-center font-bold text-[#0f1117] text-xs">
            R
          </div>
          <span className="font-bold text-white text-sm hidden sm:block">RoomMate</span>
        </Link>

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

        <div className="w-7 sm:w-24 shrink-0" />
      </div>
    </nav>
  )
}
