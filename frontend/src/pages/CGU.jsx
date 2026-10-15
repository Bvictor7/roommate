export default function CGU() {
  return (
    <main style={{ minHeight: 'calc(100vh - 56px)', background: '#F4EEE2', padding: '48px clamp(14px,3vw,34px)', fontFamily: 'Karla, system-ui, sans-serif', color: '#2A2723' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Newsreader, serif', fontWeight: 500, fontSize: 'clamp(28px,4vw,38px)', margin: '0 0 8px', letterSpacing: '-.02em' }}>Conditions Générales d'Utilisation</h1>
        <p style={{ fontFamily: "'Cutive Mono', monospace", fontSize: 12, color: '#6B655A', margin: '0 0 36px' }}>Version du 01/10/2025</p>

        <div style={{ display: 'grid', gap: 28 }}>
          <section>
            <h2 style={{ fontFamily: 'Newsreader, serif', fontWeight: 500, fontSize: 22, margin: '0 0 10px' }}>1. Objet</h2>
            <p style={{ lineHeight: 1.7, margin: 0 }}>
              RoomMate est une plateforme de mise en relation entre personnes cherchant une colocation ou une chambre à louer. L'utilisation du site implique l'acceptation pleine et entière des présentes CGU.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'Newsreader, serif', fontWeight: 500, fontSize: 22, margin: '0 0 10px' }}>2. Inscription</h2>
            <p style={{ lineHeight: 1.7, margin: 0 }}>
              L'accès aux fonctionnalités de l'application nécessite la création d'un compte. L'utilisateur s'engage à fournir des informations exactes et à maintenir la confidentialité de ses identifiants.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'Newsreader, serif', fontWeight: 500, fontSize: 22, margin: '0 0 10px' }}>3. Utilisation du service</h2>
            <p style={{ lineHeight: 1.7, margin: 0 }}>
              L'utilisateur s'engage à ne publier que des annonces réelles et conformes à la réalité. Toute annonce frauduleuse, mensongère ou illicite pourra être supprimée sans préavis.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'Newsreader, serif', fontWeight: 500, fontSize: 22, margin: '0 0 10px' }}>4. Responsabilité</h2>
            <p style={{ lineHeight: 1.7, margin: 0 }}>
              RoomMate est un projet à vocation pédagogique. L'éditeur ne saurait être tenu responsable des échanges entre utilisateurs ni des conséquences d'une mise en relation via la plateforme.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'Newsreader, serif', fontWeight: 500, fontSize: 22, margin: '0 0 10px' }}>5. Modification des CGU</h2>
            <p style={{ lineHeight: 1.7, margin: 0 }}>
              Les présentes CGU peuvent être modifiées à tout moment. L'utilisateur est invité à les consulter régulièrement.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
