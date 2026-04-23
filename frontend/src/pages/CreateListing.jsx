import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, MapPin, Euro, Calendar, AlignLeft, Layout } from 'lucide-react'
import api from '../services/api'

export default function CreateListing() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    city: '',
    postalCode: '',
    availableDate: '',
    type: 'chambre'
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem('token') 

      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        city: form.city.trim(),
        postalCode: form.postalCode.trim(), 
        price: parseInt(form.price, 10),
        availableDate: new Date(form.availableDate).toISOString(),
        type: form.type
      }

      await api.post('/listings', payload, {
        headers: { Authorization: `Bearer ${token}` }
      })

      navigate('/listings')
    } catch (err) {
      alert("Erreur : Vérifiez la longueur du titre (5+) et de la description (20+)")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 mb-8">Publier une annonce</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Titre (min 5 car.)</label>
            <div className="relative">
              <Home className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" required minLength="5"
                value={form.title}
                onChange={(e) => setForm({...form, title: e.target.value})}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Type de logement</label>
            <div className="relative">
              <Layout className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <select 
                value={form.type}
                onChange={(e) => setForm({...form, type: e.target.value})}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
              >
                <option value="chambre">Chambre</option>
                <option value="appartement">Appartement</option>
                <option value="maison">Maison</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Description (min 20 car.)</label>
            <textarea 
              required minLength="20" rows="3"
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
            <div className="relative">
              <Euro className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="number" placeholder="Loyer" required
                value={form.price}
                onChange={(e) => setForm({...form, price: e.target.value})}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="relative">
              <Calendar className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="date" required
                value={form.availableDate}
                onChange={(e) => setForm({...form, availableDate: e.target.value})}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition font-bold disabled:opacity-50"
          >
            {loading ? 'Publication...' : 'Mettre en ligne'}
          </button>
        </form>
      </div>
    </div>
  )
}