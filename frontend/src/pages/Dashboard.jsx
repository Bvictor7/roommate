import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

const navItems = [
  { icon: '⊞', label: 'Tableau de bord', path: '/dashboard' },
  { icon: '✓', label: 'Tâches & Chores', path: '/dashboard/taches' },
  { icon: '€', label: 'Comptes & Dépenses', path: '/dashboard/comptes' },
  { icon: '🛒', label: 'Liste de courses', path: '/dashboard/courses' },
  { icon: '💬', label: 'Messagerie', path: '/dashboard/messagerie' },
  { icon: '⚙', label: 'Paramètres', path: '/dashboard/parametres' },
]

export default function Dashboard() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [colocation, setColocation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Création/rejoindre colocation
  const [showCreate, setShowCreate] = useState(false)
  const [showJoin, setShowJoin] = useState(false)
  const [colocName, setColocName] = useState('')
  const [inviteCode, setInviteCode] = useState('')

  // Tâches
  const [newTask, setNewTask] = useState('')
  // Courses
  const [newCourse, setNewCourse] = useState('')
  // Dépenses
  const [newExpense, setNewExpense] = useState({ amount: '', category: '', description: '' })
  const [showExpenseForm, setShowExpenseForm] = useState(false)

  useEffect(() => {
    fetchColocation()
  }, [])

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
      setColocation({
        ...colocation,
        tasks: colocation.tasks.map(t => t.id === task.id ? { ...t, status } : t)
      })
    } catch { setError('Erreur') }
  }

  const deleteTask = async (id) => {
    try {
      await api.delete(`/colocation/tasks/${id}`)
      setColocation({ ...colocation, tasks: colocation.tasks.filter(t => t.id !== id) })
    } catch { setError('Erreur') }
  }

  const addCourse = async () => {
    if (!newCourse.trim() || !colocation) return
    try {
      const res = await api.post(`/colocation/${colocation.id}/groceries`, { name: newCourse })
      setColocation({ ...colocation, groceries: [res.data, ...colocation.groceries] })
      setNewCourse('')
    } catch { setError('Erreur') }
  }

  const toggleGrocery = async (item) => {
    try {
      await api.patch(`/colocation/groceries/${item.id}`, { isBought: !item.isBought })
      setColocation({
        ...colocation,
        groceries: colocation.groceries.map(g => g.id === item.id ? { ...g, isBought: !g.isBought } : g)
      })
    } catch { setError('Erreur') }
  }

  const deleteGrocery = async (id) => {
    try {
      await api.delete(`/colocation/groceries/${id}`)
      setColocation({ ...colocation, groceries: colocation.groceries.filter(g => g.id !== id) })
    } catch { setError('Erreur') }
  }

  const addExpense = async () => {
    if (!newExpense.amount || !newExpense.category || !colocation) return
    try {
      const res = await api.post(`/colocation/${colocation.id}/expenses`, {
        ...newExpense,
        paidBy: user?.username || 'Moi'
      })
      setColocation({ ...colocation, expenses: [res.data, ...colocation.expenses] })
      setNewExpense({ amount: '', category: '', description: '' })
      setShowExpenseForm(false)
    } catch { setError('Erreur') }
  }

  const deleteExpense = async (id) => {
    try {
      await api.delete(`/colocation/expenses/${id}`)
      setColocation({ ...colocation, expenses: colocation.expenses.filter(e => e.id !== id) })
    } catch { setError('Erreur') }
  }

  const initials = (name) => name?.slice(0, 2).toUpperCase() || '?'
  const colors = ['bg-teal-700', 'bg-purple-700', 'bg-blue-700', 'bg-emerald-700', 'bg-rose-700']

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <p className="text-slate-500">Chargement...</p>
    </div>
  )

  // Pas de colocation → onboarding
  if (!colocation) return (
    <main className="min-h-screen bg-[#0f1117] flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-white mb-2">Bienvenue {user?.username} 👋</h1>
        <p className="text-white/50 mb-8">Rejoins ou crée une colocation pour commencer.</p>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        {!showCreate && !showJoin && (
          <div className="flex flex-col gap-3">
            <button onClick={() => setShowCreate(true)} className="w-full py-3 bg-teal-400 text-[#0f1117] rounded-xl font-bold hover:bg-teal-300 transition">
              Créer une colocation
            </button>
            <button onClick={() => setShowJoin(true)} className="w-full py-3 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition">
              Rejoindre avec un code
            </button>
          </div>
        )}

        {showCreate && (
          <div className="bg-[#1a1d27] rounded-2xl border border-white/10 p-6 space-y-4">
            <h2 className="text-white font-bold">Nom de la colocation</h2>
            <input
              type="text"
              value={colocName}
              onChange={e => setColocName(e.target.value)}
              placeholder="Ex: Le Loft Vert"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 outline-none focus:border-teal-400"
            />
            <div className="flex gap-3">
              <button onClick={() => setShowCreate(false)} className="flex-1 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition">Annuler</button>
              <button onClick={createColocation} className="flex-1 py-2 bg-teal-400 text-[#0f1117] rounded-xl font-bold hover:bg-teal-300 transition">Créer</button>
            </div>
          </div>
        )}

        {showJoin && (
          <div className="bg-[#1a1d27] rounded-2xl border border-white/10 p-6 space-y-4">
            <h2 className="text-white font-bold">Code d'invitation</h2>
            <input
              type="text"
              value={inviteCode}
              onChange={e => setInviteCode(e.target.value)}
              placeholder="Colle le code ici"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 outline-none focus:border-teal-400"
            />
            <div className="flex gap-3">
              <button onClick={() => setShowJoin(false)} className="flex-1 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition">Annuler</button>
              <button onClick={joinColocation} className="flex-1 py-2 bg-teal-400 text-[#0f1117] rounded-xl font-bold hover:bg-teal-300 transition">Rejoindre</button>
            </div>
          </div>
        )}
      </div>
    </main>
  )

  return (
    <div className="flex bg-slate-50 overflow-hidden" style={{ minHeight: 'calc(100vh - 56px)' }}>

      {sidebarOpen && (
        <div role="presentation" className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside
        aria-label="Navigation du dashboard"
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 flex flex-col transform transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{ top: '56px', height: 'calc(100vh - 56px)' }}
      >
        <div className="px-4 py-3 border-b border-slate-100">
          <div className="flex items-center justify-between bg-slate-50 rounded-xl px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-400 flex items-center justify-center text-xs font-bold text-white">
                {initials(colocation.name)}
              </div>
              <span className="text-sm font-medium text-slate-700">{colocation.name}</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              aria-current={location.pathname === item.path ? 'page' : undefined}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition ${location.pathname === item.path ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="px-4 py-3 border-t border-slate-100">
          <p className="text-xs text-slate-400 mb-1">Code d'invitation</p>
          <p className="text-xs font-mono text-teal-600 break-all">{colocation.inviteCode}</p>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} aria-label="Ouvrir le menu" className="text-slate-600">☰</button>
          <span className="font-semibold text-slate-800">{colocation.name}</span>
        </div>

        {error && <div className="m-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm">{error}</div>}

        <div className="p-4 sm:p-6 space-y-6 max-w-4xl mx-auto">

          {/* Membres */}
          <section>
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Colocataires</h2>
            <div className="flex flex-wrap gap-3">
              {colocation.members.map((m, i) => (
                <div key={m.id} className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-slate-200">
                  <div className={`w-7 h-7 rounded-full ${colors[i % colors.length]} flex items-center justify-center text-xs font-bold text-white`}>
                    {initials(m.user.username)}
                  </div>
                  <span className="text-sm text-slate-700">{m.user.username}</span>
                  {m.role === 'admin' && <span className="text-xs text-teal-600 font-medium">admin</span>}
                </div>
              ))}
            </div>
          </section>

          {/* Tâches */}
          <section>
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Tâches</h2>
            <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100">
              {colocation.tasks.length === 0 && (
                <p className="text-slate-400 text-sm px-4 py-3">Aucune tâche</p>
              )}
              {colocation.tasks.map(t => (
                <div key={t.id} className="flex items-center gap-3 px-4 py-3">
                  <button onClick={() => toggleTask(t)} className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${t.status === 'done' ? 'bg-teal-400 border-teal-400 text-white' : 'border-slate-300'}`}>
                    {t.status === 'done' && <span className="text-xs">✓</span>}
                  </button>
                  <span className={`flex-1 text-sm ${t.status === 'done' ? 'line-through text-slate-400' : 'text-slate-700'}`}>{t.title}</span>
                  <button onClick={() => deleteTask(t.id)} className="text-slate-300 hover:text-red-400 text-xs transition">✕</button>
                </div>
              ))}
              <div className="flex gap-2 px-4 py-3">
                <input
                  type="text"
                  value={newTask}
                  onChange={e => setNewTask(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addTask()}
                  placeholder="Ajouter une tâche..."
                  className="flex-1 text-sm outline-none text-slate-700 placeholder-slate-300"
                />
                <button onClick={addTask} className="text-teal-500 text-sm font-medium hover:text-teal-600 transition">+ Ajouter</button>
              </div>
            </div>
          </section>

          {/* Courses */}
          <section>
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Liste de courses</h2>
            <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100">
              {colocation.groceries.length === 0 && (
                <p className="text-slate-400 text-sm px-4 py-3">Liste vide</p>
              )}
              {colocation.groceries.map(g => (
                <div key={g.id} className="flex items-center gap-3 px-4 py-3">
                  <button onClick={() => toggleGrocery(g)} className={`w-5 h-5 rounded border-2 flex items-center justify-center transition ${g.isBought ? 'bg-teal-400 border-teal-400 text-white' : 'border-slate-300'}`}>
                    {g.isBought && <span className="text-xs">✓</span>}
                  </button>
                  <span className={`flex-1 text-sm ${g.isBought ? 'line-through text-slate-400' : 'text-slate-700'}`}>{g.name}</span>
                  <button onClick={() => deleteGrocery(g.id)} className="text-slate-300 hover:text-red-400 text-xs transition">✕</button>
                </div>
              ))}
              <div className="flex gap-2 px-4 py-3">
                <input
                  type="text"
                  value={newCourse}
                  onChange={e => setNewCourse(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addCourse()}
                  placeholder="Ajouter un article..."
                  className="flex-1 text-sm outline-none text-slate-700 placeholder-slate-300"
                />
                <button onClick={addCourse} className="text-teal-500 text-sm font-medium hover:text-teal-600 transition">+ Ajouter</button>
              </div>
            </div>
          </section>

          {/* Dépenses */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Dépenses</h2>
              <button onClick={() => setShowExpenseForm(!showExpenseForm)} className="text-xs text-teal-600 font-medium hover:text-teal-700 transition">+ Ajouter</button>
            </div>
            {showExpenseForm && (
              <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-3 space-y-3">
                <input type="number" placeholder="Montant (€)" value={newExpense.amount} onChange={e => setNewExpense({ ...newExpense, amount: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-400" />
                <input type="text" placeholder="Catégorie (ex: Courses, Électricité)" value={newExpense.category} onChange={e => setNewExpense({ ...newExpense, category: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-400" />
                <input type="text" placeholder="Description (optionnel)" value={newExpense.description} onChange={e => setNewExpense({ ...newExpense, description: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-400" />
                <div className="flex gap-2">
                  <button onClick={() => setShowExpenseForm(false)} className="flex-1 py-2 bg-slate-100 text-slate-600 rounded-xl text-sm hover:bg-slate-200 transition">Annuler</button>
                  <button onClick={addExpense} className="flex-1 py-2 bg-teal-400 text-[#0f1117] rounded-xl text-sm font-bold hover:bg-teal-300 transition">Ajouter</button>
                </div>
              </div>
            )}
            <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100">
              {colocation.expenses.length === 0 && (
                <p className="text-slate-400 text-sm px-4 py-3">Aucune dépense</p>
              )}
              {colocation.expenses.map(e => (
                <div key={e.id} className="flex items-center gap-3 px-4 py-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm">💶</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700">{e.category}</p>
                    <p className="text-xs text-slate-400">Payé par {e.paidBy}</p>
                  </div>
                  <span className="text-sm font-semibold text-slate-800">{e.amount.toFixed(2)} €</span>
                  <button onClick={() => deleteExpense(e.id)} className="text-slate-300 hover:text-red-400 text-xs transition">✕</button>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}