import { Link } from 'react-router-dom'

const exampleExpenses = [
  { label: 'Loyer', amount: '1 480,00 €' },
  { label: 'Courses', amount: '128,40 €' },
  { label: 'Électricité', amount: '86,34 €' },
  { label: 'Pizzas dimanche soir', amount: '26,50 €' },
]

const exampleTasks = [
  { task: 'Salle de bain', done: false },
  { task: 'Poubelles + tri', done: false },
  { task: 'Cuisine — sol', done: false },
  { task: 'Aspirateur séjour', done: true },
]

const steps = [
  { n: '1', title: 'Crée ton foyer', text: 'Un nom, et RoomMate génère un code d\'invitation.' },
  { n: '2', title: 'Partage le code', text: 'Tes colocs le collent dans « Rejoindre » et arrivent dans le foyer.' },
  { n: '3', title: 'Gérez ensemble', text: 'Dépenses, tâches et courses se mettent à jour chez tout le monde en temps réel.' },
]

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: '#F4EEE2', fontFamily: 'Karla, system-ui, sans-serif', color: '#2A2723', overflowX: 'hidden' }}>

      {/* Hero */}
      <section style={{ maxWidth: 1160, margin: '0 auto', padding: 'clamp(24px,4vw,58px) clamp(14px,3vw,34px) 0', display: 'flex', flexWrap: 'wrap', gap: 'clamp(18px,3vw,42px)', alignItems: 'flex-end' }}>
        <div style={{ flex: '1.15 1 340px', minWidth: 0 }}>
          <h1 style={{ fontFamily: 'Newsreader, serif', fontWeight: 500, fontSize: 'clamp(40px,7vw,86px)', lineHeight: 1, letterSpacing: '-.025em', margin: 0, maxWidth: '16ch' }}>
            Une coloc, ça se vit.{' '}
            <span style={{ fontStyle: 'italic', color: '#1F4438' }}>Pas juste ça se compte.</span>
          </h1>
          <p style={{ margin: '20px 0 0', maxWidth: '48ch', fontSize: 'clamp(17px,1.6vw,20px)', lineHeight: 1.5, color: '#4A453C' }}>
            Les dépenses partagées, les tâches, la liste de courses et les annonces de chambres libres — au même endroit, à jour en temps réel pour tout le foyer.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 24, alignItems: 'center' }}>
            <Link to="/register" style={{ background: '#B4472C', color: '#F9F5EC', fontSize: 17, fontWeight: 600, padding: '12px 22px', textDecoration: 'none' }}>
              Créer mon foyer
            </Link>
            <Link to="/listings" style={{ border: '1.5px solid #2A2723', fontSize: 17, fontWeight: 600, padding: '12px 22px', textDecoration: 'none', color: '#2A2723' }}>
              Voir les annonces
            </Link>
            <span style={{ fontFamily: "'Cutive Mono', monospace", fontSize: 14, color: '#6B655A', marginLeft: 4 }}>gratuit · aucun paiement en ligne</span>
          </div>
        </div>
        <ol style={{ flex: '1 1 270px', minWidth: 0, listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 10 }}>
          {steps.map(step => (
            <li key={step.n} style={{ display: 'grid', gridTemplateColumns: '40px minmax(0,1fr)', gap: 14, alignItems: 'start', background: '#FBF7EE', border: '1px solid #2A2723', padding: '14px 16px' }}>
              <span style={{ fontFamily: "'DotGothic16', monospace", fontSize: 26, lineHeight: 1, color: '#B4472C' }}>{step.n}</span>
              <div>
                <div style={{ fontFamily: 'Newsreader, serif', fontSize: 20, fontWeight: 600 }}>{step.title}</div>
                <p style={{ margin: '4px 0 0', fontSize: 15, lineHeight: 1.45, color: '#4A453C' }}>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Ce que la maison gère */}
      <section style={{ maxWidth: 1160, margin: '0 auto', padding: 'clamp(40px,6vw,82px) clamp(14px,3vw,34px) 0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14 }}>
          <h2 style={{ fontFamily: 'Newsreader, serif', fontWeight: 500, fontSize: 'clamp(26px,3.4vw,42px)', letterSpacing: '-.02em', margin: 0, lineHeight: 1 }}>Ce que la maison gère</h2>
          <div style={{ flex: 1, height: 1, background: '#2A2723', marginBottom: 10 }} />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(16px,2.6vw,34px)', marginTop: 'clamp(18px,3vw,30px)', alignItems: 'flex-start' }}>
          {/* Ticket dépenses */}
          <div style={{ flex: '1.25 1 320px', minWidth: 0, background: '#FBF7EE', border: '1px solid #2A2723', padding: 'clamp(16px,2.4vw,26px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
              <h3 style={{ fontFamily: 'Newsreader, serif', fontWeight: 600, fontSize: 'clamp(21px,2.2vw,27px)', margin: 0 }}>Les dépenses, en ticket</h3>
              <span style={{ fontFamily: "'Cutive Mono', monospace", fontSize: 13, color: '#6B655A' }}>EXEMPLE</span>
            </div>
            <div style={{ marginTop: 14, borderTop: '1px dashed #B8B1A0' }}>
              {exampleExpenses.map((e) => (
                <div key={e.label} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 10, alignItems: 'baseline', padding: '8px 0', borderBottom: '1px dotted #CFC8B6' }}>
                  <span style={{ fontSize: 16 }}>{e.label}</span>
                  <span style={{ fontFamily: "'DotGothic16', monospace", fontSize: 17, whiteSpace: 'nowrap' }}>{e.amount}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 10, paddingTop: 10 }}>
              <span style={{ fontSize: 15, fontWeight: 600 }}>Total du foyer</span>
              <span style={{ fontFamily: "'DotGothic16', monospace", fontSize: 26, lineHeight: 1 }}>1 721,24 €</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 10, paddingTop: 4 }}>
              <span style={{ fontSize: 15, color: '#4A453C' }}>Part par personne (4 colocs)</span>
              <span style={{ fontFamily: "'DotGothic16', monospace", fontSize: 18, color: '#B4472C' }}>430,31 €</span>
            </div>
            <div style={{ borderTop: '2px solid #2A2723', marginTop: 6 }} />
            <div style={{ borderTop: '2px solid #2A2723', marginTop: 3 }} />
            <p style={{ margin: '12px 0 0', fontSize: 15, lineHeight: 1.5, color: '#4A453C' }}>Chaque avance est une ligne : RoomMate calcule le total du foyer et la part de chacun. Personne ne paie via RoomMate, vous vous arrangez entre vous.</p>
          </div>

          {/* Ménage + note */}
          <div style={{ flex: '1 1 270px', minWidth: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 'clamp(14px,2vw,22px)' }}>
            <div style={{ background: '#25332C', color: '#EFEAD9', padding: 'clamp(16px,2.2vw,24px)', border: '1px solid #1A241F' }}>
              <div style={{ fontFamily: 'Caveat, cursive', fontSize: 'clamp(24px,2.6vw,32px)', lineHeight: 1, color: '#F3EEDE' }}>Tâches — exemple</div>
              <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 9, fontFamily: 'Caveat, cursive', fontSize: 21 }}>
                {exampleTasks.map((t) => (
                  <div key={t.task} style={{ display: 'flex', gap: 10, borderBottom: '1px solid rgba(239,234,217,.25)', paddingBottom: 6, color: t.done ? '#A9B3A5' : '#F0B49C', textDecoration: t.done ? 'line-through' : 'none' }}>
                    <span>{t.done ? '✕' : '☐'}</span><span>{t.task}</span>
                  </div>
                ))}
              </div>
              <p style={{ margin: '14px 0 0', fontSize: 15, lineHeight: 1.5, color: '#C9C2AE', fontFamily: 'Karla, sans-serif' }}>Le tableau du couloir, en ligne. Chacun ajoute et coche ses tâches, tout le foyer le voit aussitôt.</p>
            </div>
            <div style={{ background: '#E3B44A', padding: 'clamp(14px,2vw,20px)', border: '1px solid #9E7A22', transform: 'rotate(-1deg)' }}>
              <div style={{ fontFamily: 'Caveat, cursive', fontSize: 'clamp(21px,2.2vw,26px)', lineHeight: 1.2, color: '#3A2E0E' }}>Courses : lait, pâtes, liquide vaisselle</div>
              <div style={{ fontFamily: 'Caveat, cursive', fontSize: 18, color: '#5A4814', marginTop: 8 }}>une liste partagée, cochée par qui fait les courses</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section style={{ maxWidth: 1160, margin: '0 auto', padding: 'clamp(40px,6vw,80px) clamp(14px,3vw,34px) clamp(44px,6vw,90px)' }}>
        <div style={{ background: '#1F4438', color: '#F2EEE0', padding: 'clamp(22px,4vw,48px)', border: '1px solid #143026', display: 'flex', flexWrap: 'wrap', gap: 'clamp(16px,3vw,40px)', alignItems: 'center' }}>
          <div style={{ flex: '1.3 1 320px', minWidth: 0 }}>
            <h2 style={{ fontFamily: 'Newsreader, serif', fontWeight: 500, fontSize: 'clamp(28px,4vw,52px)', lineHeight: 1.02, letterSpacing: '-.02em', margin: 0, maxWidth: '20ch' }}>
              Crée le foyer, invite les autres, arrête de tenir les comptes de tête.
            </h2>
            <p style={{ margin: '16px 0 0', fontSize: 17, lineHeight: 1.5, color: '#CFD8CE', maxWidth: '46ch' }}>Un code d'invitation à partager, pas de carte bancaire à renseigner.</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <Link to="/register" style={{ background: '#E3B44A', color: '#2A2723', fontSize: 17, fontWeight: 700, padding: '13px 24px', textDecoration: 'none' }}>
              Créer mon foyer
            </Link>
            <Link to="/listings" style={{ border: '1.5px solid #EFEAD9', color: '#EFEAD9', fontSize: 17, fontWeight: 600, padding: '13px 24px', textDecoration: 'none' }}>
              Chercher une chambre
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #2A2723', background: '#F4EEE2' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '16px clamp(14px,3vw,34px) 28px', display: 'flex', flexWrap: 'wrap', gap: '8px 24px', alignItems: 'baseline' }}>
          <span style={{ fontFamily: 'Newsreader, serif', fontSize: 19, fontWeight: 600 }}>RoomMate</span>
          <span style={{ fontFamily: "'Cutive Mono', monospace", fontSize: 13, color: '#6B655A', marginLeft: 'auto' }}>Aucun paiement en ligne. Vous vous arrangez entre vous.</span>
        </div>
      </div>
    </div>
  )
}
