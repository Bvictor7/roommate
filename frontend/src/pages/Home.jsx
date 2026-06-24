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

      {/* Hero */}
      <section className="w-full max-w-4xl mx-auto text-center px-4 sm:px-6 pt-16 sm:pt-24 pb-12 sm:pb-16">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-xs sm:text-sm text-white/80 mb-6 sm:mb-8">
          <span className="w-2 h-2 rounded-full bg-teal-400 inline-block shrink-0"></span>
          Nouveau · Score d'affinité par IA
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4 sm:mb-6 px-2">
          La colocation, enfin{' '}
          <span className="text-teal-400">organisée</span>.<br />
          De la recherche à la vie<br />
          à plusieurs.
        </h1>
        <p className="text-white/60 text-base sm:text-lg max-w-xl mx-auto mb-8 sm:mb-10 px-2">
          Trouvez les colocataires qui vous ressemblent, puis gérez tâches,
          dépenses et courses au même endroit. Une seule app, zéro friction.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 px-4">
          <Link
            to="/listings"
            className="w-full sm:w-auto bg-teal-400 text-[#0f1117] px-6 py-3 rounded-full font-semibold hover:bg-teal-300 transition text-center"
          >
            Trouver un logement →
          </Link>
          <Link
            to="/dashboard"
            className="w-full sm:w-auto border border-white/20 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition text-center"
          >
            Gérer ma coloc
          </Link>
        </div>
      </section>

      {/* Preview widget */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="bg-[#1a1d27] rounded-2xl border border-white/10 p-4 sm:p-6 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-white/40 uppercase tracking-widest mb-3">Tâches de la semaine</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="w-4 h-4 rounded border border-red-500 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  </div>
                  <span className="text-xs sm:text-sm text-white/80 truncate">Thomas · Poubelles</span>
                </div>
                <span className="text-xs text-red-400 shrink-0">Auj.</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded border border-teal-400 flex items-center justify-center shrink-0">
                  <svg className="w-2.5 h-2.5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm text-white/40 line-through truncate">Julie · Ménage salon</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded border border-white/20 shrink-0"></div>
                <span className="text-xs sm:text-sm text-white/80 truncate">Alex · Courses</span>
              </div>
            </div>
          </div>
          <div className="border-l border-white/10 pl-4">
            <p className="text-xs text-white/40 uppercase tracking-widest mb-3">Solde</p>
            <p className="text-white/60 text-xs sm:text-sm">Sarah vous doit</p>
            <p className="text-2xl sm:text-3xl font-bold text-teal-400">14,50 €</p>
          </div>
        </div>
      </section>

      {/* Two axes */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <p className="text-center text-teal-400 text-xs uppercase tracking-widest mb-3">Tout-en-un</p>
        <h2 className="text-center text-2xl sm:text-3xl font-bold mb-8 sm:mb-12">Deux axes, une seule app</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Axe 1 */}
          <div className="bg-[#1a1d27] rounded-2xl border border-white/10 p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-red-400 shrink-0"></span>
              <span className="text-xs text-red-400 uppercase tracking-widest">AXE 1 · Recherche</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-1">Le Matcher d'annonces</h3>
            <p className="text-white/50 text-sm mb-5 sm:mb-6">Des profils classés par compatibilité réelle.</p>
            <div className="space-y-3">
              {[
                { initials: 'JL', color: 'bg-purple-500', name: 'Julie L.', sub: 'Paris 11e · Calme, cuisine', score: '92%' },
                { initials: 'TM', color: 'bg-teal-500', name: 'Thomas M.', sub: 'Lyon 3e · Sportif, sociable', score: '87%' },
              ].map((p) => (
                <div key={p.initials} className="flex items-center justify-between bg-white/5 rounded-xl px-3 sm:px-4 py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-full ${p.color} flex items-center justify-center text-xs font-bold shrink-0`}>
                      {p.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-xs text-white/40 truncate">{p.sub}</p>
                    </div>
                  </div>
                  <span className="text-teal-400 font-bold text-sm shrink-0 ml-2">{p.score}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Axe 2 */}
          <div className="flex flex-col gap-4">
            <div className="bg-[#1a1d27] rounded-2xl border border-white/10 p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">Le Planning des tâches</h3>
                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full shrink-0">AXE 2</span>
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
            <div className="bg-[#1a1d27] rounded-2xl border border-white/10 p-5 sm:p-6 flex items-center justify-between">
              <div>
                <h3 className="font-bold mb-1">Les comptes clairs</h3>
                <p className="text-white/50 text-sm">Sarah vous doit</p>
                <p className="text-xl sm:text-2xl font-bold text-teal-400">14,50 €</p>
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
        <div className="mt-4 bg-[#1a1d27] rounded-2xl border border-white/10 p-5 sm:p-6 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
            🛡
          </div>
          <div>
            <h3 className="font-bold">Sécurité garantie</h3>
            <p className="text-white/50 text-sm">Profils vérifiés et identité confirmée.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div key={t.initials} className="bg-[#1a1d27] rounded-2xl border border-white/10 p-5 sm:p-6">
              <p className="text-yellow-400 text-sm mb-3">★★★★★</p>
              <p className="text-white/70 text-sm mb-4 leading-relaxed">« {t.text} »</p>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${t.color} flex items-center justify-center text-xs font-bold shrink-0`}>
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
      <footer className="border-t border-white/10 py-6 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-6 text-xs text-white/40">
          <a href="#" className="hover:text-white transition">CGU</a>
          <a href="#" className="hover:text-white transition">Confidentialité</a>
          <a href="#" className="hover:text-white transition">Cookies</a>
        </div>
      </footer>
    </div>
  )
}
