import { Link } from 'react-router-dom'

const testimonials = [
  {
    initials: 'SC',
    color: 'bg-emerald-500',
    name: 'Sarah C.',
    city: 'Paris',
    text: "J'ai trouvé mes colocs en une semaine et on n'a jamais eu une seule dispute sur les comptes.",
  },
  {
    initials: 'TM',
    color: 'bg-teal-500',
    name: 'Thomas M.',
    city: 'Lyon',
    text: 'Le planning des tâches a sauvé notre coloc. Plus besoin de rappeler à qui le tour.',
  },
  {
    initials: 'LD',
    color: 'bg-blue-500',
    name: 'Léa D.',
    city: 'Bordeaux',
    text: "Le score d'affinité fait vraiment la différence. Mes colocs sont devenus des amis.",
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f1117] text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-400 flex items-center justify-center font-bold text-[#0f1117] text-sm">
            R
          </div>
          <span className="font-bold text-lg tracking-tight">RoomMate</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <a href="#" className="hover:text-white transition">Trouver une colocation</a>
          <a href="#" className="hover:text-white transition">Outils de gestion</a>
          <a href="#" className="hover:text-white transition">Tarifs</a>
          <a href="#" className="hover:text-white transition">À propos</a>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm text-white/70 hover:text-white transition">Connexion</Link>
          <Link to="/register" className="text-sm bg-white text-[#0f1117] px-4 py-2 rounded-full font-semibold hover:bg-white/90 transition">
            Créer un compte
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto text-center px-6 pt-24 pb-16">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/80 mb-8">
          <span className="w-2 h-2 rounded-full bg-teal-400 inline-block"></span>
          Nouveau · Score d'affinité par IA
        </div>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          La colocation, enfin{' '}
          <span className="text-teal-400">organisée</span>.<br />
          De la recherche à la vie<br />
          à plusieurs.
        </h1>
        <p className="text-white/60 text-lg max-w-xl mx-auto mb-10">
          Trouvez les colocataires qui vous ressemblent, puis gérez tâches,
          dépenses et courses au même endroit. Une seule app, zéro friction.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link to="/listings" className="bg-teal-400 text-[#0f1117] px-6 py-3 rounded-full font-semibold hover:bg-teal-300 transition">
            Trouver un logement →
          </Link>
          <Link to="/dashboard" className="border border-white/20 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition">
            Gérer ma coloc
          </Link>
        </div>
      </section>

      {/* Preview widget */}
      <section className="max-w-2xl mx-auto px-6 pb-20">
        <div className="bg-[#1a1d27] rounded-2xl border border-white/10 p-6 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-white/40 uppercase tracking-widest mb-3">Tâches de la semaine</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded border border-red-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  </div>
                  <span className="text-sm text-white/80">Thomas · Poubelles</span>
                </div>
                <span className="text-xs text-red-400">Aujourd'hui</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded border border-teal-400 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-white/40 line-through">Julie · Ménage salon</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded border border-white/20"></div>
                <span className="text-sm text-white/80">Alex · Courses</span>
              </div>
            </div>
          </div>
          <div className="border-l border-white/10 pl-4">
            <p className="text-xs text-white/40 uppercase tracking-widest mb-3">Solde</p>
            <p className="text-white/60 text-sm">Sarah vous doit</p>
            <p className="text-3xl font-bold text-teal-400">14,50 €</p>
          </div>
        </div>
      </section>

      {/* Two axes */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <p className="text-center text-teal-400 text-xs uppercase tracking-widest mb-3">Tout-en-un</p>
        <h2 className="text-center text-3xl font-bold mb-12">Deux axes, une seule app</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Axe 1 */}
          <div className="bg-[#1a1d27] rounded-2xl border border-white/10 p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-red-400"></span>
              <span className="text-xs text-red-400 uppercase tracking-widest">AXE 1 · Recherche</span>
            </div>
            <h3 className="text-xl font-bold mb-1">Le Matcher d'annonces</h3>
            <p className="text-white/50 text-sm mb-6">Des profils classés par compatibilité réelle.</p>
            <div className="space-y-3">
              {[
                { initials: 'JL', color: 'bg-purple-500', name: 'Julie L.', sub: 'Paris 11e · Calme, cuisine', score: '92%' },
                { initials: 'TM', color: 'bg-teal-500', name: 'Thomas M.', sub: 'Lyon 3e · Sportif, sociable', score: '87%' },
              ].map((p) => (
                <div key={p.initials} className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${p.color} flex items-center justify-center text-xs font-bold`}>
                      {p.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-xs text-white/40">{p.sub}</p>
                    </div>
                  </div>
                  <span className="text-teal-400 font-bold text-sm">{p.score}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Axe 2 */}
          <div className="flex flex-col gap-4">
            <div className="bg-[#1a1d27] rounded-2xl border border-white/10 p-6 flex-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">Le Planning des tâches</h3>
                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">AXE 2</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-xl p-3">
                  <p className="text-sm font-medium">Thomas</p>
                  <p className="text-xs text-white/50">Poubelles 🗑️</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <p className="text-sm font-medium">Julie</p>
                  <p className="text-xs text-white/50">Ménage ✅</p>
                </div>
              </div>
            </div>
            <div className="bg-[#1a1d27] rounded-2xl border border-white/10 p-6 flex items-center justify-between">
              <div>
                <h3 className="font-bold mb-1">Les comptes clairs</h3>
                <p className="text-white/50 text-sm">Sarah vous doit</p>
                <p className="text-2xl font-bold text-teal-400">14,50 €</p>
              </div>
              <div className="flex items-end gap-1 h-12">
                {[40, 65, 30, 80, 55].map((h, i) => (
                  <div key={i} style={{ height: `${h}%` }} className="w-3 bg-teal-400/60 rounded-sm"></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sécurité */}
        <div className="mt-4 bg-[#1a1d27] rounded-2xl border border-white/10 p-6 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
            🛡
          </div>
          <div>
            <h3 className="font-bold">Sécurité garantie</h3>
            <p className="text-white/50 text-sm">Profils vérifiés et identité confirmée.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div key={t.initials} className="bg-[#1a1d27] rounded-2xl border border-white/10 p-6">
              <p className="text-yellow-400 text-sm mb-3">★★★★★</p>
              <p className="text-white/70 text-sm mb-4 leading-relaxed">« {t.text} »</p>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${t.color} flex items-center justify-center text-xs font-bold`}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-white/40">{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-teal-400 flex items-center justify-center font-bold text-[#0f1117] text-xs">R</div>
            <span className="font-bold text-sm">RoomMate</span>
          </div>
          <div className="flex gap-6 text-xs text-white/40">
            <a href="#" className="hover:text-white transition">CGU</a>
            <a href="#" className="hover:text-white transition">Confidentialité</a>
            <a href="#" className="hover:text-white transition">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
