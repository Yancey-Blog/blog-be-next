import mongoose from 'mongoose'
import uuidV4 from 'uuid/v4'

export const OpenSourceSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidV4,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    posterUrl: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'open_source',
    timestamps: true,
  },
)
