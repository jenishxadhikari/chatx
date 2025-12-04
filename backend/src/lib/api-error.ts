import type { Response } from 'express'

import { StatusCodes } from '@/config/http-status-codes'

export class ApiError extends Error {
  statusCode: number
  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode

    Object.setPrototypeOf(this, new.target.prototype)
    Error.captureStackTrace(this, this.constructor)
  }

  static handle(err: ApiError, res: Response) {
    return res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || 'Internal Server Error'
    })
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string = 'Bad Request') {
    super(StatusCodes.BAD_REQUEST, message)
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = 'Unauthorized') {
    super(StatusCodes.UNAUTHORIZED, message)
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = 'Forbidden') {
    super(StatusCodes.FORBIDDEN, message)
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = 'Not Found') {
    super(StatusCodes.NOT_FOUND, message)
  }
}

export class TooManyRequestsError extends ApiError {
  constructor(message: string = 'Too Many Requests Error') {
    super(StatusCodes.TOO_MANY_REQUESTS, message)
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string = 'Internal Server Error') {
    super(StatusCodes.INTERNAL_SERVER_ERROR, message)
  }
}

export const CustomError = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  TooManyRequestsError,
  InternalServerError
}
