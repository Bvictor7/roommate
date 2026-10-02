import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api'

const inputStyle = {
  width: '100%', padding: '10px 12px', border: '1px solid #2A2723',
  background: '#F4EEE2', fontSize: 15, fontFamily: 'Karla, sans-serif',
  color: '#2A2723', outline: 'none', boxSizing: 'border-box',
}
const labelStyle = { display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 6 }

export default function EditListing() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: '', description: '', price: '', city: '',
    postalCode: '', availableDate: '', type: 'chambre',
  })

  useEffect(() => {
    api.get(`/listings/${id}`)
      .then(res => {
        const d = res.data
        setForm({
          title: d.title, description: d.description, price: d.price,
          city: d.city, postalCode: d.postalCode, type: d.type,
          availableDate: d.availableDate ? d.availableDate.split('T')[0] : '',
        })
      })
      .catch(() => { alert("Impossible de charger l'annonce"); navigate('/listings') })
      .finally(() => setLoading(false))
  }, [id, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      await api.put(`/listings/${id}`, {
        ...form, price: parseFloat(form.price),
        availableDate: new Date(form.availableDate).toISOString(),
      })
      navigate('/listings')
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la modification')
    } finally { setSaving(false) }
  }

  if (loading) return (
    <div style={{ minHeight: 'calc(100vh - 56px)', background: '#F4EEE2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cutive Mono', monospace", fontSize: 14, color: '#6B655A' }}>
      Chargement...
    </div>
  )

  return (
    <main style={{ minHeight: 'calc(100vh - 56px)', background: '#F4EEE2', padding: '48px clamp(14px,3vw,34px)', fontFamily: 'Karla, system-ui, sans-serif', color: '#2A2723' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Newsreader, serif', fontWeight: 500, fontSize: 'clamp(28px,4vw,38px)', margin: '0 0 28px', letterSpacing: '-.02em' }}>
          Modifier l'annonce
        </h1>

        <div style={{ background: '#FBF7EE', border: '1px solid #2A2723', padding: 'clamp(20px,3vw,32px)' }}>
          {error && <div role="alert" style={{ background: '#F5E8E5', border: '1px solid #B4472C', color: '#B4472C', fontSize: 14, padding: '10px 14px', marginBottom: 20 }}>{error}</div>}

          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={labelStyle}>Titre</label>
              <input type="text" required minLength="5" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Type de logement</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} style={inputStyle}>
                <option value="chambre">Chambre</option>
                <option value="appartement">Appartement</option>
                <option value="maison">Maison</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Description</label>
              <textarea required minLength="20" rows="4" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={labelStyle}>Ville</label>
                <input type="text" required value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Code postal</label>
                <input type="text" required value={form.postalCode} onChange={e => setForm({ ...form, postalCode: e.target.value })} style={inputStyle} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={labelStyle}>Loyer (€/mois)</label>
                <input type="number" required value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Disponible le</label>
                <input type="date" required value={form.availableDate} onChange={e => setForm({ ...form, availableDate: e.target.value })} style={inputStyle} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <button type="button" onClick={() => navigate('/listings')} style={{ flex: 1, padding: '12px 0', background: 'transparent', border: '1.5px solid #2A2723', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'Karla, sans-serif', color: '#2A2723' }}>
                Annuler
              </button>
              <button onClick={handleSubmit} disabled={saving} style={{ flex: 1, padding: '12px 0', background: '#B4472C', color: '#F9F5EC', border: 'none', fontSize: 15, fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'Karla, sans-serif', opacity: saving ? 0.7 : 1 }}>
                {saving ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}