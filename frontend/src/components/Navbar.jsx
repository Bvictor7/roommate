import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setIsOpen(false)
    navigate('/')
  }

  const closeMenu = () => setIsOpen(false)

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" onClick={closeMenu} className="flex items-center gap-2 group">
              <div className="p-2 bg-indigo-600 rounded-lg group-hover:bg-indigo-700 transition">
                <span className="text-white font-bold">RM</span>
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">RoomMate</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/listings" className="text-slate-600 hover:text-indigo-600 font-medium transition">Annonces</Link>
            
            {user ? (
              <div className="flex items-center gap-6">
                <Link to="/create-listing" className="text-slate-600 hover:text-indigo-600 font-medium">Publier</Link>
                <Link to="/profile" className="text-slate-600 hover:text-indigo-600 font-medium">
                  Compte
                </Link>
                <button onClick={handleLogout} className="text-slate-400 hover:text-red-600 transition font-medium">
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-slate-600 hover:text-indigo-600 font-medium">Connexion</Link>
                <Link to="/register" className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition font-medium shadow-sm">
                  Inscription
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-600 font-bold">
              {isOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-4 py-4 space-y-3 shadow-inner">
          <Link to="/listings" onClick={closeMenu} className="block py-2 text-slate-700 font-medium">
            Rechercher
          </Link>
          
          {user ? (
            <>
              <Link to="/create-listing" onClick={closeMenu} className="block py-2 text-slate-700 font-medium">
                Publier une annonce
              </Link>
              <Link to="/profile" onClick={closeMenu} className="block py-2 text-slate-700 font-medium">
                Mon profil
              </Link>
              <button onClick={handleLogout} className="block w-full text-left py-2 text-red-600 font-medium">
                Déconnexion
              </button>
            </>
          ) : (
            <div className="pt-2 space-y-3">
              <Link to="/login" onClick={closeMenu} className="block text-center py-2 text-slate-700 font-medium border border-slate-200 rounded-lg">
                Connexion
              </Link>
              <Link to="/register" onClick={closeMenu} className="block text-center py-2 bg-indigo-600 text-white rounded-lg font-medium">
                Créer un compte
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}