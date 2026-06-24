import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock } from 'lucide-react'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await api.post('/auth/login', form)
      login(res.data.token, res.data.user)
      navigate('/listings')
    } catch (err) {
      setError(err.response?.data?.message || 'Email ou mot de passe incorrect')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-[calc(100vh-56px)] bg-[#0f1117] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">Connexion</h1>
          <p className="text-white/50 mt-2">Accédez à votre espace colocation</p>
        </div>

        <div className="bg-[#1a1d27] rounded-2xl border border-white/10 p-6 sm:p-8 space-y-5">
          {error && (
            <div role="alert" aria-live="polite" className="bg-red-500/10 text-red-400 text-sm p-4 rounded-xl border border-red-500/20">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium text-white/70">Email</label>
            <div className="relative">
              <Mail aria-hidden="true" className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 outline-none focus:border-teal-400 focus-visible:ring-2 focus-visible:ring-teal-400 transition text-sm"
                placeholder="nom@exemple.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="text-sm font-medium text-white/70">Mot de passe</label>
            <div className="relative">
              <Lock aria-hidden="true" className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 outline-none focus:border-teal-400 focus-visible:ring-2 focus-visible:ring-teal-400 transition text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            aria-busy={loading}
            className="w-full py-3 bg-teal-400 text-[#0f1117] rounded-xl font-bold hover:bg-teal-300 transition disabled:opacity-50 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {loading ? 'Vérification...' : 'Se connecter'}
          </button>

          <p className="text-center text-sm text-white/40 pt-1">
            Nouveau ici ?{' '}
            <Link to="/register" className="text-teal-400 hover:text-teal-300 font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
