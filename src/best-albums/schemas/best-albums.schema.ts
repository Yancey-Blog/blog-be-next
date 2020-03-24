import mongoose from 'mongoose'
import { v4 } from 'uuid'

export const BestAlbumSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
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
