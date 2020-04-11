import mongoose from 'mongoose'
import { v4 } from 'uuid'

export const PostStatisticsSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    postId: {
      type: String,
      required: true,
    },
    postName: {
      type: String,
      required: true,
    },
    scenes: {
      type: String,
      require: true,
    },
  },
  {
    collection: 'post-statistics',
    timestamps: true,
  },
)
