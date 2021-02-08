import { Document } from 'mongoose'

export interface LiveTour extends Document {
  readonly _id: string
  readonly title: string
  readonly posterUrl: string
  readonly showTime: Date
  readonly createdAt: Date
  readonly updatedAt: Date
}
