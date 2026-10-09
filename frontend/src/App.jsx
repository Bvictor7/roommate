import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/useAuth'
import api from './services/api'
import TopNav from './components/TopNav'
import Home from './pages/Home'
import Listings from './pages/Listings'
import Login from './pages/Login'
import Register from './pages/Register'
import CreateListing from './pages/CreateListing'
import Profile from './pages/Profile'
import EditListing from './pages/EditListing'
import Dashboard from './pages/Dashboard'
import OAuthCallback from './pages/OAuthCallback'
import ColocationSetup from './pages/ColocationSetup'

function Layout({ children }) {
  return (
    <div style={{ minHeight: '100vh', background: '#F4EEE2' }}>
      <TopNav />
      {children}
    </div>
  )
}

function useHasColocation(user) {
  // Le résultat est associé à l'utilisateur pour lequel il a été obtenu
  const [result, setResult] = useState({ user: null, status: 'loading' })

  useEffect(() => {
    if (!user) return
    let cancelled = false
    api.get('/colocation/me')
      .then(() => { if (!cancelled) setResult({ user, status: 'yes' }) })
      .catch(() => { if (!cancelled) setResult({ user, status: 'no' }) })
    return () => { cancelled = true }
  }, [user])

  if (!user) return 'no'
  return result.user === user ? result.status : 'loading'
}

function RequireColocation({ children }) {
  const { user } = useAuth()
  const status = useHasColocation(user)

  if (user && status === 'loading') return null
  if (!user) return <Navigate to="/login" replace />
  if (status === 'no') return <Navigate to="/coloc-setup" replace />
  return children
}

function RequireNoColocation({ children }) {
  const { user } = useAuth()
  const status = useHasColocation(user)

  if (user && status === 'loading') return null
  if (!user) return <Navigate to="/login" replace />
  if (status === 'yes') return <Navigate to="/dashboard" replace />
  return children
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/listings" element={<Layout><Listings /></Layout>} />
        <Route path="/dashboard/*" element={<RequireColocation><Layout><Dashboard /></Layout></RequireColocation>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/create-listing" element={<Layout><CreateListing /></Layout>} />
        <Route path="/edit-listing/:id" element={<Layout><EditListing /></Layout>} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
        <Route path="/oauth/callback" element={<OAuthCallback />} />
        <Route path="/coloc-setup" element={<RequireNoColocation><Layout><ColocationSetup /></Layout></RequireNoColocation>} />
      </Routes>
    </Router>
  )
}

export default App
