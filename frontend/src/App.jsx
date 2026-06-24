import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import TopNav from './components/TopNav'
import Home from './pages/Home'
import Listings from './pages/Listings'
import Login from './pages/Login'
import Register from './pages/Register'
import CreateListing from './pages/CreateListing'
import Profile from './pages/Profile'
import EditListing from './pages/EditListing'
import Dashboard from './pages/Dashboard'

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#0f1117]">
      <TopNav />
      {children}
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/listings" element={<Layout><Listings /></Layout>} />
          <Route path="/dashboard/*" element={<Layout><Dashboard /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/register" element={<Layout><Register /></Layout>} />
          <Route path="/create-listing" element={<Layout><CreateListing /></Layout>} />
          <Route path="/edit-listing/:id" element={<Layout><EditListing /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
