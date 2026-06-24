import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-[calc(100vh-56px)] bg-[#0f1117] px-4 py-12">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-white mb-8">Mon compte</h1>

        <div className="bg-[#1a1d27] rounded-2xl border border-white/10 p-6 sm:p-8 space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-teal-400 flex items-center justify-center text-[#0f1117] text-2xl font-bold">
              {user?.username?.[0]?.toUpperCase() || '?'}
            </div>
            <div>
              <p className="text-lg font-bold text-white">{user?.username}</p>
              <p className="text-white/50 text-sm">{user?.email}</p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 space-y-4">
            <div className="space-y-1">
              <p className="text-xs text-white/40 uppercase tracking-widest">Nom d'utilisateur</p>
              <p className="text-white text-sm">{user?.username}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-white/40 uppercase tracking-widest">Email</p>
              <p className="text-white text-sm">{user?.email}</p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate('/create-listing')}
              className="flex-1 py-3 bg-teal-400 text-[#0f1117] rounded-xl font-semibold hover:bg-teal-300 transition text-sm"
            >
              + Publier une annonce
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 py-3 bg-white/5 text-white/60 rounded-xl font-semibold hover:bg-red-500/10 hover:text-red-400 transition text-sm border border-white/10"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
