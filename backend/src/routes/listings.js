import express from 'express'
import auth from '../middleware/auth.js'
import validate from '../middleware/validate.js'
import { listingSchema } from '../schemas/listing.schema.js'
import * as listingService from '../services/listing.service.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const listings = await listingService.getListings(req.query)
    res.json(listings)
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const listing = await listingService.getListingById(req.params.id)
    res.json(listing)
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message })
  }
})

router.post('/', auth, validate(listingSchema), async (req, res) => {
  try {
    const listing = await listingService.createListing(req.body, req.user.userId)
    res.status(201).json(listing)
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message })
  }
})

router.put('/:id', auth, validate(listingSchema), async (req, res) => {
  try {
    const listing = await listingService.updateListing(req.params.id, req.body, req.user.userId)
    res.json(listing)
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message })
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    await listingService.deleteListing(req.params.id, req.user.userId)
    res.json({ message: 'Annonce supprimée avec succès' })
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message })
  }
})

export default router