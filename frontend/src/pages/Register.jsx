import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [form, setForm] = useState({ email: '', password: '', username: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await api.post('/auth/register', form)
      login(res.data.token, res.data.user)
      setSuccess(true)
      setTimeout(() => navigate('/dashboard'), 1500)
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création du compte')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ minHeight: 'calc(100vh - 56px)', background: '#F4EEE2', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px clamp(14px,3vw,34px)', fontFamily: 'Karla, system-ui, sans-serif', color: '#2A2723' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <h1 style={{ fontFamily: 'Newsreader, serif', fontWeight: 500, fontSize: 'clamp(28px,4vw,38px)', margin: '0 0 6px', letterSpacing: '-.02em' }}>Créer un compte</h1>
        <p style={{ margin: '0 0 28px', fontSize: 16, color: '#6B655A' }}>Rejoignez la communauté des colocs</p>

        <div style={{ background: '#FBF7EE', border: '1px solid #2A2723', padding: 'clamp(20px,3vw,32px)' }}>

          {success && (
            <div role="alert" style={{ background: '#E8F0E8', border: '1px solid #1F4438', color: '#1F4438', fontSize: 14, padding: '10px 14px', marginBottom: 20 }}>
              ✓ Compte créé avec succès ! Redirection en cours...
            </div>
          )}

          {error && (
            <div role="alert" style={{ background: '#F5E8E5', border: '1px solid #B4472C', color: '#B4472C', fontSize: 14, padding: '10px 14px', marginBottom: 20 }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: 14 }}>
            <label htmlFor="username" style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Nom d'utilisateur</label>
            <input
              id="username"
              type="text"
              required
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              placeholder="Votre pseudo"
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #2A2723', background: '#F4EEE2', fontSize: 15, fontFamily: 'Karla, sans-serif', color: '#2A2723', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label htmlFor="email" style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Email</label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="nom@exemple.com"
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #2A2723', background: '#F4EEE2', fontSize: 15, fontFamily: 'Karla, sans-serif', color: '#2A2723', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label htmlFor="password" style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Mot de passe <span style={{ color: '#6B655A', fontWeight: 400 }}>(min. 6 caractères)</span></label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #2A2723', background: '#F4EEE2', fontSize: 15, fontFamily: 'Karla, sans-serif', color: '#2A2723', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || success}
            style={{ width: '100%', padding: '12px 0', background: '#B4472C', color: '#F9F5EC', fontSize: 16, fontWeight: 700, border: 'none', cursor: (loading || success) ? 'not-allowed' : 'pointer', fontFamily: 'Karla, sans-serif', opacity: (loading || success) ? 0.7 : 1 }}
          >
            {loading ? 'Création...' : success ? 'Compte créé ✓' : "S'inscrire"}
          </button>

          <p style={{ textAlign: 'center', fontSize: 14, color: '#6B655A', marginTop: 16, marginBottom: 0 }}>
            Déjà inscrit ?{' '}
            <Link to="/login" style={{ color: '#B4472C', fontWeight: 600, textDecoration: 'underline' }}>
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
