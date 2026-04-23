import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Euro, Calendar, Home, Trash2, Edit } from 'lucide-react'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function Listings() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
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
      console.error("Erreur chargement annonces:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette annonce ?")) return

    try {
      const token = localStorage.getItem('token')
      await api.delete(`/listings/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setListings(listings.filter(l => l.id !== id))
    } catch (err) {
      alert("Erreur lors de la suppression")
    }
  }

  if (loading) return <div className="text-center py-20">Chargement des annonces...</div>

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Annonces disponibles</h1>
      
      {listings.length === 0 ? (
        <p className="text-slate-500 text-center py-10">Aucune annonce pour le moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div key={listing.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-slate-900">{listing.title}</h2>
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-semibold uppercase">
                    {listing.type}
                  </span>
                </div>
                
                <p className="text-slate-600 text-sm mb-6 line-clamp-2">{listing.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center text-slate-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{listing.city} ({listing.postalCode})</span>
                  </div>
                  <div className="flex items-center text-indigo-600 font-bold">
                    <Euro className="w-4 h-4 mr-2" />
                    <span>{listing.price} € / mois</span>
                  </div>
                </div>

                {user && user.id === listing.userId && (
                  <div className="flex gap-2 mt-6 pt-6 border-t border-slate-100">
                    <button 
                      onClick={() => navigate(`/edit-listing/${listing.id}`)}
                      className="flex-1 flex items-center justify-center py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200 transition"
                    >
                      <Edit className="w-4 h-4 mr-2" /> Modifier
                    </button>
                    <button 
                      onClick={() => handleDelete(listing.id)}
                      className="flex-1 flex items-center justify-center py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition"
                    >
                      <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}