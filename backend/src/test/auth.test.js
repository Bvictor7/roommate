import { describe, it, expect, vi, beforeEach } from 'vitest'

// On mock avant tout import
const mockUser = {
  findUnique: vi.fn(),
  create: vi.fn(),
}

vi.mock('@prisma/client', () => {
  function PrismaClient() {}
  PrismaClient.prototype.user = mockUser
  return { PrismaClient }
})

vi.mock('bcrypt', () => ({
  default: {
    hash: vi.fn().mockResolvedValue('hashed_password'),
    compare: vi.fn(),
  }
}))

vi.mock('jsonwebtoken', () => ({
  default: {
    sign: vi.fn().mockReturnValue('fake_jwt_token'),
    verify: vi.fn(),
  }
}))

process.env.JWT_SECRET = 'test_secret'

import bcrypt from 'bcrypt'

// On importe le service APRES les mocks
const authService = await import('../services/auth.service.js')

beforeEach(() => {
  vi.clearAllMocks()
  mockUser.findUnique.mockReset()
  mockUser.create.mockReset()
})

describe('auth.service — register', () => {
  it('crée un utilisateur et retourne un token', async () => {
    mockUser.findUnique.mockResolvedValue(null)
    mockUser.create.mockResolvedValue({
      id: 'user-1', email: 'test@test.com', username: 'test', role: 'USER'
    })

    const result = await authService.register('test@test.com', 'password123', 'test')

    expect(mockUser.findUnique).toHaveBeenCalledWith({ where: { email: 'test@test.com' } })
    expect(result).toHaveProperty('token')
    expect(result.user.email).toBe('test@test.com')
  })

  it('lance une erreur si email déjà utilisé', async () => {
    mockUser.findUnique.mockResolvedValue({ id: 'user-1' })

    await expect(authService.register('test@test.com', 'password123', 'test'))
      .rejects.toThrow('Cet email est déjà utilisé')
  })

  it('hache le mot de passe avant de sauvegarder', async () => {
    mockUser.findUnique.mockResolvedValue(null)
    mockUser.create.mockResolvedValue({
      id: 'user-1', email: 'test@test.com', username: 'test', role: 'USER'
    })

    await authService.register('test@test.com', 'password123', 'test')

    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 12)
    expect(mockUser.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ password: 'hashed_password' })
      })
    )
  })
})

describe('auth.service — login', () => {
  it('retourne un token si identifiants valides', async () => {
    mockUser.findUnique.mockResolvedValue({
      id: 'user-1', email: 'test@test.com', username: 'test',
      password: 'hashed', role: 'USER'
    })
    bcrypt.compare.mockResolvedValue(true)

    const result = await authService.login('test@test.com', 'password123')

    expect(result).toHaveProperty('token')
    expect(result.user.email).toBe('test@test.com')
  })

  it('lance une erreur si utilisateur introuvable', async () => {
    mockUser.findUnique.mockResolvedValue(null)

    await expect(authService.login('inconnu@test.com', 'password123'))
      .rejects.toThrow('Email ou mot de passe incorrect')
  })

  it('lance une erreur si mauvais mot de passe', async () => {
    mockUser.findUnique.mockResolvedValue({ id: 'user-1', password: 'hashed' })
    bcrypt.compare.mockResolvedValue(false)

    await expect(authService.login('test@test.com', 'mauvaismdp'))
      .rejects.toThrow('Email ou mot de passe incorrect')
  })
})

describe('auth.service — getMe', () => {
  it('retourne le profil utilisateur', async () => {
    mockUser.findUnique.mockResolvedValue({
      id: 'user-1', email: 'test@test.com', username: 'test'
    })

    const result = await authService.getMe('user-1')

    expect(mockUser.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: 'user-1' } })
    )
    expect(result.email).toBe('test@test.com')
  })
})