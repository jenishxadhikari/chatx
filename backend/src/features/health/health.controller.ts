import mongoose from 'mongoose'

import type { Request, Response } from 'express'

import { StatusCodes } from '@/config/http-status-codes'
import { CustomError } from '@/lib/api-error'
import { asyncHandler } from '@/lib/async-handler'

/*
    GET /api/v1/health - GET Health
*/
const health = asyncHandler(async (req: Request, res: Response) => {
  const status = mongoose.connection.readyState === 1

  if (!status) {
    throw new CustomError.InternalServerError('Database connection failed.')
  }

  return res.status(StatusCodes.OK).json({
    message: 'Server Active.'
  })
})

export const HealthController = {
  health
}
