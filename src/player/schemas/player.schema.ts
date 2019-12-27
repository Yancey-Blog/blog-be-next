import mongoose from 'mongoose'
import { v4 } from 'uuid'

export const PlayerSchema = new mongoose.Schema(
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
    lrc: {
      type: String,
      required: true,
    },
    coverUrl: {
      type: String,
      required: true,
    },
    musicFileUrl: {
      type: String,
      required: true,
    },
    isPublic: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    collection: 'player',
    timestamps: true,
  },
)
