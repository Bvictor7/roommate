export default function MentionsLegales() {
  return (
    <main style={{ minHeight: 'calc(100vh - 56px)', background: '#F4EEE2', padding: '48px clamp(14px,3vw,34px)', fontFamily: 'Karla, system-ui, sans-serif', color: '#2A2723' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Newsreader, serif', fontWeight: 500, fontSize: 'clamp(28px,4vw,38px)', margin: '0 0 8px', letterSpacing: '-.02em' }}>Mentions légales</h1>
        <p style={{ fontFamily: "'Cutive Mono', monospace", fontSize: 12, color: '#6B655A', margin: '0 0 36px' }}>En vigueur au 01/10/2025</p>

        <div style={{ display: 'grid', gap: 28 }}>
          <section>
            <h2 style={{ fontFamily: 'Newsreader, serif', fontWeight: 500, fontSize: 22, margin: '0 0 10px' }}>Éditeur du site</h2>
            <p style={{ lineHeight: 1.7, margin: 0 }}>
              RoomMate est un projet réalisé dans le cadre d'une formation Concepteur Développeur d'Applications (Titre Pro niveau 6) à l'AFEC Bayonne.<br />
              Responsable de publication : Victor Belahcene Terdjemane<br />
              Contact : <a href="mailto:belahcene2@gmail.com" style={{ color: '#B4472C' }}>belahcene2@gmail.com</a>
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'Newsreader, serif', fontWeight: 500, fontSize: 22, margin: '0 0 10px' }}>Hébergement</h2>
            <p style={{ lineHeight: 1.7, margin: 0 }}>
              Frontend : Netlify, Inc. — 44 Montgomery Street, Suite 300, San Francisco, CA 94104, États-Unis<br />
              Backend & base de données : Render Services, Inc. — 525 Brannan Street, Suite 300, San Francisco, CA 94107, États-Unis
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'Newsreader, serif', fontWeight: 500, fontSize: 22, margin: '0 0 10px' }}>Propriété intellectuelle</h2>
            <p style={{ lineHeight: 1.7, margin: 0 }}>
              L'ensemble des contenus présents sur RoomMate (textes, code source, design) est la propriété de son auteur. Toute reproduction sans autorisation est interdite.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'Newsreader, serif', fontWeight: 500, fontSize: 22, margin: '0 0 10px' }}>Données personnelles</h2>
            <p style={{ lineHeight: 1.7, margin: 0 }}>
              Les données collectées (nom d'utilisateur, adresse e-mail) sont utilisées uniquement dans le cadre du fonctionnement de l'application. Elles ne sont ni vendues ni transmises à des tiers. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données en contactant : <a href="mailto:belahcene2@gmail.com" style={{ color: '#B4472C' }}>belahcene2@gmail.com</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
