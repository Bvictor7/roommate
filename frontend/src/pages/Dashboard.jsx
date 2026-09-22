import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

const noiseUrl = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='w'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23w)' opacity='0.07'/%3E%3C/svg%3E"

export default function Dashboard() {
  const { user } = useAuth()
  const [colocation, setColocation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Onboarding
  const [showCreate, setShowCreate] = useState(false)
  const [showJoin, setShowJoin] = useState(false)
  const [colocName, setColocName] = useState('')
  const [inviteCode, setInviteCode] = useState('')

  // Forms
  const [newTask, setNewTask] = useState('')
  const [newNote, setNewNote] = useState('')
  const [newCourse, setNewCourse] = useState('')
  const [newExpense, setNewExpense] = useState({ amount: '', category: '', description: '' })
  const [showExpenseForm, setShowExpenseForm] = useState(false)

  useEffect(() => { fetchColocation() }, [])

  const fetchColocation = async () => {
    try {
      const res = await api.get('/colocation/me')
      setColocation(res.data)
    } catch (err) {
      if (err.response?.status !== 404) setError('Erreur de chargement')
    } finally {
      setLoading(false)
    }
  }

  const createColocation = async () => {
    if (!colocName.trim()) return
    try {
      const res = await api.post('/colocation', { name: colocName })
      setColocation(res.data)
      setShowCreate(false)
    } catch { setError('Erreur lors de la création') }
  }

  const joinColocation = async () => {
    if (!inviteCode.trim()) return
    try {
      await api.post('/colocation/join', { inviteCode })
      fetchColocation()
      setShowJoin(false)
    } catch { setError('Code invalide') }
  }

  const addTask = async () => {
    if (!newTask.trim() || !colocation) return
    try {
      const res = await api.post(`/colocation/${colocation.id}/tasks`, { title: newTask })
      setColocation({ ...colocation, tasks: [res.data, ...colocation.tasks] })
      setNewTask('')
    } catch { setError('Erreur') }
  }

  const toggleTask = async (task) => {
    try {
      const status = task.status === 'done' ? 'todo' : 'done'
      await api.patch(`/colocation/tasks/${task.id}`, { status })
      setColocation({ ...colocation, tasks: colocation.tasks.map(t => t.id === task.id ? { ...t, status } : t) })
    } catch { }
  }

  const deleteTask = async (id) => {
    try {
      await api.delete(`/colocation/tasks/${id}`)
      setColocation({ ...colocation, tasks: colocation.tasks.filter(t => t.id !== id) })
    } catch { }
  }

  const addCourse = async () => {
    if (!newCourse.trim() || !colocation) return
    try {
      const res = await api.post(`/colocation/${colocation.id}/groceries`, { name: newCourse })
      setColocation({ ...colocation, groceries: [res.data, ...colocation.groceries] })
      setNewCourse('')
    } catch { }
  }

  const toggleGrocery = async (item) => {
    try {
      await api.patch(`/colocation/groceries/${item.id}`, { isBought: !item.isBought })
      setColocation({ ...colocation, groceries: colocation.groceries.map(g => g.id === item.id ? { ...g, isBought: !g.isBought } : g) })
    } catch { }
  }

  const addExpense = async () => {
    if (!newExpense.amount || !newExpense.category || !colocation) return
    try {
      const res = await api.post(`/colocation/${colocation.id}/expenses`, { ...newExpense, paidBy: user?.username || 'Moi' })
      setColocation({ ...colocation, expenses: [res.data, ...colocation.expenses] })
      setNewExpense({ amount: '', category: '', description: '' })
      setShowExpenseForm(false)
    } catch { }
  }

  const deleteExpense = async (id) => {
    try {
      await api.delete(`/colocation/expenses/${id}`)
      setColocation({ ...colocation, expenses: colocation.expenses.filter(e => e.id !== id) })
    } catch { }
  }

  const totalExpenses = colocation?.expenses?.reduce((sum, e) => sum + e.amount, 0) || 0
  const partPerPerson = colocation?.members?.length > 0 ? totalExpenses / colocation.members.length : 0

  const now = new Date()
  const dateStr = now.toLocaleDateString('fr-FR', { weekday: 'long', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }).toUpperCase()

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#E9E1D0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cutive Mono', monospace", fontSize: 14, color: '#6B655A' }}>
      Chargement...
    </div>
  )

  // Onboarding
  if (!colocation) return (
    <main style={{ minHeight: '100vh', background: '#F4EEE2', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px clamp(14px,3vw,34px)', fontFamily: 'Karla, system-ui, sans-serif', color: '#2A2723' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <h1 style={{ fontFamily: 'Newsreader, serif', fontWeight: 500, fontSize: 'clamp(28px,4vw,38px)', margin: '0 0 6px', letterSpacing: '-.02em' }}>
          Bienvenue {user?.username}
        </h1>
        <p style={{ margin: '0 0 28px', fontSize: 16, color: '#6B655A' }}>Crée un foyer ou rejoins-en un pour commencer.</p>

        {error && <div style={{ background: '#F5E8E5', border: '1px solid #B4472C', color: '#B4472C', fontSize: 14, padding: '10px 14px', marginBottom: 16 }}>{error}</div>}

        {!showCreate && !showJoin && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button onClick={() => setShowCreate(true)} style={{ padding: '13px 0', background: '#B4472C', color: '#F9F5EC', fontSize: 16, fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: 'Karla, sans-serif' }}>
              Créer mon foyer
            </button>
            <button onClick={() => setShowJoin(true)} style={{ padding: '13px 0', background: 'transparent', color: '#2A2723', fontSize: 16, fontWeight: 600, border: '1.5px solid #2A2723', cursor: 'pointer', fontFamily: 'Karla, sans-serif' }}>
              Rejoindre avec un code
            </button>
          </div>
        )}

        {showCreate && (
          <div style={{ background: '#FBF7EE', border: '1px solid #2A2723', padding: 24 }}>
            <p style={{ margin: '0 0 12px', fontWeight: 600 }}>Nom du foyer</p>
            <input value={colocName} onChange={e => setColocName(e.target.value)} placeholder="Ex: Le Loft Vert" style={{ width: '100%', padding: '10px 12px', border: '1px solid #2A2723', background: '#F4EEE2', fontSize: 15, fontFamily: 'Karla, sans-serif', color: '#2A2723', outline: 'none', boxSizing: 'border-box', marginBottom: 12 }} />
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setShowCreate(false)} style={{ flex: 1, padding: '10px 0', background: 'transparent', border: '1px solid #2A2723', cursor: 'pointer', fontFamily: 'Karla, sans-serif', fontSize: 15 }}>Annuler</button>
              <button onClick={createColocation} style={{ flex: 1, padding: '10px 0', background: '#B4472C', color: '#F9F5EC', border: 'none', cursor: 'pointer', fontFamily: 'Karla, sans-serif', fontSize: 15, fontWeight: 700 }}>Créer</button>
            </div>
          </div>
        )}

        {showJoin && (
          <div style={{ background: '#FBF7EE', border: '1px solid #2A2723', padding: 24 }}>
            <p style={{ margin: '0 0 12px', fontWeight: 600 }}>Code d'invitation</p>
            <input value={inviteCode} onChange={e => setInviteCode(e.target.value)} placeholder="Colle le code ici" style={{ width: '100%', padding: '10px 12px', border: '1px solid #2A2723', background: '#F4EEE2', fontSize: 15, fontFamily: 'Karla, sans-serif', color: '#2A2723', outline: 'none', boxSizing: 'border-box', marginBottom: 12 }} />
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setShowJoin(false)} style={{ flex: 1, padding: '10px 0', background: 'transparent', border: '1px solid #2A2723', cursor: 'pointer', fontFamily: 'Karla, sans-serif', fontSize: 15 }}>Annuler</button>
              <button onClick={joinColocation} style={{ flex: 1, padding: '10px 0', background: '#B4472C', color: '#F9F5EC', border: 'none', cursor: 'pointer', fontFamily: 'Karla, sans-serif', fontSize: 15, fontWeight: 700 }}>Rejoindre</button>
            </div>
          </div>
        )}
      </div>
    </main>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#E9E1D0', backgroundImage: `url("${noiseUrl}")`, fontFamily: 'Karla, system-ui, sans-serif', color: '#2A2723' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: 'clamp(16px,3vw,34px) clamp(12px,2.4vw,30px) clamp(40px,6vw,72px)' }}>

        {/* Titre */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 18px', alignItems: 'baseline', marginBottom: 'clamp(14px,2.4vw,24px)' }}>
          <h1 style={{ fontFamily: 'Newsreader, serif', fontWeight: 500, fontSize: 'clamp(26px,3.6vw,42px)', letterSpacing: '-.02em', margin: 0 }}>
            Le mur de la cuisine
          </h1>
          <span style={{ fontFamily: "'Cutive Mono', monospace", fontSize: 14, color: '#6B655A' }}>
            {colocation.name.toUpperCase()} · {dateStr}
          </span>
        </div>

        {error && <div style={{ background: '#F5E8E5', border: '1px solid #B4472C', color: '#B4472C', fontSize: 14, padding: '10px 14px', marginBottom: 16 }}>{error}</div>}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(12px,2vw,24px)', alignItems: 'flex-start' }}>

          {/* Colonne gauche — Ticket dépenses */}
          <div style={{ flex: '1 1 400px', minWidth: 0, display: 'grid', gap: 'clamp(12px,2vw,20px)' }}>
            <div style={{ background: '#F7F2E2', padding: '0 clamp(15px,2.6vw,28px)', fontFamily: "'Cutive Mono', monospace", transform: 'rotate(-.4deg)', border: '1px solid #D4C9B8' }}>
              {/* Perforation haut */}
              <div style={{ height: 9, background: 'repeating-linear-gradient(-45deg,#E9E1D0 0 7px,transparent 7px 14px)', margin: '0 clamp(-15px,-2.6vw,-28px)' }} />
              <div style={{ padding: '18px 0 0', textAlign: 'center' }}>
                <div style={{ fontFamily: "'DotGothic16', monospace", fontSize: 'clamp(20px,2.6vw,26px)', letterSpacing: '.18em' }}>DEPENSES — {now.toLocaleDateString('fr-FR', { month: 'short' }).toUpperCase()}.</div>
                <div style={{ fontSize: 13, color: '#6B655A', marginTop: 4 }}>FOYER · {colocation.members.length} COLOCS</div>
              </div>
              <div style={{ borderTop: '1px dashed #B8B1A0', marginTop: 14 }} />

              {/* Qui doit quoi */}
              <div style={{ padding: '12px 0 0' }}>
                <div style={{ fontSize: 13, letterSpacing: '.1em', color: '#4A453C' }}>DERNIERES DEPENSES</div>
                {colocation.expenses.length === 0 ? (
                  <p style={{ fontSize: 14, color: '#6B655A', margin: '8px 0' }}>Aucune dépense enregistrée.</p>
                ) : (
                  colocation.expenses.slice(0, 8).map((e, i) => (
                    <div key={e.id} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto auto', gap: 10, alignItems: 'baseline', padding: '7px 0', borderBottom: '1px dotted #CFC8B6' }}>
                      <div style={{ minWidth: 0 }}>
                        <span style={{ fontSize: 16 }}>{e.category}</span>
                        <br />
                        <span style={{ fontSize: 13, color: '#6B655A' }}>avancé par {e.paidBy}</span>
                      </div>
                      <span style={{ fontFamily: "'DotGothic16', monospace", fontSize: 16, whiteSpace: 'nowrap' }}>{e.amount.toFixed(2)} €</span>
                      <button onClick={() => deleteExpense(e.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#B4472C', fontSize: 14, padding: 0 }}>✕</button>
                    </div>
                  ))
                )}
              </div>

              {/* Solde */}
              <div style={{ padding: '14px 0 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 10, alignItems: 'baseline' }}>
                  <span style={{ fontSize: 14, letterSpacing: '.1em' }}>TOTAL FOYER</span>
                  <span style={{ fontFamily: "'DotGothic16', monospace", fontSize: 'clamp(26px,4vw,36px)', color: '#2A2723', lineHeight: 1 }}>{totalExpenses.toFixed(2)} €</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 10, alignItems: 'baseline', marginTop: 4 }}>
                  <span style={{ fontSize: 14, letterSpacing: '.08em', color: '#4A453C' }}>PART PAR PERSONNE</span>
                  <span style={{ fontFamily: "'DotGothic16', monospace", fontSize: 17 }}>{partPerPerson.toFixed(2)} €</span>
                </div>
                <div style={{ borderTop: '2px solid #2A2723', marginTop: 6 }} />
                <div style={{ borderTop: '2px solid #2A2723', marginTop: 3 }} />

                {/* Ajouter dépense */}
                {!showExpenseForm ? (
                  <button onClick={() => setShowExpenseForm(true)} style={{ marginTop: 12, background: '#B4472C', color: '#F7F2E2', fontSize: 15, letterSpacing: '.06em', padding: '9px 16px', border: 'none', cursor: 'pointer', fontFamily: "'Cutive Mono', monospace" }}>
                    + AJOUTER
                  </button>
                ) : (
                  <div style={{ marginTop: 12, display: 'grid', gap: 8 }}>
                    <input value={newExpense.category} onChange={e => setNewExpense({ ...newExpense, category: e.target.value })} placeholder="Catégorie (ex: Courses)" style={{ padding: '8px 10px', border: '1px solid #2A2723', background: '#F4EEE2', fontSize: 14, fontFamily: "'Cutive Mono', monospace", outline: 'none' }} />
                    <input type="number" value={newExpense.amount} onChange={e => setNewExpense({ ...newExpense, amount: e.target.value })} placeholder="Montant (€)" style={{ padding: '8px 10px', border: '1px solid #2A2723', background: '#F4EEE2', fontSize: 14, fontFamily: "'Cutive Mono', monospace", outline: 'none' }} />
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => setShowExpenseForm(false)} style={{ flex: 1, padding: '8px 0', border: '1px solid #2A2723', background: 'transparent', cursor: 'pointer', fontFamily: "'Cutive Mono', monospace", fontSize: 13 }}>ANNULER</button>
                      <button onClick={addExpense} style={{ flex: 1, padding: '8px 0', background: '#B4472C', color: '#F7F2E2', border: 'none', cursor: 'pointer', fontFamily: "'Cutive Mono', monospace", fontSize: 13 }}>VALIDER</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Code invitation */}
              <div style={{ borderTop: '1px dashed #B8B1A0', margin: '18px 0 0' }} />
              <div style={{ textAlign: 'center', fontSize: 12, color: '#6B655A', padding: '10px 0 0' }}>CODE D'INVITATION</div>
              <div style={{ fontFamily: "'DotGothic16', monospace", fontSize: 11, letterSpacing: '.15em', textAlign: 'center', color: '#4A453C', padding: '6px 0 0', wordBreak: 'break-all' }}>
                {colocation.inviteCode}
              </div>
              <div style={{ height: 9, background: 'repeating-linear-gradient(45deg,#E9E1D0 0 7px,transparent 7px 14px)', margin: '14px clamp(-15px,-2.6vw,-28px) 0' }} />
            </div>

            {/* Liste de courses */}
            <div style={{ background: '#F7F2E2', border: '1px solid #2A2723', padding: 'clamp(14px,2.2vw,22px)' }}>
              <div style={{ fontFamily: 'Newsreader, serif', fontSize: 21, fontWeight: 600, marginBottom: 12 }}>Liste de courses</div>
              {colocation.groceries.map(g => (
                <div key={g.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderBottom: '1px dotted #CFC8B6' }}>
                  <button onClick={() => toggleGrocery(g)} style={{ width: 20, height: 20, border: '1.5px solid #2A2723', background: g.isBought ? '#2A2723' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {g.isBought && <span style={{ color: '#F4EEE2', fontSize: 12 }}>✓</span>}
                  </button>
                  <span style={{ flex: 1, fontSize: 16, textDecoration: g.isBought ? 'line-through' : 'none', color: g.isBought ? '#9A9489' : '#2A2723' }}>{g.name}</span>
                </div>
              ))}
              {colocation.groceries.length === 0 && <p style={{ fontSize: 14, color: '#6B655A', margin: '8px 0' }}>Liste vide.</p>}
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <input value={newCourse} onChange={e => setNewCourse(e.target.value)} onKeyDown={e => e.key === 'Enter' && addCourse()} placeholder="Ajouter un article..." style={{ flex: 1, padding: '8px 10px', border: '1px solid #2A2723', background: '#F4EEE2', fontSize: 14, fontFamily: 'Karla, sans-serif', outline: 'none' }} />
                <button onClick={addCourse} style={{ padding: '8px 14px', background: '#2A2723', color: '#F4EEE2', border: 'none', cursor: 'pointer', fontSize: 14 }}>+</button>
              </div>
            </div>
          </div>

          {/* Colonne droite — Tableau ménage + notes */}
          <div style={{ flex: '1 1 320px', minWidth: 0, display: 'grid', gap: 'clamp(12px,2vw,22px)' }}>

            {/* Tableau à la craie */}
            <div style={{ background: '#25332C', border: '6px solid #7A5A33', padding: 'clamp(16px,2.6vw,26px)', color: '#EFEAD9', transform: 'rotate(.5deg)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'Caveat, cursive', fontSize: 'clamp(26px,3vw,34px)', lineHeight: 1 }}>Tâches — semaine</span>
                <span style={{ fontFamily: 'Caveat, cursive', fontSize: 20, color: '#B9C3B4' }}>{colocation.tasks.filter(t => t.status === 'done').length} / {colocation.tasks.length}</span>
              </div>
              <div style={{ height: 1, background: 'rgba(239,234,217,.4)', margin: '12px 0' }} />

              {colocation.tasks.length === 0 && (
                <p style={{ fontFamily: 'Caveat, cursive', fontSize: 20, color: '#B9C3B4', margin: 0 }}>Aucune tâche — ajoutez-en ci-dessous.</p>
              )}

              {colocation.tasks.map(t => (
                <div key={t.id} style={{ display: 'grid', gridTemplateColumns: '22px minmax(0,1fr) auto', gap: 10, alignItems: 'baseline', color: t.status === 'done' ? '#A9B3A5' : '#F0B49C', marginBottom: 8 }}>
                  <button onClick={() => toggleTask(t)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', fontFamily: 'Caveat, cursive', fontSize: 22, padding: 0, lineHeight: 1 }}>
                    {t.status === 'done' ? '✕' : '☐'}
                  </button>
                  <span style={{ fontFamily: 'Caveat, cursive', fontSize: 'clamp(18px,2.2vw,22px)', textDecoration: t.status === 'done' ? 'line-through' : 'none', minWidth: 0 }}>{t.title}</span>
                  <button onClick={() => deleteTask(t.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7A66', fontSize: 14, padding: 0 }}>✕</button>
                </div>
              ))}

              <div style={{ height: 1, background: 'rgba(239,234,217,.4)', margin: '12px 0 10px' }} />
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  value={newTask}
                  onChange={e => setNewTask(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addTask()}
                  placeholder="Nouvelle tâche..."
                  style={{ flex: 1, padding: '6px 10px', background: 'rgba(255,255,255,.1)', border: '1px solid rgba(239,234,217,.3)', color: '#EFEAD9', fontSize: 16, fontFamily: 'Caveat, cursive', outline: 'none' }}
                />
                <button onClick={addTask} style={{ padding: '6px 14px', background: '#E3B44A', color: '#2A2723', border: 'none', cursor: 'pointer', fontFamily: 'Caveat, cursive', fontSize: 18 }}>+</button>
              </div>

              {colocation.tasks.length > 0 && (
                <div style={{ fontFamily: 'Karla, sans-serif', fontSize: 13, color: '#D89A7E', marginTop: 10 }}>
                  En rouge : tâche en retard.
                </div>
              )}
            </div>

            {/* Post-its membres */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(10px,1.8vw,16px)' }}>
              {colocation.members.map((m, i) => {
                const colors = [
                  { bg: '#E3B44A', border: '#9E7A22', rot: '-1.4deg' },
                  { bg: '#E8C766', border: '#A8892E', rot: '1deg' },
                  { bg: '#DFAE44', border: '#96741F', rot: '-.6deg' },
                  { bg: '#D4A73C', border: '#8B6518', rot: '1.2deg' },
                ]
                const c = colors[i % colors.length]
                return (
                  <div key={m.id} style={{ flex: '1 1 220px', minWidth: 0, background: c.bg, border: `1px solid ${c.border}`, padding: '14px 15px 16px', transform: `rotate(${c.rot})` }}>
                    <div style={{ fontFamily: 'Caveat, cursive', fontSize: 'clamp(19px,2vw,22px)', lineHeight: 1.25, color: '#3A2E0E' }}>
                      {m.user.username}
                    </div>
                    <div style={{ fontFamily: 'Caveat, cursive', fontSize: 17, color: '#5A4814', marginTop: 8 }}>
                      — {m.role === 'admin' ? 'admin du foyer' : 'membre'}
                    </div>
                  </div>
                )
              })}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
