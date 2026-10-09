import http from 'http'
import app from './app.js'
import { initSocket } from './lib/socket.js'

const PORT = process.env.PORT || 3000

const server = http.createServer(app)
initSocket(server)

server.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] Server running on port ${PORT}`)
})

server.on('error', (err) => {
  console.error('Server error:', err.message)
  process.exit(1)
})
