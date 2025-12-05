import { z } from 'zod'

const emailSchema = z.email({ error: 'Please enter a valid email.' }).trim()

const passwordSchema = z
  .string()
  .min(8, { error: 'Must be at least 8 characters long.' })
  .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
  .regex(/[0-9]/, { error: 'Contain at least one number.' })
  .regex(/[^a-zA-Z0-9]/, {
    error: 'Contain at least one special character.'
  })
  .trim()

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, { error: 'Please enter your password.' }).trim()
})

export const registerSchema = z
  .object({
    name: z.string().min(2, { error: 'Please enter your full name.' }).trim(),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, { error: 'Password is required.' }).trim()
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Passwords do not match.'
  })
