import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getListings({ city, type, minPrice, maxPrice }) {
  return prisma.listing.findMany({
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
}

export async function getListingById(id) {
  const listing = await prisma.listing.findUnique({
    where: { id },
    include: { user: { select: { id: true, username: true, avatar: true } } }
  })
  if (!listing) {
    const error = new Error('Annonce non trouvée')
    error.status = 404
    throw error
  }
  return listing
}

export async function createListing(data, userId) {
  const { title, description, type, city, postalCode, price, charges, availableDate } = data
  return prisma.listing.create({
    data: {
      title, description, type, city, postalCode,
      price: parseFloat(price),
      charges: charges ? parseFloat(charges) : null,
      availableDate: new Date(availableDate),
      userId
    }
  })
}

export async function updateListing(id, data, userId) {
  const listing = await prisma.listing.findUnique({ where: { id } })
  if (!listing) {
    const error = new Error('Annonce non trouvée')
    error.status = 404
    throw error
  }
  if (listing.userId !== userId) {
    const error = new Error("Action interdite : vous n'êtes pas l'auteur")
    error.status = 403
    throw error
  }

  const { title, description, type, city, postalCode, price, charges, availableDate } = data
  return prisma.listing.update({
    where: { id },
    data: {
      title, description, type, city, postalCode,
      price: parseFloat(price),
      charges: charges ? parseFloat(charges) : null,
      availableDate: new Date(availableDate)
    }
  })
}

export async function deleteListing(id, userId) {
  const listing = await prisma.listing.findUnique({ where: { id } })
  if (!listing) {
    const error = new Error('Annonce non trouvée')
    error.status = 404
    throw error
  }
  if (listing.userId !== userId) {
    const error = new Error('Action interdite')
    error.status = 403
    throw error
  }

  await prisma.listing.delete({ where: { id } })
}