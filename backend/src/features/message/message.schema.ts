import z from 'zod'

const sendMessageSchema = z.object({
  text: z.string().optional()
})

export const MessageSchema = {
  sendMessageSchema
}
