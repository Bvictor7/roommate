import { Link, useNavigate } from 'react-router-dom'

const landingExpenses = [
  { qty: '×4', label: 'Loyer septembre', amount: '1 480,00 €' },
  { qty: '×4', label: 'Courses Grand Frais', amount: '128,40 €' },
  { qty: '×4', label: 'Électricité (bimestre)', amount: '86,34 €' },
  { qty: '×2', label: 'Pizzas dimanche soir', amount: '26,50 €' },
]

const landingChores = [
  { task: 'Salle de bain', who: 'toi', color: '#F0B49C', strike: 'none' },
  { task: 'Poubelles + tri', who: 'Malik', color: '#F0B49C', strike: 'none' },
  { task: 'Cuisine — sol', who: 'Chloé', color: '#EFEAD9', strike: 'none' },
  { task: 'Aspirateur séjour', who: 'Sam', color: '#A9B3A5', strike: 'line-through' },
]

const quotes = [
  { text: '« On a arrêté le tableau Excel au bout de trois semaines. Là, quand j\'avance les courses je prends la photo du ticket et c\'est fini. »', who: 'Chloé, 26 ans — Toulouse, 4 colocs depuis 2024' },
  { text: '« Le tour de ménage c\'était le vrai sujet chez nous, pas l\'argent. Voir qui a coché quoi a réglé 90 % des tensions. »', who: 'Malik, 23 ans — Lyon 7e, 3 colocs' },
  { text: '« J\'ai trouvé ma chambre ici. Pouvoir regarder comment ils gèrent les comptes avant d\'emménager, ça change tout. »', who: 'Sam, 21 ans — Nantes, arrivé en janvier' },
]

