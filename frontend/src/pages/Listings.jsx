import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/useAuth'
import ListingsMap from '../components/ListingsMap'

const EMPTY_FILTERS = { city: '', maxPrice: '', type: '' }

const TYPES = [
  { value: '', label: 'Tous les types' },
  { value: 'chambre', label: 'Chambre' },
  { value: 'appartement', label: 'Appartement' },
  { value: 'maison', label: 'Maison' },
]

const filterInputStyle = { padding: '8px 10px', border: '1px solid #2A2723', background: '#FBF7EE', fontSize: 15, fontFamily: 'Karla, sans-serif', color: '#2A2723', outline: 'none', minWidth: 0 }
const pageButtonStyle = (disabled) => ({ fontSize: 15, fontWeight: 600, border: '1.5px solid #2A2723', padding: '7px 14px', background: 'transparent', color: '#2A2723', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1, fontFamily: 'Karla, sans-serif' })

export default function Listings() {
  const [listings, setListings] = useState([])
  const [pagination, setPagination] = useState({ page: 1, total: 0, totalPages: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState(EMPTY_FILTERS)
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [page, setPage] = useState(1)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    let cancelled = false
    // Seuls les filtres renseignés sont envoyés en query params
    const params = Object.fromEntries(Object.entries({ ...filters, page }).filter(([, v]) => v !== ''))
    api.get('/listings', { params })
      .then(res => {
        if (cancelled) return
        setListings(res.data.data)
        setPagination(res.data.pagination)
        setError('')
      })
      .catch(() => { if (!cancelled) setError('Impossible de charger les annonces') })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [filters, page])

  const applyFilters = (e) => {
    e.preventDefault()
    setLoading(true)
    setFilters({ city: form.city.trim(), maxPrice: form.maxPrice, type: form.type })
    setPage(1)
  }

  const resetFilters = () => {
    setLoading(true)
    setForm(EMPTY_FILTERS)
    setFilters(EMPTY_FILTERS)
    setPage(1)
  }

  const goToPage = (next) => {
    setLoading(true)
    setPage(next)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette annonce ?')) return
    try {
      await api.delete(`/listings/${id}`)
      setListings(prev => prev.filter(l => l.id !== id))
      setPagination(prev => ({ ...prev, total: prev.total - 1 }))
    } catch {
      setError("Impossible de supprimer l'annonce")
    }
  }

  const city = filters.city || listings[0]?.city || ''
  const hasFilters = Object.values(filters).some(v => v !== '')

  return (
    <div style={{ minHeight: '100vh', background: '#F4EEE2', fontFamily: 'Karla, system-ui, sans-serif', color: '#2A2723' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: 'clamp(18px,3vw,38px) clamp(14px,3vw,34px) clamp(44px,6vw,80px)' }}>

        {/* En-tête */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(16px,3vw,34px)', alignItems: 'flex-end' }}>
          <div style={{ flex: '1 1 320px', minWidth: 0 }}>
            <h1 style={{ fontFamily: 'Newsreader, serif', fontWeight: 500, fontSize: 'clamp(30px,4.6vw,56px)', letterSpacing: '-.025em', lineHeight: 1.02, margin: 0, maxWidth: '18ch' }}>
              Chambres libres{city && <> à <span style={{ fontStyle: 'italic' }}>{city}</span></>}
            </h1>
            <p style={{ margin: '12px 0 0', fontSize: 16, lineHeight: 1.5, color: '#4A453C', maxWidth: '44ch' }}>
              {pagination.total} annonce{pagination.total > 1 ? 's' : ''}{hasFilters ? ' correspondant à votre recherche' : ' publiée' + (pagination.total > 1 ? 's' : '')}.
            </p>
          </div>
          <form onSubmit={applyFilters} style={{ flex: '1 1 260px', minWidth: 0, display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'flex-end' }}>
            <input aria-label="Ville" placeholder="Ville" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} style={{ ...filterInputStyle, flex: '1 1 120px' }} />
            <input aria-label="Prix maximum" type="number" min="0" placeholder="Prix max (€)" value={form.maxPrice} onChange={e => setForm({ ...form, maxPrice: e.target.value })} style={{ ...filterInputStyle, flex: '1 1 110px' }} />
            <select aria-label="Type de logement" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} style={{ ...filterInputStyle, flex: '1 1 140px' }}>
              {TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
            <button type="submit" style={{ border: '1px solid #2A2723', background: '#2A2723', color: '#F4EEE2', fontSize: 15, fontWeight: 600, padding: '8px 14px', cursor: 'pointer', fontFamily: 'Karla, sans-serif' }}>Filtrer</button>
            {hasFilters && (
              <button type="button" onClick={resetFilters} style={{ border: '1px solid #2A2723', background: 'transparent', color: '#2A2723', fontSize: 15, fontWeight: 600, padding: '8px 14px', cursor: 'pointer', fontFamily: 'Karla, sans-serif' }}>Effacer</button>
            )}
          </form>
        </div>

        {error && <div role="alert" style={{ background: '#F5E8E5', border: '1px solid #B4472C', color: '#B4472C', fontSize: 14, padding: '10px 14px', marginTop: 16 }}>{error}</div>}

        {user && (
          <div style={{ marginTop: 16 }}>
            <Link to="/create-listing" style={{ background: '#B4472C', color: '#F4EEE2', fontSize: 15, fontWeight: 600, padding: '9px 18px', textDecoration: 'none', border: 'none' }}>
              + Publier une annonce
            </Link>
          </div>
        )}

        <div style={{ height: 1, background: '#2A2723', margin: 'clamp(18px,3vw,28px) 0 0' }} />

        {/* Carte interactive */}
        <div style={{ margin: 'clamp(18px,3vw,28px) 0' }}>
          <ListingsMap listings={listings} city={city} />
        </div>

        <div style={{ height: 1, background: '#2A2723', margin: '0 0 clamp(18px,3vw,28px)' }} />

        {/* Liste */}
        {loading ? (
          <p style={{ padding: '40px 0', color: '#6B655A', fontFamily: "'Cutive Mono', monospace", fontSize: 14 }}>Chargement...</p>
        ) : listings.length === 0 ? (
          <div style={{ padding: '48px 0', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Newsreader, serif', fontSize: 24, margin: 0 }}>{hasFilters ? 'Aucune annonce ne correspond à ces filtres.' : "Aucune annonce pour l'instant."}</p>
            {user && !hasFilters && <Link to="/create-listing" style={{ display: 'inline-block', marginTop: 16, background: '#B4472C', color: '#F4EEE2', fontSize: 15, fontWeight: 600, padding: '10px 20px', textDecoration: 'none' }}>Publier la première</Link>}
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
                      {user && user.id === l.user?.id && (
                        <>
                          <button onClick={() => navigate(`/edit-listing/${l.id}`)} style={{ fontSize: 15, fontWeight: 600, border: '1.5px solid #2A2723', padding: '7px 14px', background: 'transparent', cursor: 'pointer', color: '#2A2723' }}>Modifier</button>
                          <button onClick={() => handleDelete(l.id)} style={{ fontSize: 15, fontWeight: 600, border: '1.5px solid #B4472C', padding: '7px 14px', background: 'transparent', cursor: 'pointer', color: '#B4472C' }}>Supprimer</button>
                        </>
                      )}
                      {(!user || user.id !== l.user?.id) && (
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

        {!loading && pagination.totalPages > 1 && (
          <nav aria-label="Pagination" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 'clamp(18px,3vw,28px)' }}>
            <button onClick={() => goToPage(page - 1)} disabled={page <= 1} style={pageButtonStyle(page <= 1)}>← Précédent</button>
            <span style={{ fontFamily: "'Cutive Mono', monospace", fontSize: 14, color: '#4A453C' }}>Page {pagination.page} / {pagination.totalPages}</span>
            <button onClick={() => goToPage(page + 1)} disabled={page >= pagination.totalPages} style={pageButtonStyle(page >= pagination.totalPages)}>Suivant →</button>
          </nav>
        )}
      </div>
    </div>
  )
}
