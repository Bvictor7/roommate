import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trash2, Edit } from 'lucide-react'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

const CARD_COLORS = [
  'from-emerald-300 to-teal-400',
  'from-blue-300 to-indigo-400',
  'from-yellow-300 to-amber-400',
  'from-purple-300 to-violet-400',
]

const MATCH_SCORES = [94, 88, 91, 85, 89, 83, 92, 87]

const AVATARS = [
  { initials: 'JL', color: 'bg-purple-500' },
  { initials: 'TM', color: 'bg-teal-500' },
  { initials: 'LD', color: 'bg-blue-500' },
  { initials: 'SC', color: 'bg-emerald-500' },
  { initials: 'AX', color: 'bg-orange-500' },
]

export default function Listings() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [city, setCity] = useState('Paris, France')
  const [showMap, setShowMap] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetchListings()
  }, [])

  const fetchListings = async () => {
    try {
      const res = await api.get('/listings')
      setListings(res.data)
    } catch (err) {
      console.error('Erreur chargement annonces:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cette annonce ?')) return
    try {
      const token = localStorage.getItem('token')
      await api.delete(`/listings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setListings(listings.filter((l) => l.id !== id))
    } catch {
      alert('Erreur lors de la suppression')
    }
  }

  if (loading) {
    return (
      <div className="bg-white flex items-center justify-center text-slate-500" style={{ minHeight: 'calc(100vh - 56px)' }}>
        Chargement des annonces...
      </div>
    )
  }

  return (
    <div className="flex flex-col bg-white" style={{ minHeight: 'calc(100vh - 56px)' }}>

      {/* Filtres */}
      <div className="border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 flex-1 min-w-[140px] max-w-[200px]">
          <span className="text-red-400 shrink-0">📍</span>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="outline-none bg-transparent text-sm w-full min-w-0"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {['Budget max', 'Colocataires', 'Ambiance'].map((f) => (
            <button key={f} className="border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-600 hover:bg-slate-50 transition whitespace-nowrap">
              {f} ▾
            </button>
          ))}
          <button className="border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-600 hover:bg-slate-50 transition whitespace-nowrap">
            🐾 Animaux
          </button>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          {/* Toggle carte sur mobile */}
          <button
            className="lg:hidden border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-600"
            onClick={() => setShowMap(!showMap)}
          >
            {showMap ? '📋 Liste' : '🗺️ Carte'}
          </button>
          <button className="bg-teal-400 text-[#0f1117] px-4 py-2 rounded-xl text-sm font-semibold hover:bg-teal-300 transition whitespace-nowrap">
            Rechercher
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Liste */}
        <div className={`flex-1 px-4 sm:px-6 py-5 overflow-y-auto ${showMap ? 'hidden lg:block' : ''}`}>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 mb-5">
            {listings.length} colocations disponibles à {city.split(',')[0]}
          </h1>

          {listings.length === 0 ? (
            <p className="text-slate-400 text-center py-20">Aucune annonce pour le moment.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {listings.map((listing, idx) => {
                const colorClass = CARD_COLORS[idx % CARD_COLORS.length]
                const matchScore = MATCH_SCORES[idx % MATCH_SCORES.length]
                const nbRooms = listing.roommates || 2
                const avatars = AVATARS.slice(0, Math.min(2, nbRooms))
                const isOwner = user && user.id === listing.userId

                return (
                  <div key={listing.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition">
                    <div className={`h-40 sm:h-44 bg-gradient-to-br ${colorClass} relative`}>
                      <span className="absolute top-3 left-3 bg-[#0f1117]/80 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {matchScore}% match
                      </span>
                      <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition">
                        <span className="text-slate-400 text-sm">♡</span>
                      </button>
                    </div>

                    <div className="p-4">
                      <p className="text-lg font-bold text-slate-900">
                        {listing.price} €{' '}
                        <span className="text-xs font-normal text-slate-400">CC/mois</span>
                      </p>
                      <p className="font-semibold text-slate-800 mt-0.5 truncate">{listing.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {listing.city} · {nbRooms} colocataires
                      </p>

                      <div className="flex items-center gap-1.5 mt-3">
                        {avatars.map((a, i) => (
                          <div key={i} className={`w-7 h-7 rounded-full ${a.color} flex items-center justify-center text-white text-xs font-bold border-2 border-white`}>
                            {a.initials}
                          </div>
                        ))}
                        <span className="text-xs text-slate-400 ml-1">
                          +{Math.max(0, nbRooms - avatars.length)} colocataire{nbRooms - avatars.length > 1 ? 's' : ''}
                        </span>
                      </div>

                      {isOwner && (
                        <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                          <button
                            onClick={() => navigate(`/edit-listing/${listing.id}`)}
                            className="flex-1 flex items-center justify-center py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-medium hover:bg-slate-200 transition"
                          >
                            <Edit className="w-3.5 h-3.5 mr-1" /> Modifier
                          </button>
                          <button
                            onClick={() => handleDelete(listing.id)}
                            className="flex-1 flex items-center justify-center py-2 bg-red-50 text-red-600 rounded-xl text-xs font-medium hover:bg-red-100 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5 mr-1" /> Supprimer
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Carte */}
        <div className={`
          bg-slate-100 border-l border-slate-200 flex-shrink-0 relative
          ${showMap ? 'flex-1 lg:w-[420px] lg:flex-none' : 'hidden lg:block lg:w-[420px]'}
        `}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-4xl mb-3">🗺️</p>
              <p className="text-slate-500 text-sm">Carte interactive</p>
              <p className="text-slate-400 text-xs mt-1">Intégration Mapbox / Google Maps</p>
            </div>
          </div>
          <div className="absolute top-[30%] left-[35%] bg-teal-400 text-[#0f1117] text-xs font-bold px-3 py-1.5 rounded-full shadow-md">650€</div>
          <div className="absolute top-[45%] right-[20%] bg-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-md border border-slate-200">720€</div>
          <div className="absolute top-[55%] right-[30%] bg-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-md border border-slate-200">580€</div>
          <div className="absolute bottom-[25%] right-[25%] bg-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-md border border-slate-200">610€</div>
        </div>
      </div>
    </div>
  )
}
