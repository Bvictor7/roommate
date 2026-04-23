import express from 'express'
import { PrismaClient } from '@prisma/client'
import auth from '../middleware/auth.js'
import validate from '../middleware/validate.js'
import { listingSchema } from '../schemas/listing.schema.js'

const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  const { city, type, minPrice, maxPrice } = req.query
  const listings = await prisma.listing.findMany({
    where: {
      status: 'active',
      ...(city && { city: { contains: city, mode: 'insensitive' } }),
      ...(type && { type }),
      ...(minPrice && { price: { gte: parseFloat(minPrice) } }),
      ...(maxPrice && { price: { lte: parseFloat(maxPrice) } }),
    },
    include: { user: { select: { id: true, username: true, avatar: true } } },
    orderBy: { createdAt: 'desc' }
  })
  res.json(listings)
})

router.get('/:id', async (req, res) => {
  const listing = await prisma.listing.findUnique({
    where: { id: req.params.id },
    include: { user: { select: { id: true, username: true, avatar: true } } }
  })
  if (!listing) return res.status(404).json({ message: 'Annonce non trouvée' })
  res.json(listing)
})

router.post('/', auth, validate(listingSchema), async (req, res) => {
  try {
    const { title, description, type, city, postalCode, price, charges, availableDate } = req.body
    const listing = await prisma.listing.create({
      data: {
        title, description, type, city, postalCode,
        price: parseFloat(price),
        charges: charges ? parseFloat(charges) : null,
        availableDate: new Date(availableDate),
        userId: req.user.userId
      }
    })
    res.status(201).json(listing)
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création' })
  }
})

router.put('/:id', auth, validate(listingSchema), async (req, res) => {
  try {
    const listing = await prisma.listing.findUnique({ where: { id: req.params.id } })
    
    if (!listing) return res.status(404).json({ message: 'Annonce non trouvée' })
    if (listing.userId !== req.user.userId) return res.status(403).json({ message: 'Action interdite : vous n\'êtes pas l\'auteur' })

    const { title, description, type, city, postalCode, price, charges, availableDate } = req.body

    const updated = await prisma.listing.update({
      where: { id: req.params.id },
      data: {
        title, description, type, city, postalCode,
        price: parseFloat(price),
        charges: charges ? parseFloat(charges) : null,
        availableDate: new Date(availableDate)
      }
    })
    res.json(updated)
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la modification' })
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    const listing = await prisma.listing.findUnique({ where: { id: req.params.id } })
    
    if (!listing) return res.status(404).json({ message: 'Annonce non trouvée' })
    if (listing.userId !== req.user.userId) return res.status(403).json({ message: 'Action interdite' })

    await prisma.listing.delete({ where: { id: req.params.id } })
    res.json({ message: 'Annonce supprimée avec succès' })
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression' })
  }
})

export default router