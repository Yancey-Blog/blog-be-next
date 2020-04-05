import mongoose from 'mongoose'
import { v4 } from 'uuid'

export const MottoSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'motto',
    timestamps: true,
  },
)
