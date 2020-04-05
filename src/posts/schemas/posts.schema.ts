import mongoose from 'mongoose'
import { v4 } from 'uuid'

export const PostSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    posterUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
    lastModifiedDate: {
      type: Date,
      required: true,
    },
    like: {
      type: Number,
      default: 0,
      required: true,
    },
    pv: {
      type: Number,
      default: 0,
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  {
    collection: 'post',
    timestamps: true,
  },
)
