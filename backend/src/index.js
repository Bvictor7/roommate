import http from 'http'
import app from './app.js'
import { initSocket } from './lib/socket.js'

const PORT = process.env.PORT || 3000

const jwtSecret = process.env.JWT_SECRET
if (!jwtSecret || jwtSecret.length < 32) {
  console.error('FATAL: JWT_SECRET absent ou trop court (< 32 caractères)')
  process.exit(1)
}
if (process.env.NODE_ENV === 'production' && /change_moi|dev_secret/i.test(jwtSecret)) {
  console.error('FATAL: JWT_SECRET contient une valeur de développement en production')
  process.exit(1)
} else if (/change_moi|dev_secret/i.test(jwtSecret)) {
  console.warn('WARN: JWT_SECRET contient une valeur de développement — changez-la avant la prod')
}

const server = http.createServer(app)
initSocket(server)

server.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] Server running on port ${PORT}`)
})

server.on('error', (err) => {
  console.error('Server error:', err.message)
  process.exit(1)
})
