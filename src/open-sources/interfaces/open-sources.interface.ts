import { Document } from 'mongoose'

export interface OpenSource extends Document {
  readonly _id: string
  readonly title: string
  readonly description: string
  readonly url: string
  readonly posterUrl: string
  readonly createdAt: Date
  readonly updatedAt: Date
}
