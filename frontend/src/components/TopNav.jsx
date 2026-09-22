import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function TopNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const tabs = [
    { label: 'Accueil', path: '/' },
    { label: 'Mon foyer', path: '/dashboard' },
    { label: 'Annonces', path: '/listings' },
  ]

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 20, background: '#F4EEE2', borderBottom: '1px solid #2A2723' }} aria-label="Navigation principale">
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '11px clamp(14px,3vw,34px)', display: 'flex', flexWrap: 'wrap', gap: '10px 20px', alignItems: 'center' }}>
        <Link to="/" style={{ fontFamily: 'Newsreader, serif', fontSize: 23, fontWeight: 600, letterSpacing: '-.01em', textDecoration: 'none', color: '#2A2723' }}>
          RoomMate
        </Link>
        <div style={{ display: 'flex', gap: 4, marginLeft: 'auto', flexWrap: 'wrap', alignItems: 'center' }}>
          {tabs.map(tab => {
            const active = location.pathname === tab.path || (tab.path !== '/' && location.pathname.startsWith(tab.path))
            return (
              <Link
                key={tab.path}
                to={tab.path}
                aria-current={active ? 'page' : undefined}
                style={{
                  fontSize: 15, fontWeight: 600, padding: '7px 14px', textDecoration: 'none',
                  background: active ? '#2A2723' : 'transparent',
                  color: active ? '#F4EEE2' : '#2A2723',
                  border: '1px solid #2A2723'
                }}
              >
                {tab.label}
              </Link>
            )
          })}
          {user ? (
            <button
              onClick={handleLogout}
              style={{ fontSize: 15, fontWeight: 600, padding: '7px 14px', background: 'transparent', color: '#2A2723', border: '1px solid #2A2723', cursor: 'pointer', marginLeft: 8 }}
            >
              Déco
            </button>
          ) : (
            <>
              <Link to="/login" style={{ fontSize: 15, fontWeight: 600, padding: '7px 14px', textDecoration: 'none', color: '#2A2723', marginLeft: 8 }}>
                Connexion
              </Link>
              <Link to="/register" style={{ fontSize: 15, fontWeight: 600, padding: '7px 14px', textDecoration: 'none', background: '#2A2723', color: '#F4EEE2', border: '1px solid #2A2723' }}>
                Créer un compte
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
