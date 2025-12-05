import z from 'zod'
import { Types } from 'mongoose'

import type { Request, Response } from 'express'

import { cloudinary } from '@/lib/cloudinary'
import { asyncHandler } from '@/lib/async-handler'
import { StatusCodes } from '@/config/http-status-codes'

import { UserQueries } from './user.queries'
import { UserSchema } from './user.schema'

/*
    GET /api/v1/users - Get Users
*/
const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user
  const users = await UserQueries.getUsersForSidebar(user.id)

  return res.status(StatusCodes.OK).json({
    data: {
      ...users
    },
    message: 'Users fetched successfully.'
  })
})

const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user
  const { avatar }: z.infer<typeof UserSchema.updateUserSchema> = req.body

  const uploadAvatar = await cloudinary.uploader.upload(avatar)
  const updatedUser = await UserQueries.updateUser({
    id: new Types.ObjectId(user.id),
    avatar: uploadAvatar.secure_url
  })

  return res.status(StatusCodes.OK).json({
    data: {
      ...updatedUser
    },
    message: 'Users fetched successfully.'
  })
})

export const UserController = {
  getUsers,
  updateProfile
}