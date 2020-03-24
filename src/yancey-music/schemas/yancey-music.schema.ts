import mongoose from 'mongoose'
import uuidV4 from 'uuid/v4'

export const YanceyMusicSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidV4,
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
      type: Date,
      required: true,
    },
  },
  {
    collection: 'yancey_music',
    timestamps: true,
  },
)
