import mongoose from 'mongoose'
import uuidV4 from 'uuid/v4'

export const SMSSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidV4,
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
