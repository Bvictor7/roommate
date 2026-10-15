import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: '#F4EEE2', borderTop: '1px solid #2A2723', padding: '20px clamp(14px,3vw,34px)', fontFamily: 'Karla, system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <span style={{ fontFamily: 'Newsreader, serif', fontSize: 16, fontWeight: 600, color: '#2A2723' }}>RoomMate</span>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <Link to="/mentions-legales" style={{ fontSize: 13, color: '#6B655A', fontFamily: "'Cutive Mono', monospace", textDecoration: 'underline' }}>Mentions légales</Link>
          <Link to="/cgu" style={{ fontSize: 13, color: '#6B655A', fontFamily: "'Cutive Mono', monospace", textDecoration: 'underline' }}>CGU</Link>
          <Link to="/politique-confidentialite" style={{ fontSize: 13, color: '#6B655A', fontFamily: "'Cutive Mono', monospace", textDecoration: 'underline' }}>Politique de confidentialité</Link>
        </div>
        <span style={{ fontSize: 12, color: '#9A9186', fontFamily: "'Cutive Mono', monospace" }}>© {new Date().getFullYear()} RoomMate</span>
      </div>
    </footer>
  )
}
