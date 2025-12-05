import z, { ZodError, ZodType } from 'zod'

import type { Request, Response, NextFunction } from 'express'

import { CustomError } from '@/lib/api-error'

export function validation(schema: ZodType) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('[VALIDATION_ERROR] : ', error)

        const message = z.prettifyError(error)
        throw new CustomError.BadRequestError(message)
      }
      next(error)
    }
  }
}
