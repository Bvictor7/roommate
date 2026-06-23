import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function register(email, password, username) {
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    const error = new Error('Cet email est déjà utilisé')
    error.status = 400
    throw error
  }

  const hash = await bcrypt.hash(password, 12)
  const user = await prisma.user.create({
    data: { email, password: hash, username }
  })

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })

  return {
    token,
    user: { id: user.id, username: user.username, email: user.email }
  }
}

export async function login(email, password) {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    const error = new Error('Email ou mot de passe incorrect')
    error.status = 401
    throw error
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    const error = new Error('Email ou mot de passe incorrect')
    error.status = 401
    throw error
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })

  return {
    token,
    user: { id: user.id, username: user.username, email: user.email }
  }
}

export async function getMe(userId) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, username: true }
  })
}