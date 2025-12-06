import type z from 'zod'

import type { loginSchema, registerSchema } from '@/features/auth/schema'
import type { sendMessageSchema } from '@/features/chat/schema'

import { API } from './axios'

/*
  Auth API Endpoints
*/

/*
  Register User
*/
export function registerMutation(data: z.infer<typeof registerSchema>) {
  return API.post('/api/v1/auth/register', data)
}

/*
  Login User
*/
export async function loginMutation(data: z.infer<typeof loginSchema>) {
  return await API.post('/api/v1/auth/login', data)
}

/*
  Logout User
*/
export async function logoutMutation() {
  return await API.delete('/api/v1/auth/logout')
}

/*
  Get Session
*/
export async function sessionQuery() {
  return await API.get('/api/v1/auth/session')
}

/*
  User API Endpoints
*/

/*
  Update Profile
*/
export async function updateProfileMutation(data: FormData) {
  return await API.patch('/api/v1/users', data)
}

/*
  Get Users
*/
export async function usersQuery() {
  return await API.get('/api/v1/users')
}

/*
  Get Users
*/
export async function userQuery(id: string) {
  return await API.get(`/api/v1/users/${id}`)
}

/*
  Message API Endpoints
*/

/*
  Send Message
*/
type MessagePayload = {
  id: string
  data: z.infer<typeof sendMessageSchema> | FormData
}

export async function sendMessageMutation(payload: MessagePayload) {
  return await API.post(`/api/v1/messages/${payload.id}`, payload.data)
}

/*
  Get Messages
*/
export async function messagesQuery(id: string) {
  return await API.get(`/api/v1/messages/${id}`)
}
