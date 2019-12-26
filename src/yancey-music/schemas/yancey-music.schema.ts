import mongoose from 'mongoose'
import { v4 } from 'uuid'

export const YanceyMusicSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    title: {
      type: String,
      required: true,
    },
    soundCloudUrl: {
      type: String,
      required: true,
    },
    posterUrl: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'yancey_music',
    timestamps: true,
  },
)
