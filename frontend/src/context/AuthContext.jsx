import { useState, useEffect, useCallback } from 'react'
import { AuthContext } from './useAuth'

// Clés d'authentification uniquement : les autres données du localStorage sont conservées
const AUTH_STORAGE_KEYS = ['token', 'user', 'accessToken', 'refreshToken']

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token')

    if (storedUser && storedToken && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser))
        setToken(storedToken)
      } catch (error) {
        console.error("Erreur de parsing du localStorage:", error)
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = useCallback((newToken, userData) => {
    if (!userData) return console.error("Données utilisateur manquantes");
    
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(userData))
    setToken(newToken)
    setUser(userData)
  }, [])

  const logout = useCallback(() => {
    AUTH_STORAGE_KEYS.forEach(key => localStorage.removeItem(key))
    setToken(null)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
