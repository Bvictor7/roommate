import app from './app.js'

const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] Server running on port ${PORT}`)
})

server.on('error', (err) => {
  console.error('Server error:', err.message)
  process.exit(1)
})
