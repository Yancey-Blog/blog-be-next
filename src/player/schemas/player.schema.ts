import mongoose from 'mongoose'
import uuidV4 from 'uuid/v4'

export const PlayerSchema = new mongoose.Schema(
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
