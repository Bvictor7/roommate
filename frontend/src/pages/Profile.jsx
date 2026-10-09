import { useAuth } from '../context/useAuth'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const initials = user?.username?.[0]?.toUpperCase() || '?'

  return (
    <main style={{ minHeight: 'calc(100vh - 56px)', background: '#F4EEE2', padding: '48px clamp(14px,3vw,34px)', fontFamily: 'Karla, system-ui, sans-serif', color: '#2A2723' }}>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Newsreader, serif', fontWeight: 500, fontSize: 'clamp(28px,4vw,38px)', margin: '0 0 28px', letterSpacing: '-.02em' }}>
          Mon compte
        </h1>

        <div style={{ background: '#FBF7EE', border: '1px solid #2A2723', padding: 'clamp(20px,3vw,32px)', display: 'grid', gap: 24 }}>

          {/* Avatar + infos */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 56, height: 56, background: '#1F4438', color: '#F2EEE0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Newsreader, serif', fontSize: 26, fontWeight: 600, flexShrink: 0 }}>
              {initials}
            </div>
            <div>
              <p style={{ fontFamily: 'Newsreader, serif', fontSize: 22, fontWeight: 600, margin: 0 }}>{user?.username}</p>
              <p style={{ fontSize: 14, color: '#6B655A', margin: '3px 0 0', fontFamily: "'Cutive Mono', monospace" }}>{user?.email}</p>
            </div>
          </div>

          {/* Détails */}
          <div style={{ borderTop: '1px solid #D4C9B8', paddingTop: 20, display: 'grid', gap: 14 }}>
            <div>
              <p style={{ fontFamily: "'Cutive Mono', monospace", fontSize: 12, letterSpacing: '.1em', color: '#6B655A', margin: '0 0 4px' }}>NOM D'UTILISATEUR</p>
              <p style={{ fontSize: 16, margin: 0 }}>{user?.username}</p>
            </div>
            <div>
              <p style={{ fontFamily: "'Cutive Mono', monospace", fontSize: 12, letterSpacing: '.1em', color: '#6B655A', margin: '0 0 4px' }}>EMAIL</p>
              <p style={{ fontSize: 16, margin: 0 }}>{user?.email}</p>
            </div>
            {user?.role && (
              <div>
                <p style={{ fontFamily: "'Cutive Mono', monospace", fontSize: 12, letterSpacing: '.1em', color: '#6B655A', margin: '0 0 4px' }}>RÔLE</p>
                <p style={{ fontSize: 16, margin: 0 }}>{user.role}</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div style={{ borderTop: '1px solid #D4C9B8', paddingTop: 20, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <button
              onClick={() => navigate('/create-listing')}
              style={{ flex: 1, padding: '12px 0', background: '#B4472C', color: '#F9F5EC', border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'Karla, sans-serif', minWidth: 160 }}
            >
              + Publier une annonce
            </button>
            <button
              onClick={handleLogout}
              style={{ flex: 1, padding: '12px 0', background: 'transparent', border: '1.5px solid #2A2723', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'Karla, sans-serif', color: '#2A2723', minWidth: 160 }}
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}