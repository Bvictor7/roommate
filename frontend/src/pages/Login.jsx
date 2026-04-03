import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/api/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      navigate('/listings')
    } catch (err) {
      setError('Email ou mot de passe incorrect')
    }
  }

  return (
    <div>
      <h1>Connexion</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Se connecter</button>
      </form>
      <Link to="/register">Pas encore de compte ?</Link>
    </div>
  )
}