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
  try {
    const { email, password, username } = req.body
    
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' })
    }

    const hash = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: { email, password: hash, username }
    })


    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })

    res.status(201).json({ 
      message: 'Compte créé', 
      token, 
      user: { id: user.id, username: user.username, email: user.email } 
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erreur lors de la création du compte' })
  }
})

router.post('/login', validate(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body
    
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' })
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' })
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })

    res.json({ 
      token, 
      user: { 
        id: user.id, 
        username: user.username, 
        email: user.email 
      } 
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erreur lors de la connexion' })
  }
})

router.get('/me', auth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { id: true, email: true, username: true }
    })
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

export default router