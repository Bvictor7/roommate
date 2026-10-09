import { PrismaClient } from '@prisma/client'

// Instance unique partagée : le cache des modules ES garantit qu'elle n'est créée qu'une fois
const prisma = new PrismaClient()

export default prisma
