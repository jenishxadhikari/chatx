import { model, Schema, Types } from 'mongoose'

const messageSchema = new Schema(
  {
    senderId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true
    },
    recieverId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true
    },
    text: {
      type: String
    },
    image: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

export const Message = model('Message', messageSchema)
