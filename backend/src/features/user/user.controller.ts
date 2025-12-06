import fs from 'fs'
import { Types } from 'mongoose'

import type { Request, Response } from 'express'

import { cloudinary } from '@/lib/cloudinary'
import { asyncHandler } from '@/lib/async-handler'
import { CustomError } from '@/lib/api-error'
import { StatusCodes } from '@/config/http-status-codes'

import { UserQueries } from './user.queries'

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

/*
    PATCH /api/v1/users - Update Profile
*/
const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user
  const avatar = req.file
  if (!avatar) {
    throw new CustomError.BadRequestError('Avatar file is missing.')
  }
  const avatarPath = avatar.path

  const uploadAvatar = await cloudinary.uploader.upload(avatarPath)
  fs.unlinkSync(avatar.path)

  const updatedUser = await UserQueries.updateProfile({
    id: new Types.ObjectId(user.id),
    avatar: uploadAvatar.secure_url
  })

  return res.status(StatusCodes.OK).json({
    data: {
      ...updatedUser
    },
    message: 'Profile updated successfully.'
  })
})

export const UserController = {
  getUsers,
  updateProfile
}