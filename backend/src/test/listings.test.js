import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import app from '../app.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

let authToken = ''
let listingId = ''
const testEmail = `listings_${Date.now()}@roommate.test`

const testListing = {
  title: 'Chambre test automatisé',
  description: 'Description de test suffisamment longue pour la validation Zod',
  type: 'chambre',
  city: 'Paris',
  postalCode: '75011',
  price: 650,
  charges: 50,
  availableDate: '2026-09-01T00:00:00.000Z',
}

beforeAll(async () => {
  const res = await request(app).post('/api/auth/register').send({
    email: testEmail,
    password: 'password123',
    username: `listings_user_${Date.now()}`,
  })
  authToken = res.body.token
})

afterAll(async () => {
  await prisma.listing.deleteMany({ where: { user: { email: testEmail } } })
  await prisma.user.deleteMany({ where: { email: testEmail } })
  await prisma.$disconnect()
})

describe('GET /api/listings', () => {
  it('retourne la liste des annonces', async () => {
  const res = await request(app).get('/api/listings')
  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
})
})

describe('POST /api/listings', () => {
  it('crée une annonce avec token valide', async () => {
    const res = await request(app)
      .post('/api/listings')
      .set('Authorization', `Bearer ${authToken}`)
      .send(testListing)
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    listingId = res.body.id
  })

  it('refuse sans token', async () => {
    const res = await request(app).post('/api/listings').send(testListing)
    expect(res.status).toBe(401)
  })

  it('refuse si données invalides', async () => {
    const res = await request(app)
      .post('/api/listings')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ title: 'trop court', price: -10 })
    expect(res.status).toBe(400)
  })
})

describe('GET /api/listings/:id', () => {
  it('retourne une annonce existante', async () => {
    const res = await request(app).get(`/api/listings/${listingId}`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('id', listingId)
  })

  it('retourne 404 si annonce inexistante', async () => {
    const res = await request(app).get('/api/listings/id-inexistant')
    expect(res.status).toBe(404)
  })
})

describe('DELETE /api/listings/:id', () => {
  it('supprime son annonce', async () => {
    const res = await request(app)
      .delete(`/api/listings/${listingId}`)
      .set('Authorization', `Bearer ${authToken}`)
    expect(res.status).toBe(200)
  })
})
