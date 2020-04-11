import mongoose from 'mongoose'
import { v4 } from 'uuid'

export const GlobalSettingSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    releasePostId: {
      default: '',
      type: String,
      required: false,
    },
    cvPostId: {
      default: '',
      type: String,
      required: false,
    },
    isGrayTheme: {
      default: false,
      type: Boolean,
      required: false,
    },
  },
  {
    collection: 'global-setting',
    timestamps: true,
  },
)
