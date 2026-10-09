import 'dotenv/config'
import * as Sentry from '@sentry/node'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import passport from './config/passport.js'
import authRoutes from './routes/auth.js'
import listingRoutes from './routes/listings.js'
import oauthRoutes from './routes/oauth.js'
import colocationRoutes from './routes/colocations.js'
import errorHandler from './middleware/errorHandler.js'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV || 'development',
  tracesSampleRate: 1.0,
})

const app = express()

app.use(cors())
app.use(express.json())
app.use(helmet())

if (process.env.NODE_ENV !== 'test') {
  const format = process.env.NODE_ENV === 'production' ? 'combined' : 'dev'
  app.use(morgan(format))
}

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })
app.use(limiter)

app.use(passport.initialize())

app.use('/api/auth', authRoutes)
app.use('/api/auth', oauthRoutes)
app.use('/api/listings', listingRoutes)
app.use('/api/colocation', colocationRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'RoomMate API is running' })
})

app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' })
})

app.use(Sentry.expressErrorHandler())
app.use(errorHandler)

export default app
