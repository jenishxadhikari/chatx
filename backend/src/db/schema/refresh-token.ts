import { model, Schema, Types } from 'mongoose'

const refreshTokenSchema = new Schema(
  {
    token: {
      type: String,
      unique: true,
      required: true
    },
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true
    },
    expiresAt: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export const RefreshToken = model('RefreshToken', refreshTokenSchema)
