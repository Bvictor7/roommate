import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Home, MapPin, Euro, Calendar, AlignLeft, Layout } from 'lucide-react'
import api from '../services/api'

export default function EditListing() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    city: '',
    postalCode: '',
    availableDate: '',
    type: 'chambre'
  })

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await api.get(`/listings/${id}`)
        const data = res.data
        const formattedDate = data.availableDate ? data.availableDate.split('T')[0] : ''
        
        setForm({
          title: data.title,
          description: data.description,
          price: data.price,
          city: data.city,
          postalCode: data.postalCode,
          type: data.type,
          availableDate: formattedDate
        })
      } catch (err) {
        alert("Impossible de charger l'annonce")
        navigate('/listings')
      } finally {
        setLoading(false)
      }
    }
    fetchListing()
  }, [id, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      await api.put(`/listings/${id}`, {
        ...form,
        price: parseFloat(form.price),
        availableDate: new Date(form.availableDate).toISOString()
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      navigate('/listings')
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de la modification")
    }
  }

  if (loading) return <div className="text-center py-20">Chargement...</div>

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 mb-8">Modifier l'annonce</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Titre</label>
            <input 
              type="text" required minLength="5"
              value={form.title}
              onChange={(e) => setForm({...form, title: e.target.value})}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Type</label>
            <select 
              value={form.type}
              onChange={(e) => setForm({...form, type: e.target.value})}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="chambre">Chambre</option>
              <option value="appartement">Appartement</option>
              <option value="maison">Maison</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Description</label>
            <textarea 
              required minLength="20" rows="4"
              value={form.description}
              onChange={(e) => setForm({...form, description: e.target.value})}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input 
              type="text" placeholder="Ville" required
              value={form.city}
              onChange={(e) => setForm({...form, city: e.target.value})}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input 
              type="text" placeholder="Code Postal" required
              value={form.postalCode}
              onChange={(e) => setForm({...form, postalCode: e.target.value})}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input 
              type="number" placeholder="Prix" required
              value={form.price}
              onChange={(e) => setForm({...form, price: e.target.value})}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input 
              type="date" required
              value={form.availableDate}
              onChange={(e) => setForm({...form, availableDate: e.target.value})}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex gap-4">
            <button 
              type="button" onClick={() => navigate('/listings')}
              className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition"
            >
              Annuler
            </button>
            <button 
              type="submit"
              className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}