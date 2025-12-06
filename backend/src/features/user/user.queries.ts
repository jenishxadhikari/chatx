import { User } from '@/db/schema/user'

import { UserSchema } from './user.schema'
import { Types } from 'mongoose'

async function getUserByEmail(email: string) {
  const user = await User.findOne({ email })
  return user
}

async function getUserById(id: string) {
  const user = await User.findById(id)
  return UserSchema.safeUserSchema.parse(user)
}

async function getUsersForSidebar(userId: string) {
  const users = await User.find({ _id: { $ne: new Types.ObjectId(userId) } })
  return UserSchema.safeUsersSchema.parse(users)
}

type CreateUser = {
  name: string
  email: string
  password: string
}

async function createUser({ name, email, password }: CreateUser) {
  const user = await User.create({
    name,
    email,
    password
  })
  return UserSchema.safeUserSchema.parse(user)
}

type UpdateProfile = {
  id: Types.ObjectId,
  avatar: string
}

async function updateProfile({ id, avatar }: UpdateProfile) {
  const user = await User.findByIdAndUpdate(id, {
    avatar
  }, { new: true })
  return UserSchema.safeUserSchema.parse(user)
}

export const UserQueries = {
  getUserByEmail,
  getUserById,
  createUser,
  updateProfile,
  getUsersForSidebar
}
