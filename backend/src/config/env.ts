import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
  PORT: z.string({ error: 'PORT is required.' }).optional().default('8080'),
  NODE_ENV: z
    .enum(['development', 'production'], { error: 'NODE_ENV is required.' })
    .optional()
    .default('development'),
  APP_ORIGIN: z.string({ error: 'APP_ORIGIN is required.' }).nonempty(),
  DATABASE_URL: z.string({ error: 'DATABASE_URL is required.' }).nonempty()
})

export const env = envSchema.parse({
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  APP_ORIGIN: process.env.APP_ORIGIN,
  DATABASE_URL: process.env.DATABASE_URL
})
