import mongoose from 'mongoose'
import { v4 } from 'uuid'

export const LiveToursSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
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
