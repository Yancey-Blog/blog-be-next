import mongoose from 'mongoose'
import { v4 } from 'uuid'

export const SMSSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    verificationCode: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'sms',
    timestamps: true,
  },
)
