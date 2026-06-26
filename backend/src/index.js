import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import authRoutes from './routes/auth.js'
import listingRoutes from './routes/listings.js'
import errorHandler from './middleware/errorHandler.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

const format = process.env.NODE_ENV === 'production' ? 'combined' : 'dev'
app.use(morgan(format))

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })
app.use(limiter)

app.use('/api/auth', authRoutes)
app.use('/api/listings', listingRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'RoomMate API is running' })
})

app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' })
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] Server running on port ${PORT}`)
})
