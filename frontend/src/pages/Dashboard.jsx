import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { icon: '⊞', label: 'Tableau de bord', path: '/dashboard' },
  { icon: '✓', label: 'Tâches & Chores', path: '/dashboard/taches' },
  { icon: '€', label: 'Comptes & Dépenses', path: '/dashboard/comptes' },
  { icon: '🛒', label: 'Liste de courses', path: '/dashboard/courses' },
  { icon: '💬', label: 'Messagerie', path: '/dashboard/messagerie' },
  { icon: '⚙', label: 'Paramètres', path: '/dashboard/parametres' },
]

const tasks = [
  { id: 1, label: 'Sortir les poubelles', assignee: 'Alex', due: "Aujourd'hui", urgent: true, done: false },
  { id: 2, label: 'Nettoyer la cuisine', assignee: 'Léa', due: 'Demain', urgent: false, done: false },
  { id: 3, label: 'Aspirateur salon', assignee: 'Thomas', due: 'Terminé', urgent: false, done: true },
]

const depenses = [
  { icon: '🛒', label: 'Courses Lidl', by: 'Thomas', amount: '45,00 €' },
  { icon: '⚡', label: 'Électricité', by: 'Léa', amount: '80,00 €' },
]

const roommates = [
  { initials: 'AX', color: 'bg-teal-400 text-[#0f1117]', name: 'Alex' },
  { initials: 'LD', color: 'bg-purple-400 text-white', name: 'Léa' },
  { initials: 'TM', color: 'bg-blue-400 text-white', name: 'Thomas' },
]

