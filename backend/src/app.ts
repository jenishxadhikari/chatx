import express from 'express'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'

import type { Request, Response, NextFunction } from 'express'

import { corsOptions } from '@/lib/cors'
import { ApiError, CustomError } from '@/lib/api-error'

import { HealthRouter } from '@/features/health/health.route'
import { AuthRouter } from '@/features/auth/auth.route'

const app = express()

app.use(cors(corsOptions))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compression())

app.use('/api/v1', HealthRouter)

app.use('/api/v1', AuthRouter)

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(error)
  if (error instanceof ApiError) {
    return ApiError.handle(error, res)
  }
  return ApiError.handle(new CustomError.InternalServerError(), res)
})

export { app }
