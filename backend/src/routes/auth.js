import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import auth from '../middleware/auth.js'
import validate from '../middleware/validate.js'
import { registerSchema, loginSchema } from '../schemas/auth.schema.js'

const router = express.Router()
const prisma = new PrismaClient()

router.post('/register', validate(registerSchema), async (req, res) => {
  const { email, password, username } = req.body
  const hash = await bcrypt.hash(password, 12)
  const user = await prisma.user.create({
    data: { email, password: hash, username }
  })
  res.status(201).json({ message: 'Compte créé', userId: user.id })
})

router.post('/login', validate(loginSchema), async (req, res) => {
  const { email, password } = req.body
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return res.status(401).json({ message: 'Email ou mot de passe incorrect' })
  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return res.status(401).json({ message: 'Email ou mot de passe incorrect' })
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' })
  res.json({ token })
})

router.get('/me', auth, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.userId },
    select: { id: true, email: true, username: true }
  })
  res.json(user)
})

export default router