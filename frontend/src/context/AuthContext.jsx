import { useState, useCallback } from 'react'
import { AuthContext } from './useAuth'

// Clés d'authentification uniquement : les autres données du localStorage sont conservées
const AUTH_STORAGE_KEYS = ['token', 'user', 'accessToken', 'refreshToken']

function readStoredUser() {
  const storedUser = localStorage.getItem('user')
  if (!storedUser || storedUser === 'undefined' || !localStorage.getItem('token')) return null
  try {
    return JSON.parse(storedUser)
  } catch (error) {
    console.error("Erreur de parsing du localStorage:", error)
    localStorage.removeItem('user')
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser)
  const [token, setToken] = useState(() => localStorage.getItem('token'))

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
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
