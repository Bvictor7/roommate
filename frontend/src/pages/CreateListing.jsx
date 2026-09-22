import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid #2A2723',
  background: '#F4EEE2',
  fontSize: 15,
  fontFamily: 'Karla, sans-serif',
  color: '#2A2723',
  outline: 'none',
  boxSizing: 'border-box',
}

const labelStyle = {
  display: 'block',
  fontSize: 14,
  fontWeight: 600,
  marginBottom: 6,
  fontFamily: 'Karla, sans-serif',
}

export default function CreateListing() {
  const [form, setForm] = useState({
    title: '', description: '', price: '', city: '',
    postalCode: '', availableDate: '', type: 'chambre',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.post('/listings', {
        title: form.title.trim(),
        description: form.description.trim(),
        city: form.city.trim(),
        postalCode: form.postalCode.trim(),
        price: parseFloat(form.price),
        availableDate: new Date(form.availableDate).toISOString(),
        type: form.type,
      })
      navigate('/listings')
    } catch {
      setError('Vérifiez les champs : titre (5+ car.) et description (20+ car.)')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ minHeight: 'calc(100vh - 56px)', background: '#F4EEE2', padding: '48px clamp(14px,3vw,34px)', fontFamily: 'Karla, system-ui, sans-serif', color: '#2A2723' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Newsreader, serif', fontWeight: 500, fontSize: 'clamp(28px,4vw,38px)', margin: '0 0 28px', letterSpacing: '-.02em' }}>
          Publier une annonce
        </h1>

        <div style={{ background: '#FBF7EE', border: '1px solid #2A2723', padding: 'clamp(20px,3vw,32px)' }}>
          {error && (
            <div role="alert" style={{ background: '#F5E8E5', border: '1px solid #B4472C', color: '#B4472C', fontSize: 14, padding: '10px 14px', marginBottom: 20 }}>
              {error}
            </div>
          )}

          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={labelStyle}>Titre <span style={{ color: '#6B655A', fontWeight: 400 }}>(min 5 car.)</span></label>
              <input type="text" required minLength="5" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Ex: Grande chambre lumineuse Paris 11e" style={inputStyle} />
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
              <label style={labelStyle}>Description <span style={{ color: '#6B655A', fontWeight: 400 }}>(min 20 car.)</span></label>
              <textarea required minLength="20" rows="4" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Décrivez votre logement, l'ambiance, les règles..." style={{ ...inputStyle, resize: 'vertical' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={labelStyle}>Ville</label>
                <input type="text" required value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} placeholder="Paris" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Code postal</label>
                <input type="text" required value={form.postalCode} onChange={e => setForm({ ...form, postalCode: e.target.value })} placeholder="75011" style={inputStyle} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={labelStyle}>Loyer (€/mois)</label>
                <input type="number" required value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="650" style={inputStyle} />
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
              <button onClick={handleSubmit} disabled={loading} style={{ flex: 1, padding: '12px 0', background: '#B4472C', color: '#F9F5EC', border: 'none', fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'Karla, sans-serif', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Publication...' : 'Mettre en ligne'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
