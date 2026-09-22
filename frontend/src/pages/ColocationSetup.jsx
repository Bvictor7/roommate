import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, Users, Copy, Check } from 'lucide-react'
import api from '../services/api'

export default function ColocationSetup() {
  const [mode, setMode] = useState('create')
  const [name, setName] = useState('')
  const [inviteCode, setInviteCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [createdCode, setCreatedCode] = useState('')
  const [copied, setCopied] = useState(false)
  const [joinedColocationName, setJoinedColocationName] = useState('')
  const navigate = useNavigate()

  const switchMode = (newMode) => {
    setMode(newMode)
    setError('')
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await api.post('/colocation', { name })
      setCreatedCode(res.data.inviteCode)
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création de la colocation')
    } finally {
      setLoading(false)
    }
  }

  const handleJoin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await api.post('/colocation/join', { inviteCode })
      const colocation = await api.get(`/colocation/${res.data.colocationId}`)
      setJoinedColocationName(colocation.data.name)
    } catch (err) {
      setError(err.response?.data?.message || 'Code d\'invitation invalide')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(createdCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (createdCode) {
    return (
      <main className="min-h-[calc(100vh-56px)] bg-[#0f1117] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white">Colocation créée !</h1>
            <p className="text-white/50 mt-2">Partagez ce code pour inviter vos colocataires</p>
          </div>

          <div className="bg-[#1a1d27] rounded-2xl border border-white/10 p-6 sm:p-8 space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-white/70">Code d'invitation</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm font-mono truncate">
                  {createdCode}
                </div>
                <button
                  onClick={handleCopy}
                  aria-label="Copier le code"
                  className="p-3 bg-white/5 border border-white/10 rounded-xl text-white/70 hover:text-white hover:border-teal-400 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                >
                  {copied ? <Check className="w-4 h-4 text-teal-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (joinedColocationName) {
    return (
      <main className="min-h-[calc(100vh-56px)] bg-[#0f1117] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white">Bienvenue !</h1>
            <p className="text-white/50 mt-2">Vous avez rejoint {joinedColocationName} !</p>
          </div>

          <div className="bg-[#1a1d27] rounded-2xl border border-white/10 p-6 sm:p-8">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full py-3 bg-teal-400 text-[#0f1117] rounded-xl font-bold hover:bg-teal-300 transition text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Aller au Dashboard
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-[calc(100vh-56px)] bg-[#0f1117] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">Votre colocation</h1>
          <p className="text-white/50 mt-2">Créez une colocation ou rejoignez-en une</p>
        </div>

        <div className="bg-[#1a1d27] rounded-2xl border border-white/10 p-6 sm:p-8 space-y-5">
          <div className="flex bg-white/5 rounded-xl p-1 gap-1">
            <button
              onClick={() => switchMode('create')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2 ${
                mode === 'create' ? 'bg-teal-400 text-[#0f1117]' : 'text-white/60 hover:text-white'
              }`}
            >
              <Home className="w-4 h-4" />
              Créer
            </button>
            <button
              onClick={() => switchMode('join')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2 ${
                mode === 'join' ? 'bg-teal-400 text-[#0f1117]' : 'text-white/60 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              Rejoindre
            </button>
          </div>

          {error && (
            <div role="alert" aria-live="polite" className="bg-red-500/10 text-red-400 text-sm p-4 rounded-xl border border-red-500/20">
              {error}
            </div>
          )}

          {mode === 'create' ? (
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-sm font-medium text-white/70">Nom de la colocation</label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 outline-none focus:border-teal-400 focus-visible:ring-2 focus-visible:ring-teal-400 transition text-sm"
                placeholder="Coloc Paris 11e"
              />
            </div>
          ) : (
            <div className="space-y-1.5">
              <label htmlFor="inviteCode" className="text-sm font-medium text-white/70">Code d'invitation</label>
              <input
                id="inviteCode"
                type="text"
                required
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 outline-none focus:border-teal-400 focus-visible:ring-2 focus-visible:ring-teal-400 transition text-sm"
                placeholder="Collez le code reçu"
              />
            </div>
          )}

          <button
            onClick={mode === 'create' ? handleCreate : handleJoin}
            disabled={loading}
            aria-busy={loading}
            className="w-full py-3 bg-teal-400 text-[#0f1117] rounded-xl font-bold hover:bg-teal-300 transition disabled:opacity-50 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {loading
              ? 'Chargement...'
              : mode === 'create' ? 'Créer ma colocation' : 'Rejoindre'}
          </button>
        </div>
      </div>
    </main>
  )
}
