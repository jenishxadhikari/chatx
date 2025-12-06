import { Types } from "mongoose"

import { Message } from "@/db/schema/message"

type GetMessages = {
  senderId: Types.ObjectId
  recieverId: Types.ObjectId
}

async function getMessages({ senderId, recieverId }: GetMessages) {
  const messages = await Message.find({
    $or: [
      { senderId: senderId, recieverId: recieverId },
      { senderId: recieverId, recieverId: senderId }
    ]
  })
  return messages
}

type CreateMessage = {
  senderId: Types.ObjectId
  recieverId: Types.ObjectId
  text?: string
  image?: string
}

async function createMessage({ senderId, recieverId, text, image }: CreateMessage) {
  const message = await Message.create({
    senderId,
    recieverId,
    text,
    image
  })
  return message
}

export const MessageQueries = {
  getMessages,
  createMessage
}