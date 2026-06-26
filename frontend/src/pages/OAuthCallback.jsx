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
    <main className="min-h-screen bg-[#0f1117] flex items-center justify-center">
      <p className="text-white/50 text-sm">Connexion en cours...</p>
    </main>
  )
}
