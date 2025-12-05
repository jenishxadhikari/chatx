import { User } from '@/db/schema/user'

import { UserSchema } from './user.schema'

async function getUserByEmail(email: string) {
  const user = await User.findOne({ email })
  return user
}

async function getUserById(id: string) {
  const user = await User.findById(id)
  return UserSchema.safeUserSchema.parse(user)
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

export const UserQueries = {
  getUserByEmail,
  getUserById,
  createUser
}
