import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })
app.use(limiter)

app.get('/', (req, res) => res.send('ok'))
const server = app.listen(5000, () => console.log('Express + middlewares up'))
