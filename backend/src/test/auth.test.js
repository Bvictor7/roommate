import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import app from '../app.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const testUser = {
  email: `test_${Date.now()}@roommate.test`,
  password: 'password123',
  username: `testuser_${Date.now()}`,
}

let authToken = ''

afterAll(async () => {
  await prisma.user.deleteMany({ where: { email: testUser.email } })
  await prisma.$disconnect()
})

describe('POST /api/auth/register', () => {
  it('crée un compte et retourne un token', async () => {
    const res = await request(app).post('/api/auth/register').send(testUser)
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('token')
    expect(res.body.user.email).toBe(testUser.email)
  })

  it('refuse si email déjà utilisé', async () => {
    const res = await request(app).post('/api/auth/register').send(testUser)
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('message')
  })

  it('refuse si email invalide', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: 'pasunemail',
      password: 'password123',
      username: 'testuser',
    })
    expect(res.status).toBe(400)
  })

  it('refuse si password trop court', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: 'autre@test.com',
      password: '123',
      username: 'testuser',
    })
    expect(res.status).toBe(400)
  })
})

describe('POST /api/auth/login', () => {
  it('connecte et retourne un token', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: testUser.email,
      password: testUser.password,
    })
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('token')
    authToken = res.body.token
  })

  it('refuse si mauvais mot de passe', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: testUser.email,
      password: 'mauvaismdp',
    })
    expect(res.status).toBe(401)
  })

  it('refuse si email inconnu', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'inconnu@test.com',
      password: 'password123',
    })
    expect(res.status).toBe(401)
  })
})

describe('GET /api/auth/me', () => {
  it('retourne le profil avec token valide', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${authToken}`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('email', testUser.email)
  })

  it('refuse sans token', async () => {
    const res = await request(app).get('/api/auth/me')
    expect(res.status).toBe(401)
  })
})
