import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const LISTING_CARD_SELECT = {
  id: true,
  title: true,
  type: true,
  city: true,
  postalCode: true,
  price: true,
  charges: true,
  availableDate: true,
  photos: true,
  status: true,
  createdAt: true,
  user: { select: { id: true, username: true, avatar: true } }
}

const PAGE_SIZE = 12

export async function getListings({ city, type, minPrice, maxPrice, page = 1 }) {
  const pageNumber = Math.max(1, parseInt(page))
  const skip = (pageNumber - 1) * PAGE_SIZE

  const where = {
    status: 'active',
    ...(city && { city: { contains: city, mode: 'insensitive' } }),
    ...(type && { type }),
    ...(minPrice && { price: { gte: parseFloat(minPrice) } }),
    ...(maxPrice && { price: { lte: parseFloat(maxPrice) } }),
  }

  const [listings, total] = await Promise.all([
    prisma.listing.findMany({
      where,
      select: LISTING_CARD_SELECT,
      orderBy: { createdAt: 'desc' },
      take: PAGE_SIZE,
      skip
    }),
    prisma.listing.count({ where })
  ])

  return {
    data: listings,
    pagination: {
      page: pageNumber,
      pageSize: PAGE_SIZE,
      total,
      totalPages: Math.ceil(total / PAGE_SIZE)
    }
  }
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
  const listing = await prisma.listing.findUnique({
    where: { id },
    select: { userId: true }
  })
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
  const listing = await prisma.listing.findUnique({
    where: { id },
    select: { userId: true }
  })
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
