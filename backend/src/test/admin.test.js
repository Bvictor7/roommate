import { describe, it, expect, vi, beforeEach } from 'vitest'
import express from 'express'
import request from 'supertest'
import jwt from 'jsonwebtoken'

process.env.JWT_SECRET = 'test-secret'

const mockUser = { findMany: vi.fn() }
const mockListing = { findUnique: vi.fn(), delete: vi.fn() }

vi.mock('@prisma/client', () => {
  function PrismaClient() {}
  PrismaClient.prototype.user = mockUser
  PrismaClient.prototype.listing = mockListing
  return { PrismaClient }
})

const { default: adminRoutes } = await import('../routes/admin.js')
const { default: errorHandler } = await import('../middleware/errorHandler.js')

const app = express()
app.use('/api/admin', adminRoutes)
app.use(errorHandler)

const tokenFor = (role) => jwt.sign({ userId: 'u1', role }, process.env.JWT_SECRET)

beforeEach(() => {
  vi.clearAllMocks()
})

describe('routes admin — protection', () => {
  it('refuse sans token (401)', async () => {
    const res = await request(app).get('/api/admin/users')
    expect(res.status).toBe(401)
  })

  it('refuse un utilisateur non admin (403)', async () => {
    const res = await request(app)
      .get('/api/admin/users')
      .set('Authorization', `Bearer ${tokenFor('USER')}`)
    expect(res.status).toBe(403)
    expect(mockUser.findMany).not.toHaveBeenCalled()
  })
})

describe('GET /api/admin/users', () => {
  it('retourne les utilisateurs sans mot de passe', async () => {
    mockUser.findMany.mockResolvedValue([{ id: 'u1', email: 'a@b.c', role: 'USER' }])

    const res = await request(app)
      .get('/api/admin/users')
      .set('Authorization', `Bearer ${tokenFor('ADMIN')}`)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
    expect(mockUser.findMany.mock.calls[0][0].select.password).toBeUndefined()
  })
})

describe('DELETE /api/admin/listings/:id', () => {
  it('supprime une annonce quel que soit son auteur', async () => {
    mockListing.findUnique.mockResolvedValue({ id: 'l1' })
    mockListing.delete.mockResolvedValue({})

    const res = await request(app)
      .delete('/api/admin/listings/l1')
      .set('Authorization', `Bearer ${tokenFor('ADMIN')}`)

    expect(res.status).toBe(200)
    expect(mockListing.delete).toHaveBeenCalledWith({ where: { id: 'l1' } })
  })

  it('retourne 404 si l\'annonce n\'existe pas', async () => {
    mockListing.findUnique.mockResolvedValue(null)

    const res = await request(app)
      .delete('/api/admin/listings/inconnue')
      .set('Authorization', `Bearer ${tokenFor('ADMIN')}`)

    expect(res.status).toBe(404)
    expect(mockListing.delete).not.toHaveBeenCalled()
  })
})
