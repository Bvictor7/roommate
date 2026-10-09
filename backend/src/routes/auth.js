import express from 'express'
import auth from '../middleware/auth.js'
import validate from '../middleware/validate.js'
import { registerSchema, loginSchema } from '../schemas/auth.schema.js'
import * as authService from '../services/auth.service.js'

const router = express.Router()

router.post('/register', validate(registerSchema), async (req, res, next) => {
  try {
    const { email, password, username } = req.body
    const result = await authService.register(email, password, username)
    res.status(201).json({ message: 'Compte créé', ...result })
  } catch (err) { next(err) }
})

router.post('/login', validate(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body
    const result = await authService.login(email, password)
    res.json(result)
  } catch (err) { next(err) }
})

router.get('/me', auth, async (req, res, next) => {
  try {
    const user = await authService.getMe(req.user.userId)
    res.json(user)
  } catch (err) { next(err) }
})

export default router
