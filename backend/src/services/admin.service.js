import prisma from '../lib/prisma.js'

export async function getUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      email: true,
      username: true,
      role: true,
      avatar: true,
      createdAt: true,
      _count: { select: { listings: true } }
    },
    orderBy: { createdAt: 'desc' }
  })
}

export async function deleteListing(id) {
  const listing = await prisma.listing.findUnique({
    where: { id },
    select: { id: true }
  })
  if (!listing) {
    const error = new Error('Annonce non trouvée')
    error.status = 404
    throw error
  }

  await prisma.listing.delete({ where: { id } })
}
