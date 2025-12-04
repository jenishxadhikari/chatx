import express from 'express'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'

import type { Request, Response } from 'express'

import { corsOptions } from '@/lib/cors'

const app = express()

app.use(cors(corsOptions))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compression())

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Hello World'
  })
})

export { app }
