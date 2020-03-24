import mongoose from 'mongoose'
import uuidV4 from 'uuid/v4'

export const AgendaSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidV4,
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
    allDay: {
      type: Boolean,
      required: true,
    },
    notes: {
      type: String,
      required: false,
      default: '',
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
