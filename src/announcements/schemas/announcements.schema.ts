import mongoose from 'mongoose'
import { v4 } from 'uuid'

export const AnnouncementSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    content: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      require: true,
    },
  },
  {
    collection: 'announcement',
    timestamps: true,
  },
)
