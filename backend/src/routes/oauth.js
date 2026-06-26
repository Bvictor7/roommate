import express from 'express'
import passport from '../config/passport.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
)

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign(
      { userId: req.user.id, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.redirect(`${process.env.FRONTEND_URL}/oauth/callback?token=${token}`)
  }
)

export default router