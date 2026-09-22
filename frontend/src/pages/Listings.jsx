import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

const filters = ['Toulouse', '≤ 500 €', 'Meublé', 'Dispo. en octobre', 'Animaux OK']

export default function Listings() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilters, setActiveFilters] = useState([])
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => { fetchListings() }, [])

  const fetchListings = async () => {
    try {
      const res = await api.get('/listings')
      setListings(Array.isArray(res.data) ? res.data : res.data?.listings || res.data?.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette annonce ?')) return
    try {
      await api.delete(`/listings/${id}`)
      setListings(listings.filter(l => l.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const toggleFilter = (f) => {
    setActiveFilters(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f])
  }

  const city = listings.length > 0 ? listings[0].city : 'France'

  return (
    <div style={{ minHeight: '100vh', background: '#F4EEE2', fontFamily: 'Karla, system-ui, sans-serif', color: '#2A2723' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: 'clamp(18px,3vw,38px) clamp(14px,3vw,34px) clamp(44px,6vw,80px)' }}>

        {/* En-tête */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(16px,3vw,34px)', alignItems: 'flex-end' }}>
          <div style={{ flex: '1 1 320px', minWidth: 0 }}>
            <h1 style={{ fontFamily: 'Newsreader, serif', fontWeight: 500, fontSize: 'clamp(30px,4.6vw,56px)', letterSpacing: '-.025em', lineHeight: 1.02, margin: 0, maxWidth: '18ch' }}>
              Chambres libres à <span style={{ fontStyle: 'italic' }}>{city}</span>
            </h1>
            <p style={{ margin: '12px 0 0', fontSize: 16, lineHeight: 1.5, color: '#4A453C', maxWidth: '44ch' }}>
              {listings.length} annonces publiées par des foyers qui utilisent déjà RoomMate.
            </p>
          </div>
          <div style={{ flex: '1 1 260px', minWidth: 0, display: 'flex', overflowX: 'auto', paddingBottom: 5 }}>
            <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => toggleFilter(f)}
                  style={{
                    flex: '0 0 auto', whiteSpace: 'nowrap',
                    border: '1px solid #2A2723',
                    background: activeFilters.includes(f) ? '#2A2723' : 'transparent',
                    color: activeFilters.includes(f) ? '#F4EEE2' : '#2A2723',
                    fontSize: 15, fontWeight: 600, padding: '8px 14px', cursor: 'pointer'
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {user && (
          <div style={{ marginTop: 16 }}>
            <Link to="/create-listing" style={{ background: '#B4472C', color: '#F4EEE2', fontSize: 15, fontWeight: 600, padding: '9px 18px', textDecoration: 'none', border: 'none' }}>
              + Publier une annonce
            </Link>
          </div>
        )}

        <div style={{ height: 1, background: '#2A2723', margin: 'clamp(18px,3vw,28px) 0 0' }} />

        {/* Liste */}
        {loading ? (
          <p style={{ padding: '40px 0', color: '#6B655A', fontFamily: "'Cutive Mono', monospace", fontSize: 14 }}>Chargement...</p>
        ) : listings.length === 0 ? (
          <div style={{ padding: '48px 0', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Newsreader, serif', fontSize: 24, margin: 0 }}>Aucune annonce pour l'instant.</p>
            {user && <Link to="/create-listing" style={{ display: 'inline-block', marginTop: 16, background: '#B4472C', color: '#F4EEE2', fontSize: 15, fontWeight: 600, padding: '10px 20px', textDecoration: 'none' }}>Publier la première</Link>}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 0 }}>
            {listings.map((l) => (
              <div key={l.id} style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(14px,2.4vw,28px)', alignItems: 'flex-start', padding: 'clamp(16px,2.6vw,26px) 0', borderBottom: '1px solid #C7C0AE' }}>
                {/* Photo placeholder */}
                <div style={{ flex: '1 1 240px', minWidth: 180, aspectRatio: '4/3', border: '1px solid #2A2723', background: 'repeating-linear-gradient(135deg,#E9E1D0 0 9px,#F4EEE2 9px 18px)', display: 'flex', alignItems: 'flex-end', padding: 10 }}>
                  <span style={{ fontFamily: "'Cutive Mono', monospace", fontSize: 12, color: '#4A453C', background: '#F4EEE2', padding: '2px 5px' }}>PHOTO — {l.type}</span>
                </div>

                {/* Contenu */}
                <div style={{ flex: '2.4 1 320px', minWidth: 0 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', alignItems: 'baseline' }}>
                    <h2 style={{ fontFamily: 'Newsreader, serif', fontWeight: 600, fontSize: 'clamp(21px,2.4vw,29px)', margin: 0, letterSpacing: '-.015em' }}>{l.title}</h2>
                    <span style={{ fontFamily: "'DotGothic16', monospace", fontSize: 'clamp(20px,2.2vw,25px)', marginLeft: 'auto', whiteSpace: 'nowrap' }}>{l.price} €</span>
                  </div>
                  <div style={{ fontFamily: "'Cutive Mono', monospace", fontSize: 14, color: '#6B655A', marginTop: 5 }}>
                    {l.city.toUpperCase()} · {l.type.toUpperCase()} {l.charges ? `· CHARGES ${l.charges} € INCL.` : ''}
                  </div>
                  <p style={{ margin: '10px 0 0', fontSize: 16, lineHeight: 1.5, maxWidth: '60ch' }}>{l.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 10px', marginTop: 12, alignItems: 'center' }}>
                    <span style={{ borderBottom: '1.5px solid #B4472C', fontSize: 14, fontWeight: 600, paddingBottom: 1 }}>{l.city}</span>
                    <span style={{ borderBottom: '1.5px solid #B4472C', fontSize: 14, fontWeight: 600, paddingBottom: 1 }}>{l.type}</span>
                    {l.postalCode && <span style={{ borderBottom: '1.5px solid #B4472C', fontSize: 14, fontWeight: 600, paddingBottom: 1 }}>{l.postalCode}</span>}

                    <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                      {user && user.id === l.userId && (
                        <>
                          <button onClick={() => navigate(`/edit-listing/${l.id}`)} style={{ fontSize: 15, fontWeight: 600, border: '1.5px solid #2A2723', padding: '7px 14px', background: 'transparent', cursor: 'pointer', color: '#2A2723' }}>Modifier</button>
                          <button onClick={() => handleDelete(l.id)} style={{ fontSize: 15, fontWeight: 600, border: '1.5px solid #B4472C', padding: '7px 14px', background: 'transparent', cursor: 'pointer', color: '#B4472C' }}>Supprimer</button>
                        </>
                      )}
                      {(!user || user.id !== l.userId) && (
                        <button style={{ fontSize: 15, fontWeight: 600, border: '1.5px solid #2A2723', padding: '7px 14px', background: 'transparent', cursor: 'pointer', color: '#2A2723' }}>
                          Écrire au foyer
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
