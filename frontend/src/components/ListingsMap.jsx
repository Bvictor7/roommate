import { useEffect, useRef } from 'react'

export default function ListingsMap({ listings = [], city = 'Lyon' }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  useEffect(() => {
    if (mapInstanceRef.current) return

    // Charger Leaflet dynamiquement
    const L = window.L
    if (!L) return

    // Coordonnées par défaut selon la ville
    const cityCoords = {
      'Lyon': [45.7640, 4.8357],
      'Paris': [48.8566, 2.3522],
      'Toulouse': [43.6047, 1.4442],
      'Marseille': [43.2965, 5.3698],
      'Bordeaux': [44.8378, -0.5792],
      'Nantes': [47.2184, -1.5536],
      'Lille': [50.6292, 3.0573],
      'Strasbourg': [48.5734, 7.7521],
    }

    const defaultCoords = cityCoords[city] || [46.2276, 2.2137]

    const map = L.map(mapRef.current, {
      center: defaultCoords,
      zoom: 13,
      zoomControl: true,
    })

    // Tuiles style vintage OpenStreetMap contributors
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://openstreetmap.org/copyright/">OpenStreetMap contributors</a>',
      maxZoom: 18,
    }).addTo(map)

    // Icône custom style ticket
    const customIcon = L.divIcon({
      className: '',
      html: `<div style="
        background: #B4472C;
        color: #F9F5EC;
        font-family: 'DotGothic16', monospace;
        font-size: 12px;
        font-weight: bold;
        padding: 4px 8px;
        border: 2px solid #2A2723;
        white-space: nowrap;
        position: relative;
        transform: rotate(-1deg);
        box-shadow: 2px 2px 0 #2A2723;
      ">📍</div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
    })

    // Ajouter les markers
    if (listings.length > 0) {
      listings.forEach((listing, i) => {
        // Coordonnées approximatives basées sur la ville
        const baseCoords = cityCoords[listing.city] || defaultCoords
        const lat = baseCoords[0] + (Math.random() - 0.5) * 0.02
        const lng = baseCoords[1] + (Math.random() - 0.5) * 0.02

        const priceIcon = L.divIcon({
          className: '',
          html: `<div style="
            background: #B4472C;
            color: #F9F5EC;
            font-family: 'DotGothic16', monospace;
            font-size: 13px;
            padding: 4px 8px;
            border: 1.5px solid #2A2723;
            white-space: nowrap;
            transform: rotate(${(i % 3 - 1) * 1.5}deg);
            box-shadow: 2px 2px 0 rgba(42,39,35,.3);
          ">${listing.price} €</div>`,
          iconSize: [60, 28],
          iconAnchor: [30, 28],
        })

        L.marker([lat, lng], { icon: priceIcon })
          .addTo(map)
          .bindPopup(`
            <div style="font-family: Karla, sans-serif; min-width: 180px;">
              <strong style="font-family: Newsreader, serif; font-size: 16px;">${listing.title}</strong>
              <br/>
              <span style="font-size: 13px; color: #6B655A;">${listing.city} · ${listing.type}</span>
              <br/>
              <span style="font-family: DotGothic16, monospace; font-size: 18px; color: #B4472C;">${listing.price} €</span>
            </div>
          `)
      })

      // Centrer sur les annonces
      const firstCity = listings[0]?.city
      if (firstCity && cityCoords[firstCity]) {
        map.setView(cityCoords[firstCity], 13)
      }
    } else {
      // Marker de démo si pas d'annonces
      L.marker(defaultCoords, { icon: customIcon })
        .addTo(map)
        .bindPopup('Votre ville')
    }

    mapInstanceRef.current = map

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: '420px',
        border: '1px solid #2A2723',
        filter: 'sepia(20%) contrast(0.95)',
      }}
    />
  )
}
