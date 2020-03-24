import mongoose from 'mongoose'
import uuidV4 from 'uuid/v4'

export const MottoSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidV4,
    },
    motto: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'motto',
    timestamps: true,
  },
)
