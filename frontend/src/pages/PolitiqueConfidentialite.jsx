export default function PolitiqueConfidentialite() {
  return (
    <main style={{ minHeight: 'calc(100vh - 56px)', background: '#F4EEE2', padding: '48px clamp(14px,3vw,34px)', fontFamily: 'Karla, system-ui, sans-serif', color: '#2A2723' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Newsreader, serif', fontWeight: 500, fontSize: 'clamp(28px,4vw,38px)', margin: '0 0 8px', letterSpacing: '-.02em' }}>
          Politique de confidentialité
        </h1>
        <p style={{ fontFamily: "'Cutive Mono', monospace", fontSize: 12, color: '#9A9186', margin: '0 0 40px' }}>Mise à jour : octobre 2026</p>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontFamily: 'Newsreader, serif', fontWeight: 500, fontSize: 22, margin: '0 0 12px' }}>1. Données collectées</h2>
          <p style={{ lineHeight: 1.7, margin: 0 }}>Lors de votre inscription, nous collectons votre nom d'utilisateur, votre adresse e-mail et la date de création de votre compte. Aucune donnée de paiement n'est collectée.</p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontFamily: 'Newsreader, serif', fontWeight: 500, fontSize: 22, margin: '0 0 12px' }}>2. Utilisation des données</h2>
          <p style={{ lineHeight: 1.7, margin: 0 }}>Vos données sont utilisées uniquement pour le fonctionnement du service : authentification, affichage de votre profil et gestion de vos annonces. Elles ne sont ni vendues ni transmises à des tiers.</p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontFamily: 'Newsreader, serif', fontWeight: 500, fontSize: 22, margin: '0 0 12px' }}>3. Conservation</h2>
          <p style={{ lineHeight: 1.7, margin: 0 }}>Vos données sont conservées pendant toute la durée d'activité de votre compte. En cas de suppression du compte, elles sont effacées dans un délai de 30 jours.</p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontFamily: 'Newsreader, serif', fontWeight: 500, fontSize: 22, margin: '0 0 12px' }}>4. Vos droits (RGPD)</h2>
          <p style={{ lineHeight: 1.7, margin: 0 }}>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@roommate.fr" style={{ color: '#B4472C' }}>contact@roommate.fr</a>.</p>
        </section>

        <section>
          <h2 style={{ fontFamily: 'Newsreader, serif', fontWeight: 500, fontSize: 22, margin: '0 0 12px' }}>5. Cookies</h2>
          <p style={{ lineHeight: 1.7, margin: 0 }}>RoomMate n'utilise pas de cookies de traçage. Un token JWT est stocké localement dans votre navigateur à des fins d'authentification uniquement.</p>
        </section>
      </div>
    </main>
  )
}