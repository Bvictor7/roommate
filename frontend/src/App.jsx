import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Listings from './pages/Listings'
import Login from './pages/Login'
import Register from './pages/Register'
import CreateListing from './pages/CreateListing'
import Profile from './pages/Profile'
import EditListing from './pages/EditListing'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Landing : pas de Navbar globale, elle a la sienne */}
          <Route path="/" element={<Home />} />

          {/* Dashboard : pas de Navbar globale, sidebar intégrée */}
          <Route path="/dashboard/*" element={<Dashboard />} />

          {/* Recherche : pas de Navbar, layout plein écran */}
          <Route path="/listings" element={<Listings />} />

          {/* Pages avec Navbar standard */}
          <Route
            path="*"
            element={
              <div className="min-h-screen bg-slate-50">
                <Navbar />
                <main className="container mx-auto px-4 py-8">
                  <Routes>
                    <Route path="/create-listing" element={<CreateListing />} />
                    <Route path="/edit-listing/:id" element={<EditListing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </main>
              </div>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
