import { useEffect, useMemo } from 'react'
import { io } from 'socket.io-client'
import { useAuth } from './useAuth'
import { SocketContext } from './useSocket'

// Le serveur Socket.io est servi à la racine de l'API (VITE_API_URL se termine par /api)
const SOCKET_URL = new URL(import.meta.env.VITE_API_URL || '/', window.location.origin).origin

export function SocketProvider({ children }) {
  const { token } = useAuth()

  const socket = useMemo(
    () => (token ? io(SOCKET_URL, { auth: { token }, autoConnect: false }) : null),
    [token]
  )

  useEffect(() => {
    if (!socket) return
    socket.connect()
    return () => { socket.disconnect() }
  }, [socket])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}
