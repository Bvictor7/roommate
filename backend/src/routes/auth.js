import express from 'express'
import auth from '../middleware/auth.js'
import validate from '../middleware/validate.js'
import { registerSchema, loginSchema } from '../schemas/auth.schema.js'
import * as authService from '../services/auth.service.js'

const router = express.Router()

router.post('/register', validate(registerSchema), async (req, res) => {
  try {
    const { email, password, username } = req.body
    const result = await authService.register(email, password, username)
    res.status(201).json({ message: 'Compte créé', ...result })
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message })
  }
})

router.post('/login', validate(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body
    const result = await authService.login(email, password)
    res.json(result)
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message })
  }
})

router.get('/me', auth, async (req, res) => {
  try {
    const user = await authService.getMe(req.user.userId)
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

export default router