import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

export default function OAuthCallback() {
  const navigate = useNavigate()
  const { login } = useAuth()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')

    if (!token) {
      navigate('/login')
      return
    }

    const fetchUser = async () => {
      try {
        const res = await api.get('/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        login(token, res.data)
        navigate('/listings')
      } catch {
        navigate('/login')
      }
    }

    fetchUser()
  }, [])

  return (
    <main style={{ minHeight: '100vh', background: '#F4EEE2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Karla, system-ui, sans-serif', color: '#2A2723' }}>
      <p style={{ margin: 0, fontFamily: "'Cutive Mono', monospace", fontSize: 14 }}>Connexion en cours...</p>
    </main>
  )
}
