import argon2 from 'argon2'
import z from 'zod'

import type { Request, Response } from 'express'

import { asyncHandler } from '@/lib/async-handler'
import { CustomError } from '@/lib/api-error'
import { StatusCodes } from '@/config/http-status-codes'
import { UserQueries } from '@/features/user/user.queries'

import { AuthSchema } from './auth.schema'
import { AuthService } from './auth.service'
import { AuthQueries } from './auth.queries'

/*
    POST /api/v1/auth/register - Register User
*/
const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password }: z.infer<typeof AuthSchema.registerSchema> = req.body

  const existingUser = await UserQueries.getUserByEmail(email)
  if (existingUser) {
    throw new CustomError.BadRequestError('User on this email already exists.')
  }

  const hashedPassword = await argon2.hash(password)
  await UserQueries.createUser({
    name,
    email,
    password: hashedPassword
  })

  return res.status(StatusCodes.CREATED).json({
    message: 'Registration Successful. Proceed to login.'
  })
})

/*
    POST /api/v1/auth/login - Login User
*/
const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password }: z.infer<typeof AuthSchema.loginSchema> = req.body

  const user = await UserQueries.getUserByEmail(email)
  if (!user) {
    throw new CustomError.BadRequestError('Incorrect email or password.')
  }

  const verifyPassword = await argon2.verify(user.password, password)
  if (!verifyPassword) {
    throw new CustomError.BadRequestError('Incorrect email or password.')
  }

  const payload = {
    id: String(user.id)
  }

  const accessToken = AuthService.createAccessToken(payload)
  const refreshToken = await AuthService.createRefreshToken(user.id)

  return res
    .status(StatusCodes.OK)
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    })
    .json({
      accessToken: accessToken,
      message: 'Logged in successfully.'
    })
})

/*
    POST /api/v1/auth/logout - Logout User
*/
const logout = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken
  if (!refreshToken) {
    return res.status(StatusCodes.OK).json({
      message: 'Logged out successfully.'
    })
  }

  await AuthQueries.deleteToken(refreshToken)

  return res
    .status(StatusCodes.OK)
    .clearCookie('refreshToken', {
      httpOnly: true,
      secure: true
    })
    .json({
      message: 'Logged out successfully.'
    })
})

/*
    GET /api/v1/auth/refresh - Generate new access token
*/
const refresh = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken
  if (!refreshToken) {
    throw new CustomError.UnauthorizedError('Session expired. Please log in again.')
  }

  const payload = await AuthService.verifyRefreshToken(refreshToken)
  if (!payload) {
    throw new CustomError.UnauthorizedError('Session expired. Please log in again.')
  }

  const accessToken = AuthService.createAccessToken(payload)

  return res.status(StatusCodes.OK).json({
    accessToken: accessToken,
    message: 'Session refreshed successfully.'
  })
})

/*
    GET /api/v1/auth/session - Generate session data
*/
const session = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user
  const ip = req.ip
  const browser = req.headers['user-agent']

  return res.status(StatusCodes.OK).json({
    data: {
      ip: ip,
      browser: browser,
      user: {
        ...user
      }
    },
    message: 'User data retrieved successfully.'
  })
})

export const AuthController = {
  register,
  login,
  logout,
  refresh,
  session
}
