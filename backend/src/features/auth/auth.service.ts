import jwt from 'jsonwebtoken'

import { Types } from 'mongoose'

import { env } from '@/config/env'

import { AuthQueries } from './auth.queries'

export type TokenPayload = {
  id: string
}

function createAccessToken(payload: TokenPayload) {
  const token = jwt.sign(payload, env.SECRET_KEY, {
    expiresIn: 15 * 60
  })
  return token
}

function verifyAccessToken(token: string) {
  const payload = jwt.verify(token, env.SECRET_KEY) as TokenPayload
  return payload
}

async function createRefreshToken(id: string) {
  const { token } = await AuthQueries.createToken({
    token: crypto.randomUUID(),
    userId: new Types.ObjectId(id),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  })
  return token
}

async function verifyRefreshToken(token: string) {
  const tkn = await AuthQueries.getTokenByToken(token)
  if (!tkn) {
    return null
  }
  return {
    id: String(tkn.userId)
  }
}

export const AuthService = {
  createAccessToken,
  verifyAccessToken,
  createRefreshToken,
  verifyRefreshToken
}
