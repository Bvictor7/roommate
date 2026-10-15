import { useState, useEffect } from 'react'
import api from '../services/api'

const monoStyle = { fontFamily: "'Cutive Mono', monospace" }
const sectionTitleStyle = { fontFamily: 'Newsreader, serif', fontWeight: 600, fontSize: 'clamp(22px,2.6vw,30px)', letterSpacing: '-.015em', margin: 0 }
const thStyle = { ...monoStyle, fontSize: 12, fontWeight: 400, letterSpacing: '.1em', color: '#6B655A', textAlign: 'left', padding: '10px 12px', borderBottom: '1px solid #2A2723', whiteSpace: 'nowrap' }
const tdStyle = { padding: '12px', borderBottom: '1px solid #D4C9B8', fontSize: 15, verticalAlign: 'top' }
const pageButtonStyle = (disabled) => ({ fontSize: 15, fontWeight: 600, border: '1.5px solid #2A2723', padding: '7px 14px', background: 'transparent', color: '#2A2723', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1, fontFamily: 'Karla, sans-serif' })

function ErrorBox({ children }) {
  return <div role="alert" style={{ background: '#F5E8E5', border: '1px solid #B4472C', color: '#B4472C', fontSize: 14, padding: '10px 14px', marginTop: 16 }}>{children}</div>
}

function Loading() {
  return <p style={{ ...monoStyle, padding: '24px 0', color: '#6B655A', fontSize: 14, margin: 0 }}>Chargement...</p>
}

