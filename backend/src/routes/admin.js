import express from 'express'
import auth, { requireAdmin } from '../middleware/auth.js'
import * as adminService from '../services/admin.service.js'

const router = express.Router()

router.use(auth, requireAdmin)

router.get('/users', async (req, res, next) => {
  try {
    const users = await adminService.getUsers()
    res.json(users)
  } catch (err) { next(err) }
})

router.delete('/listings/:id', async (req, res, next) => {
  try {
    await adminService.deleteListing(req.params.id)
    res.json({ message: 'Annonce supprimée avec succès' })
  } catch (err) { next(err) }
})

export default router
