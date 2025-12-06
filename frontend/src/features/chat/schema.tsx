import z from 'zod'

export const sendMessageSchema = z.object({
  text: z.string({ error: 'Text is required' }).nonempty()
})
