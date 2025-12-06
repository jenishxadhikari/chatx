import type z from 'zod'

import type { loginSchema, registerSchema } from '@/features/auth/schema'

import { API } from './axios'

/*
  Auth API Endpoints
*/

/*
  Register User
*/
export function registerMutation(data: z.infer<typeof registerSchema>) {
  return API.post('/v1/auth/register', data)
}

/*
  Login User
*/
export async function loginMutation(data: z.infer<typeof loginSchema>) {
  return await API.post('/v1/auth/login', data)
}

/*
  Logout User
*/
export async function logoutMutation() {
  return await API.delete('/v1/auth/logout')
}

/*
  Get Session
*/
export function sessionQuery() {
  return API.get('/v1/auth/session')
}

/*
  User API Endpoints
*/
export async function updateProfileMutation(data: FormData) {
  return await API.patch('/v1/users', data)
}
