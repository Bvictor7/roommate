import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
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
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Email ou mot de passe incorrect')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`
  }

  return (
    <main style={{ minHeight: 'calc(100vh - 56px)', background: '#F4EEE2', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px clamp(14px,3vw,34px)', fontFamily: 'Karla, system-ui, sans-serif', color: '#2A2723' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <h1 style={{ fontFamily: 'Newsreader, serif', fontWeight: 500, fontSize: 'clamp(28px,4vw,38px)', margin: '0 0 6px', letterSpacing: '-.02em' }}>Connexion</h1>
        <p style={{ margin: '0 0 28px', fontSize: 16, color: '#6B655A' }}>Accédez à votre espace colocation</p>

        <div style={{ background: '#FBF7EE', border: '1px solid #2A2723', padding: 'clamp(20px,3vw,32px)' }}>

          {error && (
            <div role="alert" style={{ background: '#F5E8E5', border: '1px solid #B4472C', color: '#B4472C', fontSize: 14, padding: '10px 14px', marginBottom: 20 }}>
              {error}
            </div>
          )}

          <button
            onClick={handleGoogle}
            style={{ width: '100%', padding: '11px 0', background: '#fff', border: '1px solid #2A2723', fontSize: 15, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, color: '#2A2723', fontFamily: 'Karla, sans-serif' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuer avec Google
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '18px 0' }}>
            <div style={{ flex: 1, height: 1, background: '#D4C9B8' }} />
            <span style={{ fontFamily: "'Cutive Mono', monospace", fontSize: 13, color: '#6B655A' }}>ou</span>
            <div style={{ flex: 1, height: 1, background: '#D4C9B8' }} />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label htmlFor="email" style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Email</label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              onKeyDown={e => e.key === 'Enter' && handleSubmit(e)}
              placeholder="nom@exemple.com"
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #2A2723', background: '#F4EEE2', fontSize: 15, fontFamily: 'Karla, sans-serif', color: '#2A2723', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label htmlFor="password" style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Mot de passe</label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              onKeyDown={e => e.key === 'Enter' && handleSubmit(e)}
              placeholder="••••••••"
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #2A2723', background: '#F4EEE2', fontSize: 15, fontFamily: 'Karla, sans-serif', color: '#2A2723', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{ width: '100%', padding: '12px 0', background: '#B4472C', color: '#F9F5EC', fontSize: 16, fontWeight: 700, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'Karla, sans-serif', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Vérification...' : 'Se connecter'}
          </button>

          <p style={{ textAlign: 'center', fontSize: 14, color: '#6B655A', marginTop: 16, marginBottom: 0 }}>
            Nouveau ici ?{' '}
            <Link to="/register" style={{ color: '#B4472C', fontWeight: 600, textDecoration: 'underline' }}>
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
