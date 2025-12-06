import z from 'zod'

const safeUserSchema = z.object({
  id: z.string({ error: 'Id is required.' }),
  name: z.string({ error: 'Name is required.' }),
  email: z.string({ error: 'Email is required.' }),
  avatar: z.string({ error: 'Avatar is required.' }),
  createdAt: z.date({ error: 'Created At is required.' }),
  updatedAt: z.date({ error: 'Updated At is required.' })
})

const safeUsersSchema = z.array(safeUserSchema)

export const UserSchema = {
  safeUserSchema,
  safeUsersSchema
}