function UsersSection() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    api.get('/admin/users')
      .then(res => { if (!cancelled) setUsers(res.data) })
      .catch(() => { if (!cancelled) setError('Impossible de charger les utilisateurs') })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  return (
    <section aria-labelledby="admin-users">
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
        <h2 id="admin-users" style={sectionTitleStyle}>Utilisateurs</h2>
        {!loading && !error && <span style={{ ...monoStyle, fontSize: 14, color: '#6B655A' }}>{users.length}</span>}
      </div>
      {error && <ErrorBox>{error}</ErrorBox>}
      {loading ? <Loading /> : !error && (
        <div style={{ overflowX: 'auto', marginTop: 16, background: '#FBF7EE', border: '1px solid #2A2723' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640 }}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>NOM D'UTILISATEUR</th>
                <th style={thStyle}>EMAIL</th>
                <th style={thStyle}>RÔLE</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>ANNONCES</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td style={{ ...tdStyle, ...monoStyle, fontSize: 12, color: '#6B655A', wordBreak: 'break-all' }}>{u.id}</td>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{u.username}</td>
                  <td style={{ ...tdStyle, ...monoStyle, fontSize: 14 }}>{u.email}</td>
                  <td style={tdStyle}>
                    <span style={{ fontSize: 13, fontWeight: 700, padding: '2px 8px', border: `1px solid ${u.role === 'ADMIN' ? '#B4472C' : '#2A2723'}`, color: u.role === 'ADMIN' ? '#B4472C' : '#2A2723' }}>
                      {u.role}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, ...monoStyle, textAlign: 'right' }}>{u._count?.listings ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

function ListingsSection() {
  const [listings, setListings] = useState([])
  const [pagination, setPagination] = useState({ page: 1, total: 0, totalPages: 0 })
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    let cancelled = false
    api.get('/listings', { params: { page } })
      .then(res => {
        if (cancelled) return
        setListings(res.data.data)
        setPagination(res.data.pagination)
        setError('')
      })
      .catch(() => { if (!cancelled) setError('Impossible de charger les annonces') })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [page])

  const goToPage = (next) => {
    setLoading(true)
    setPage(next)
  }

  const handleDelete = async (listing) => {
    if (!window.confirm(`Supprimer l'annonce « ${listing.title} » de ${listing.user?.username ?? 'cet utilisateur'} ?`)) return
    setDeletingId(listing.id)
    try {
      await api.delete(`/admin/listings/${listing.id}`)
      setListings(prev => prev.filter(l => l.id !== listing.id))
      setPagination(prev => ({ ...prev, total: prev.total - 1 }))
      setError('')
    } catch {
      setError("Impossible de supprimer l'annonce")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <section aria-labelledby="admin-listings">
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
        <h2 id="admin-listings" style={sectionTitleStyle}>Annonces</h2>
        {!loading && <span style={{ ...monoStyle, fontSize: 14, color: '#6B655A' }}>{pagination.total}</span>}
      </div>
      {error && <ErrorBox>{error}</ErrorBox>}
      {loading ? <Loading /> : listings.length === 0 ? (
        <p style={{ fontFamily: 'Newsreader, serif', fontSize: 20, margin: '24px 0 0' }}>Aucune annonce.</p>
      ) : (
        <div style={{ marginTop: 16, background: '#FBF7EE', border: '1px solid #2A2723' }}>
          {listings.map((l, i) => (
            <div key={l.id} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', alignItems: 'center', padding: '14px 16px', borderTop: i === 0 ? 'none' : '1px solid #D4C9B8' }}>
              <div style={{ flex: '1 1 260px', minWidth: 0 }}>
                <p style={{ fontFamily: 'Newsreader, serif', fontSize: 19, fontWeight: 600, margin: 0 }}>{l.title}</p>
                <p style={{ ...monoStyle, fontSize: 13, color: '#6B655A', margin: '4px 0 0' }}>
                  {l.city.toUpperCase()} · {l.type.toUpperCase()} · {l.price} € · PAR {l.user?.username ?? '—'}
                </p>
              </div>
              <button
                onClick={() => handleDelete(l)}
                disabled={deletingId === l.id}
                style={{ fontSize: 15, fontWeight: 600, border: '1.5px solid #B4472C', padding: '7px 14px', background: 'transparent', cursor: deletingId === l.id ? 'wait' : 'pointer', color: '#B4472C', fontFamily: 'Karla, sans-serif', opacity: deletingId === l.id ? 0.5 : 1 }}
              >
                {deletingId === l.id ? 'Suppression...' : 'Supprimer'}
              </button>
            </div>
          ))}
        </div>
      )}
      {!loading && pagination.totalPages > 1 && (
        <nav aria-label="Pagination des annonces" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 18 }}>
          <button onClick={() => goToPage(page - 1)} disabled={page <= 1} style={pageButtonStyle(page <= 1)}>← Précédent</button>
          <span style={{ ...monoStyle, fontSize: 14, color: '#4A453C' }}>Page {pagination.page} / {pagination.totalPages}</span>
          <button onClick={() => goToPage(page + 1)} disabled={page >= pagination.totalPages} style={pageButtonStyle(page >= pagination.totalPages)}>Suivant →</button>
        </nav>
      )}
    </section>
  )
}

export default function Admin() {
  return (
    <main style={{ background: '#F4EEE2', fontFamily: 'Karla, system-ui, sans-serif', color: '#2A2723' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: 'clamp(18px,3vw,38px) clamp(14px,3vw,34px) clamp(44px,6vw,80px)' }}>
        <h1 style={{ fontFamily: 'Newsreader, serif', fontWeight: 500, fontSize: 'clamp(30px,4.6vw,56px)', letterSpacing: '-.025em', lineHeight: 1.02, margin: 0 }}>
          Administration
        </h1>
        <p style={{ margin: '12px 0 0', fontSize: 16, lineHeight: 1.5, color: '#4A453C' }}>
          Gestion des utilisateurs et des annonces.
        </p>

        <div style={{ height: 1, background: '#2A2723', margin: 'clamp(18px,3vw,28px) 0' }} />
        <UsersSection />

        <div style={{ height: 1, background: '#2A2723', margin: 'clamp(28px,4vw,44px) 0 clamp(18px,3vw,28px)' }} />
        <ListingsSection />
      </div>
    </main>
  )
}
