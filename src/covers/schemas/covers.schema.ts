import mongoose from 'mongoose'
import { v4 } from 'uuid'

export const CoverSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    title: {
      type: String,
      required: true,
    },
    coverUrl: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      require: true,
    },
    isPublic: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    collection: 'cover',
    timestamps: true,
  },
)
