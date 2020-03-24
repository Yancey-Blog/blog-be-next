import mongoose from 'mongoose'
import uuidV4 from 'uuid/v4'

export const BestAlbumSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidV4,
    },
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    coverUrl: {
      type: String,
      required: true,
    },
    mvUrl: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
  },
  {
    collection: 'best_album',
    timestamps: true,
  },
)
