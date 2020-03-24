import mongoose from 'mongoose'
import uuidV4 from 'uuid/v4'

export const AnnouncementSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidV4,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'announcement',
    timestamps: true,
  },
)
