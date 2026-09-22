import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function ColocationSetup() {
  const [mode, setMode] = useState('create')
  const [name, setName] = useState('')
  const [inviteCode, setInviteCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [createdCode, setCreatedCode] = useState('')
  const [copied, setCopied] = useState(false)
  const navigate = useNavigate()

  const handleCreate = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await api.post('/colocation', { name })
      setCreatedCode(res.data.inviteCode)
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création')
    } finally {
      setLoading(false)
    }
  }

  const handleJoin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.post('/colocation/join', { inviteCode })
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Code invalide')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(createdCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main style={{ minHeight: 'calc(100vh - 56px)', background: '#F4EEE2', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px clamp(14px,3vw,34px)', fontFamily: 'Karla, system-ui, sans-serif', color: '#2A2723' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <h1 style={{ fontFamily: 'Newsreader, serif', fontWeight: 500, fontSize: 'clamp(28px,4vw,38px)', margin: '0 0 6px', letterSpacing: '-.02em' }}>
          Votre colocation
        </h1>
        <p style={{ margin: '0 0 28px', fontSize: 16, color: '#6B655A' }}>Créez une colocation ou rejoignez-en une</p>

        <div style={{ background: '#FBF7EE', border: '1px solid #2A2723', padding: 'clamp(20px,3vw,32px)' }}>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 0, marginBottom: 24 }}>
            <button
              onClick={() => setMode('create')}
              style={{ flex: 1, padding: '10px 0', background: mode === 'create' ? '#2A2723' : 'transparent', color: mode === 'create' ? '#F4EEE2' : '#2A2723', border: '1px solid #2A2723', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'Karla, sans-serif' }}
            >
              Créer
            </button>
            <button
              onClick={() => setMode('join')}
              style={{ flex: 1, padding: '10px 0', background: mode === 'join' ? '#2A2723' : 'transparent', color: mode === 'join' ? '#F4EEE2' : '#2A2723', border: '1px solid #2A2723', borderLeft: 'none', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'Karla, sans-serif' }}
            >
              Rejoindre
            </button>
          </div>

          {error && (
            <div role="alert" style={{ background: '#F5E8E5', border: '1px solid #B4472C', color: '#B4472C', fontSize: 14, padding: '10px 14px', marginBottom: 16 }}>
              {error}
            </div>
          )}

          {/* Code créé */}
          {createdCode ? (
            <div>
              <p style={{ fontSize: 15, marginBottom: 16, lineHeight: 1.5 }}>
                Foyer créé ! Partagez ce code avec vos colocataires :
              </p>
              <div style={{ background: '#F4EEE2', border: '1px solid #2A2723', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
                <span style={{ fontFamily: "'Cutive Mono', monospace", fontSize: 14, wordBreak: 'break-all', color: '#2A2723' }}>{createdCode}</span>
                <button onClick={handleCopy} style={{ background: copied ? '#1F4438' : '#2A2723', color: '#F4EEE2', border: 'none', padding: '8px 14px', cursor: 'pointer', fontSize: 13, fontFamily: 'Karla, sans-serif', flexShrink: 0 }}>
                  {copied ? '✓ Copié' : 'Copier'}
                </button>
              </div>
              <button onClick={() => navigate('/dashboard')} style={{ width: '100%', padding: '12px 0', background: '#B4472C', color: '#F9F5EC', fontSize: 16, fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: 'Karla, sans-serif' }}>
                Accéder au foyer
              </button>
            </div>
          ) : mode === 'create' ? (
            <form onSubmit={handleCreate}>
              <div style={{ marginBottom: 20 }}>
                <label htmlFor="name" style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Nom de la colocation</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Ex: Coloc Paris 11e"
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #2A2723', background: '#F4EEE2', fontSize: 15, fontFamily: 'Karla, sans-serif', color: '#2A2723', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px 0', background: '#B4472C', color: '#F9F5EC', fontSize: 16, fontWeight: 700, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'Karla, sans-serif', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Création...' : 'Créer ma colocation'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleJoin}>
              <div style={{ marginBottom: 20 }}>
                <label htmlFor="code" style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Code d'invitation</label>
                <input
                  id="code"
                  type="text"
                  required
                  value={inviteCode}
                  onChange={e => setInviteCode(e.target.value)}
                  placeholder="Collez le code ici"
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #2A2723', background: '#F4EEE2', fontSize: 15, fontFamily: 'Karla, sans-serif', color: '#2A2723', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px 0', background: '#B4472C', color: '#F9F5EC', fontSize: 16, fontWeight: 700, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'Karla, sans-serif', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Connexion...' : 'Rejoindre le foyer'}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
