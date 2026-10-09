import { createContext, useContext } from 'react'

export const SocketContext = createContext(null)

// Retourne l'instance Socket.io, ou null si l'utilisateur n'est pas connecté
export const useSocket = () => useContext(SocketContext)
