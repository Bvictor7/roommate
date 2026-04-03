import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'
import authRoutes from './routes/auth.js'
import listingRoutes from './routes/listings.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })
app.use(limiter)

app.use('/api/auth', authRoutes)
app.use('/api/listings', listingRoutes)


app.get('/', (req, res) => {
  res.json({ message: 'RoomMate API is running' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})