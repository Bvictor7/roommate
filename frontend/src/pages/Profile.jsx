import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { user } = useAuth()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Mon Compte</h1>
      <p>Bienvenue, {user?.username} !</p>
      <p>Ton email : {user?.email}</p>
    </div>
  )
}