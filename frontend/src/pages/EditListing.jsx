import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MapPin, Euro, Calendar, Layout } from 'lucide-react'
import api from '../services/api'

export default function EditListing() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    city: '',
    postalCode: '',
    availableDate: '',
    type: 'chambre',
  })

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await api.get(`/listings/${id}`)
        const data = res.data
        setForm({
          title: data.title,
          description: data.description,
          price: data.price,
          city: data.city,
          postalCode: data.postalCode,
          type: data.type,
          availableDate: data.availableDate ? data.availableDate.split('T')[0] : '',
        })
      } catch {
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
    setError('')
    setSaving(true)
    try {
      const token = localStorage.getItem('token')
      await api.put(`/listings/${id}`, {
        ...form,
        price: parseFloat(form.price),
        availableDate: new Date(form.availableDate).toISOString(),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      })
      navigate('/listings')
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la modification')
    } finally {
      setSaving(false)
    }
  }

  const inputClass = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 outline-none focus:border-teal-400 transition text-sm"
  const labelClass = "text-sm font-medium text-white/70"

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-56px)] bg-[#0f1117] flex items-center justify-center text-white/50">
        Chargement...
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-56px)] bg-[#0f1117] px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-8">Modifier l'annonce</h1>

        <div className="bg-[#1a1d27] rounded-2xl border border-white/10 p-6 sm:p-8">
          {error && (
            <div className="bg-red-500/10 text-red-400 text-sm p-4 rounded-xl border border-red-500/20 mb-6">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div className="space-y-1.5">
              <label className={labelClass}>Titre</label>
              <input
                type="text"
                required
                minLength="5"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <label className={labelClass}>Type de logement</label>
              <div className="relative">
                <Layout className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className={`${inputClass} pl-10 appearance-none`}
                >
                  <option value="chambre" className="bg-[#1a1d27]">Chambre</option>
                  <option value="appartement" className="bg-[#1a1d27]">Appartement</option>
                  <option value="maison" className="bg-[#1a1d27]">Maison</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={labelClass}>Description</label>
              <textarea
                required
                minLength="20"
                rows="4"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className={labelClass}>Ville</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className={labelClass}>Code postal</label>
                <input
                  type="text"
                  required
                  value={form.postalCode}
                  onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className={labelClass}>Loyer CC (€/mois)</label>
                <div className="relative">
                  <Euro className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className={labelClass}>Disponible le</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    required
                    value={form.availableDate}
                    onChange={(e) => setForm({ ...form, availableDate: e.target.value })}
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate('/listings')}
                className="flex-1 py-3 bg-white/5 text-white/60 rounded-xl font-semibold hover:bg-white/10 transition text-sm border border-white/10"
              >
                Annuler
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="flex-1 py-3 bg-teal-400 text-[#0f1117] rounded-xl font-bold hover:bg-teal-300 transition disabled:opacity-50 text-sm"
              >
                {saving ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
