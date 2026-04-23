import { Home } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">RoomMate</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              La plateforme pensée pour simplifier la vie en colocation. Trouvez votre logement et gérez votre quotidien sereinement.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-xs tracking-widest">Navigation</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/listings" className="text-slate-400 hover:text-indigo-400 transition-colors">Explorer les annonces</Link>
              </li>
              <li>
                <Link to="/register" className="text-slate-400 hover:text-indigo-400 transition-colors">Créer un compte</Link>
              </li>
              <li>
                <Link to="/login" className="text-slate-400 hover:text-indigo-400 transition-colors">Se connecter</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-xs tracking-widest">Contact</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2">SaintPalais, France</li>
              <li className="flex items-center gap-2">belahcene2@gmail.com</li>
              <li className="pt-2 text-xs text-slate-500 italic text-balance">
                Projet réalisé dans le cadre de la certification CDA.
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-8 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} RoomMate. Tous droits réservés.
        </div>
      </div>
    </footer>
  )
}