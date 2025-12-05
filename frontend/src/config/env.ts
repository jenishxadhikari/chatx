import { z } from 'zod'

const envSchema = z.object({
  API_URL: z.string({ error: 'API_URL is required.' }).nonempty(),
  BASE_URL: z.string({ error: 'BASE_URL is required.' }).nonempty()
})

export const env = envSchema.parse({
  API_URL: import.meta.env.VITE_API_URL,
  BASE_URL: import.meta.env.VITE_BASE_URL
})
