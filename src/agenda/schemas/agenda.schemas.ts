import mongoose from 'mongoose'
import { v4 } from 'uuid'

export const AgendaSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    title: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: false,
    },
    rRule: {
      type: String,
      required: false,
    },
    exDate: {
      type: Date,
      required: false,
    },
  },
  {
    collection: 'agenda',
    timestamps: true,
  },
)
