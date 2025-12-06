import fs from 'fs'
import { Types } from 'mongoose'

import type { Request, Response } from 'express'

import { cloudinary } from '@/lib/cloudinary'
import { asyncHandler } from '@/lib/async-handler'
import { getReceiverSocketId, io } from '@/lib/socket'
import { CustomError } from '@/lib/api-error'
import { StatusCodes } from '@/config/http-status-codes'

import { MessageQueries } from './message.queries'

/*
    GET /api/v1/messages/:id - Get Messages
*/
const getMessages = asyncHandler(async (req: Request, res: Response) => {
  const { id: recieverId } = req.params
  const senderId = req.user.id

  const messages = await MessageQueries.getMessages({
    senderId: new Types.ObjectId(senderId),
    recieverId: new Types.ObjectId(recieverId)
  })

  return res.status(StatusCodes.OK).json({
    data: {
      ...messages
    },
    message: 'Messages fetched successfully.'
  })
})

/*
    POST /api/v1/messages/:id - Send Message
*/
const sendMessage = asyncHandler(async (req: Request, res: Response) => {
  const { id: recieverId } = req.params
  const senderId = req.user.id
  const data = req.body
  const image = req.file
  const text = data?.text
  if (!image && !data && !text) {
    throw new CustomError.BadRequestError('Message cannot be empty.')
  }

  let imageUrl
  if (image) {
    const imagePath = image.path
    const uploadImage = await cloudinary.uploader.upload(imagePath)
    imageUrl = uploadImage.secure_url
    fs.unlinkSync(image.path)
  }

  const message = await MessageQueries.createMessage({
    senderId: new Types.ObjectId(senderId),
    recieverId: new Types.ObjectId(recieverId),
    text,
    image: imageUrl
  })

  const recieverSocketId = getReceiverSocketId(recieverId)
  if (recieverId) {
    io.to(recieverSocketId).emit('newMessage', message)
  }

  return res.status(StatusCodes.CREATED).json({
    data: {
      ...message
    },
    message: 'Message sent successfully.'
  })
})

export const MessageController = {
  getMessages,
  sendMessage
}