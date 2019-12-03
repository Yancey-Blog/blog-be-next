import { Document } from 'mongoose'

export interface OpenSource extends Document {
  readonly title: string
  readonly description: string
  readonly url: string
  readonly posterUrl: string
  readonly createdAt: string
  readonly updatedAt: string
}
