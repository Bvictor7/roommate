import { useEffect, useState } from 'react'
import api from '../services/api'

export default function Listings() {
  const [listings, setListings] = useState([])

  useEffect(() => {
    api.get('/api/listings').then(res => setListings(res.data))
  }, [])

  return (
    <div>
      <h1>Les annonces</h1>
      {listings.map(l => (
        <div key={l.id}>
          <h2>{l.title}</h2>
          <p>{l.city} - {l.price}€/mois</p>
          <p>{l.description}</p>
        </div>
      ))}
    </div>
  )
}