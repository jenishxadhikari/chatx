import { RefreshToken } from '@/db/schema/refresh-token'
import type { Types } from 'mongoose'

type CreateToken = {
  token: string
  userId: Types.ObjectId
  expiresAt: Date
}

async function createToken({ token, userId, expiresAt }: CreateToken) {
  const tkn = await RefreshToken.create({
    token,
    userId,
    expiresAt
  })
  return tkn
}

async function deleteToken(token: string) {
  return await RefreshToken.deleteOne({
    token
  })
}

async function getTokenByToken(token: string) {
  const tkn = await RefreshToken.findOne({
    token
  })
  return tkn
}

export const AuthQueries = {
  createToken,
  deleteToken,
  getTokenByToken
}
