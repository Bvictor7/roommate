import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'

export default function Register() {
  const [form, setForm] = useState({ email: '', password: '', username: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/api/auth/register', form)
      navigate('/login')
    } catch (err) {
      setError('Erreur lors de la création du compte')
    }
  }

  return (
    <div>
      <h1>Créer un compte</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input placeholder="Nom d'utilisateur" value={form.username} onChange={e => setForm({...form, username: e.target.value})} />
        <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <input type="password" placeholder="Mot de passe" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
        <button type="submit">S'inscrire</button>
      </form>
      <Link to="/login">Déjà un compte ?</Link>
    </div>
  )
}