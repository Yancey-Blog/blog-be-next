import mongoose from 'mongoose'
import uuidV4 from 'uuid/v4'

export const LiveToursSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidV4,
    },
    title: {
      type: String,
      required: true,
    },
    posterUrl: {
      type: String,
      required: true,
    },
    showTime: {
      type: Date,
      required: true,
    },
  },
  {
    collection: 'live_tours',
    timestamps: true,
  },
)
