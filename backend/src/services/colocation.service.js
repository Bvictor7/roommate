import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createColocation(userId, name) {
  const colocation = await prisma.colocation.create({
    data: {
      name,
      members: {
        create: { userId, role: 'admin' }
      }
    },
    include: { members: true }
  })
  return colocation
}

export async function joinColocation(userId, inviteCode) {
  const colocation = await prisma.colocation.findUnique({ where: { inviteCode } })
  if (!colocation) {
    const error = new Error('Colocation non trouvée')
    error.status = 404
    throw error
  }

  const existingMember = await prisma.colocationMember.findFirst({
    where: { colocationId: colocation.id, userId }
  })
  if (existingMember) {
    const error = new Error('Vous êtes déjà membre de cette colocation')
    error.status = 400
    throw error
  }

  return prisma.colocationMember.create({
    data: { userId, colocationId: colocation.id, role: 'member' }
  })
}

export async function getMyColocation(userId) {
  const member = await prisma.colocationMember.findFirst({
    where: { userId },
    include: {
      colocation: {
        include: {
          members: { include: { user: { select: { id: true, username: true, email: true, avatar: true } } } }
        }
      }
    }
  })
  if (!member) {
    const error = new Error('Aucune colocation trouvée')
    error.status = 404
    throw error
  }
  return member.colocation
}

export async function getColocationById(id) {
  const colocation = await prisma.colocation.findUnique({
    where: { id },
    include: {
      members: { include: { user: { select: { id: true, username: true, email: true, avatar: true } } } }
    }
  })
  if (!colocation) {
    const error = new Error('Colocation non trouvée')
    error.status = 404
    throw error
  }
  return colocation
}
