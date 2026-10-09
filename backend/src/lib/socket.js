import { Server } from 'socket.io'
import jwt from 'jsonwebtoken'
import prisma from './prisma.js'

export let io = null

const userRoom = (userId) => `user:${userId}`

export function initSocket(httpServer) {
  io = new Server(httpServer, {
    cors: { origin: process.env.FRONTEND_URL },
  })

  // Authentification par JWT à la connexion
  io.use((socket, next) => {
    try {
      const { token } = socket.handshake.auth
      socket.data.user = jwt.verify(token, process.env.JWT_SECRET)
      next()
    } catch {
      next(new Error('Non autorisé'))
    }
  })

  // Chaque membre rejoint la room de ses colocations
  io.on('connection', async (socket) => {
    const { userId } = socket.data.user
    try {
      socket.join(userRoom(userId))
      const memberships = await prisma.colocationMember.findMany({
        where: { userId },
        select: { colocationId: true },
      })
      memberships.forEach(({ colocationId }) => socket.join(colocationId))
    } catch (err) {
      console.error(`[${new Date().toISOString()}] Socket join error: ${err.message}`)
      socket.disconnect(true)
    }
  })

  return io
}

// Sans effet tant que Socket.io n'est pas initialisé (ex. tests)
export function emitToColocation(colocationId, event, payload) {
  io?.to(colocationId).emit(event, payload)
}

// Ajoute les sockets déjà connectés d'un utilisateur à la room d'une colocation qu'il vient de créer ou rejoindre
export function joinColocationRoom(userId, colocationId) {
  io?.in(userRoom(userId)).socketsJoin(colocationId)
}