export default function Home() {
  const navigate = useNavigate()

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
            Les dépenses partagées, les tours de ménage, le planning et les annonces de chambres libres — au même endroit. Déclaratif : RoomMate note qui doit combien à qui, vous vous arrangez comme vous voulez.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 24, alignItems: 'center' }}>
            <Link to="/register" style={{ background: '#B4472C', color: '#F9F5EC', fontSize: 17, fontWeight: 600, padding: '12px 22px', textDecoration: 'none' }}>
              Créer mon foyer
            </Link>
            <Link to="/listings" style={{ border: '1.5px solid #2A2723', fontSize: 17, fontWeight: 600, padding: '12px 22px', textDecoration: 'none', color: '#2A2723' }}>
              Voir les annonces
            </Link>
            <span style={{ fontFamily: "'Cutive Mono', monospace", fontSize: 14, color: '#6B655A', marginLeft: 4 }}>gratuit · 4 colocs max par foyer</span>
          </div>
        </div>
        <div style={{ flex: '1 1 270px', minWidth: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 10 }}>
          <div style={{ aspectRatio: '4/3', border: '1px solid #2A2723', background: 'repeating-linear-gradient(135deg,#E9E1D0 0 9px,#F4EEE2 9px 18px)', display: 'flex', alignItems: 'flex-end', padding: 12 }}>
            <span style={{ fontFamily: "'Cutive Mono', monospace", fontSize: 13, color: '#4A453C', background: '#F4EEE2', padding: '3px 6px' }}>PHOTO — cuisine, 4 personnes qui dînent</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 10 }}>
            <div style={{ aspectRatio: '1/1', border: '1px solid #2A2723', background: 'repeating-linear-gradient(135deg,#E9E1D0 0 9px,#F4EEE2 9px 18px)', display: 'flex', alignItems: 'flex-end', padding: 10 }}>
              <span style={{ fontFamily: "'Cutive Mono', monospace", fontSize: 12, color: '#4A453C', background: '#F4EEE2', padding: '2px 5px' }}>PHOTO — chambre</span>
            </div>
            <div style={{ aspectRatio: '1/1', border: '1px solid #2A2723', background: 'repeating-linear-gradient(135deg,#E9E1D0 0 9px,#F4EEE2 9px 18px)', display: 'flex', alignItems: 'flex-end', padding: 10 }}>
              <span style={{ fontFamily: "'Cutive Mono', monospace", fontSize: 12, color: '#4A453C', background: '#F4EEE2', padding: '2px 5px' }}>PHOTO — tableau</span>
            </div>
          </div>
        </div>
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
              <span style={{ fontFamily: "'Cutive Mono', monospace", fontSize: 13, color: '#6B655A' }}>APPART JEAN-JAURES · SEPT.</span>
            </div>
            <div style={{ marginTop: 14, borderTop: '1px dashed #B8B1A0' }}>
              {landingExpenses.map((e, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '30px minmax(0,1fr) auto', gap: 10, alignItems: 'baseline', padding: '8px 0', borderBottom: '1px dotted #CFC8B6' }}>
                  <span style={{ fontFamily: "'Cutive Mono', monospace", fontSize: 13, color: '#6B655A' }}>{e.qty}</span>
                  <span style={{ fontSize: 16 }}>{e.label}</span>
                  <span style={{ fontFamily: "'DotGothic16', monospace", fontSize: 17, whiteSpace: 'nowrap' }}>{e.amount}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 10, paddingTop: 10 }}>
              <span style={{ fontSize: 15, fontWeight: 600 }}>Ton solde</span>
              <span style={{ fontFamily: "'DotGothic16', monospace", fontSize: 26, color: '#B4472C', lineHeight: 1 }}>−32,10 €</span>
            </div>
            <div style={{ borderTop: '2px solid #2A2723', marginTop: 6 }} />
            <div style={{ borderTop: '2px solid #2A2723', marginTop: 3 }} />
            <p style={{ margin: '12px 0 0', fontSize: 15, lineHeight: 1.5, color: '#4A453C' }}>Chaque avance est une ligne, chaque solde est un fait. Personne ne paie via RoomMate : tu marques « réglé » quand c'est réglé.</p>
          </div>

          {/* Ménage + note */}
          <div style={{ flex: '1 1 270px', minWidth: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 'clamp(14px,2vw,22px)' }}>
            <div style={{ background: '#25332C', color: '#EFEAD9', padding: 'clamp(16px,2.2vw,24px)', border: '1px solid #1A241F' }}>
              <div style={{ fontFamily: 'Caveat, cursive', fontSize: 'clamp(24px,2.6vw,32px)', lineHeight: 1, color: '#F3EEDE' }}>Ménage — semaine 38</div>
              <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 9, fontFamily: 'Caveat, cursive', fontSize: 21 }}>
                {landingChores.map((c, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, borderBottom: '1px solid rgba(239,234,217,.25)', paddingBottom: 6, color: c.color, textDecoration: c.strike }}>
                    <span>{c.task}</span><span>{c.who}</span>
                  </div>
                ))}
              </div>
              <p style={{ margin: '14px 0 0', fontSize: 15, lineHeight: 1.5, color: '#C9C2AE', fontFamily: 'Karla, sans-serif' }}>Le tableau du couloir, en ligne. Tu coches, ça tourne la semaine suivante.</p>
            </div>
            <div style={{ background: '#E3B44A', padding: 'clamp(14px,2vw,20px)', border: '1px solid #9E7A22', transform: 'rotate(-1deg)' }}>
              <div style={{ fontFamily: 'Caveat, cursive', fontSize: 'clamp(21px,2.2vw,26px)', lineHeight: 1.2, color: '#3A2E0E' }}>Malik : plombier jeudi 14h, faut quelqu'un sur place</div>
              <div style={{ fontFamily: 'Caveat, cursive', fontSize: 18, color: '#5A4814', marginTop: 8 }}>posté hier, 21:04</div>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section style={{ maxWidth: 1160, margin: '0 auto', padding: 'clamp(40px,6vw,80px) clamp(14px,3vw,34px) 0' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(16px,2.6vw,36px)', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 250px', minWidth: 0 }}>
            <h2 style={{ fontFamily: 'Newsreader, serif', fontWeight: 500, fontSize: 'clamp(24px,3vw,36px)', letterSpacing: '-.02em', margin: 0, lineHeight: 1.05 }}>Ils l'utilisent depuis un moment</h2>
            <p style={{ margin: '12px 0 0', fontSize: 15, lineHeight: 1.55, color: '#4A453C', maxWidth: '36ch' }}>Trois foyers qui ont accepté qu'on cite leurs messages.</p>
          </div>
          <div style={{ flex: '1.5 1 300px', minWidth: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 'clamp(12px,2vw,18px)' }}>
            {quotes.map((q, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '96px minmax(0,1fr)', gap: 'clamp(12px,2vw,18px)', alignItems: 'start', borderTop: '1px solid #2A2723', paddingTop: 14 }}>
                <div style={{ aspectRatio: '3/4', border: '1px solid #2A2723', background: 'repeating-linear-gradient(135deg,#E9E1D0 0 8px,#F4EEE2 8px 16px)' }} />
                <div>
                  <p style={{ margin: 0, fontFamily: 'Newsreader, serif', fontSize: 'clamp(17px,1.8vw,21px)', lineHeight: 1.4 }}>{q.text}</p>
                  <div style={{ fontFamily: "'Cutive Mono', monospace", fontSize: 13, color: '#6B655A', marginTop: 8 }}>{q.who}</div>
                </div>
              </div>
            ))}
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
            <p style={{ margin: '16px 0 0', fontSize: 17, lineHeight: 1.5, color: '#CFD8CE', maxWidth: '46ch' }}>Quatre colocs par foyer, un lien d'invitation, pas de carte bancaire à renseigner.</p>
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
          <span style={{ fontSize: 15, color: '#4A453C' }}>Toulouse · Lyon · Nantes</span>
          <span style={{ fontFamily: "'Cutive Mono', monospace", fontSize: 13, color: '#6B655A', marginLeft: 'auto' }}>Aucun paiement en ligne. Vous vous arrangez entre vous.</span>
        </div>
      </div>
    </div>
  )
}
