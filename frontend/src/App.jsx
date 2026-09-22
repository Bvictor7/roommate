import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
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
    <div className="min-h-screen bg-[#0f1117]">
      <TopNav />
      {children}
    </div>
  )
}

function useHasColocation(user) {
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    if (!user) {
      setStatus('no')
      return
    }
    let cancelled = false
    setStatus('loading')
    api.get('/colocation/me')
      .then(() => { if (!cancelled) setStatus('yes') })
      .catch(() => { if (!cancelled) setStatus('no') })
    return () => { cancelled = true }
  }, [user])

  return status
}

function RequireColocation({ children }) {
  const { user, loading } = useAuth()
  const status = useHasColocation(user)

  if (loading || (user && status === 'loading')) return null
  if (!user) return <Navigate to="/login" replace />
  if (status === 'no') return <Navigate to="/coloc-setup" replace />
  return children
}

function RequireNoColocation({ children }) {
  const { user, loading } = useAuth()
  const status = useHasColocation(user)

  if (loading || (user && status === 'loading')) return null
  if (!user) return <Navigate to="/login" replace />
  if (status === 'yes') return <Navigate to="/dashboard" replace />
  return children
}

function App() {
  return (
    <Router>
      <AuthProvider>
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
      </AuthProvider>
    </Router>
  )
}

export default App