export default function Dashboard() {
  const location = useLocation()
  const [taskList, setTaskList] = useState(tasks)
  const [courseList, setCourseList] = useState(["Lait d'avoine", 'Éponges', 'Café'])
  const [newCourse, setNewCourse] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleTask = (id) => {
    setTaskList(taskList.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const addCourse = () => {
    if (newCourse.trim()) {
      setCourseList([...courseList, newCourse.trim()])
      setNewCourse('')
    }
  }

  return (
    <div className="flex bg-slate-50 overflow-hidden" style={{ minHeight: 'calc(100vh - 56px)' }}>

      {sidebarOpen && (
        <div
          role="presentation"
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        aria-label="Navigation du dashboard"
        aria-hidden={!sidebarOpen && typeof window !== 'undefined' && window.innerWidth < 1024}
        className={`
          fixed lg:static inset-y-0 left-0 z-30
          w-64 bg-white border-r border-slate-200 flex flex-col
          transform transition-transform duration-200
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{ top: '56px', height: 'calc(100vh - 56px)' }}
      >
        <div className="px-4 py-3 border-b border-slate-100">
          <div className="flex items-center justify-between bg-slate-50 rounded-xl px-3 py-2">
            <div className="flex items-center gap-2">
              <div aria-hidden="true" className="w-7 h-7 rounded-lg bg-emerald-400 flex items-center justify-center text-xs font-bold text-white">LV</div>
              <span className="text-sm font-medium text-slate-700">Le Loft Vert</span>
            </div>
            <span aria-hidden="true" className="text-slate-400 text-xs">▾</span>
          </div>
        </div>

        <nav aria-label="Sections du dashboard" className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                aria-current={active ? 'page' : undefined}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  active ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span aria-hidden="true" className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="px-4 py-4 border-t border-slate-100 flex items-center gap-3">
          <div aria-hidden="true" className="w-8 h-8 rounded-full bg-teal-400 flex items-center justify-center text-xs font-bold text-[#0f1117]">AX</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-800">Alex</p>
            <p className="text-xs text-slate-400 truncate">alex@roommate.fr</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto min-w-0">
        <div className="flex items-center justify-between px-4 sm:px-8 py-5 sm:py-6 gap-3">
          <div className="flex items-center gap-3">
            <button
              aria-label="Ouvrir le menu de navigation"
              aria-expanded={sidebarOpen}
              aria-controls="dashboard-sidebar"
              className="lg:hidden text-slate-500 text-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Bonjour Alex ! 👋</h1>
              <p className="text-slate-500 text-sm mt-0.5 hidden sm:block">Voici l'état du Loft aujourd'hui.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button aria-label="Notifications" className="text-slate-400 text-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">🔔</button>
            <div aria-label="Colocataires" className="flex -space-x-2">
              {roommates.map((r) => (
                <div key={r.initials} aria-label={r.name} title={r.name} className={`w-8 h-8 rounded-full ${r.color} border-2 border-white flex items-center justify-center text-xs font-bold`}>
                  <span aria-hidden="true">{r.initials}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-8 pb-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

          <section aria-labelledby="tasks-title" className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 id="tasks-title" className="font-bold text-slate-900">Tâches du jour</h2>
              <button aria-label="Ajouter une tâche" className="text-blue-600 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">+ Ajouter</button>
            </div>
            <ul className="space-y-3" aria-label="Liste des tâches">
              {taskList.map((task) => (
                <li key={task.id}>
                  <button
                    onClick={() => toggleTask(task.id)}
                    aria-pressed={task.done}
                    aria-label={`${task.label} — assigné à ${task.assignee} — ${task.done ? 'terminé' : task.due}`}
                    className={`w-full flex items-center justify-between p-3 sm:p-4 rounded-xl border cursor-pointer transition text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                      task.done ? 'bg-emerald-50 border-emerald-100'
                      : task.urgent ? 'bg-red-50 border-red-100'
                      : 'bg-slate-50 border-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div aria-hidden="true" className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${
                        task.done ? 'bg-emerald-500 border-emerald-500' : task.urgent ? 'border-red-400' : 'border-slate-300'
                      }`}>
                        {task.done && <span className="text-white text-xs">✓</span>}
                      </div>
                      <div className="min-w-0">
                        <p className={`text-sm font-medium truncate ${task.done ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                          {task.label}
                        </p>
                        <p className="text-xs text-slate-400">Assigné à {task.assignee}</p>
                      </div>
                    </div>
                    <span aria-hidden="true" className={`text-xs font-medium shrink-0 ml-2 ${
                      task.done ? 'text-emerald-600' : task.urgent ? 'text-red-500' : 'text-slate-400'
                    }`}>
                      {task.done ? 'Terminé' : task.due} {task.urgent && !task.done ? '🔔' : ''}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="expenses-title" className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
            <h2 id="expenses-title" className="font-bold text-slate-900 mb-5">Qui doit combien ?</h2>
            <div className="bg-blue-50 rounded-xl p-4 mb-4">
              <p className="text-slate-500 text-sm">Votre solde total</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-600 mt-1">Vous devez 12,00 €</p>
            </div>
            <button className="w-full bg-blue-600 text-white py-2.5 rounded-xl text-sm font-semibold mb-4 hover:bg-blue-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              + Ajouter une dépense
            </button>
            <ul aria-label="Dernières dépenses" className="space-y-3">
              {depenses.map((d) => (
                <li key={d.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div aria-hidden="true" className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-base shrink-0">{d.icon}</div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">{d.label}</p>
                      <p className="text-xs text-slate-400">{d.by}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-slate-700 shrink-0 ml-2">{d.amount}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="shopping-title" className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <h2 id="shopping-title" className="font-bold text-slate-900">Liste de courses</h2>
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Partagée</span>
            </div>
            <ul aria-label="Articles à acheter" className="space-y-3 mb-4">
              {courseList.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id={`course-${i}`}
                    aria-label={item}
                    className="w-4 h-4 rounded border border-slate-300 accent-teal-400"
                  />
                  <label htmlFor={`course-${i}`} className="text-sm text-slate-700">{item}</label>
                </li>
              ))}
            </ul>
            <div className="flex gap-2" role="group" aria-label="Ajouter un article">
              <label htmlFor="new-course" className="sr-only">Nouvel article</label>
              <input
                id="new-course"
                type="text"
                value={newCourse}
                onChange={(e) => setNewCourse(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addCourse()}
                placeholder="Ajouter un article..."
                className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-teal-400 focus-visible:ring-2 focus-visible:ring-teal-400 transition"
              />
              <button
                onClick={addCourse}
                aria-label="Ajouter l'article"
                className="w-9 h-9 bg-teal-400 text-[#0f1117] rounded-xl font-bold text-lg flex items-center justify-center hover:bg-teal-300 transition shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                <span aria-hidden="true">+</span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
