import { Document } from 'mongoose'

export interface Cover extends Document {
  readonly title: string
  readonly coverUrl: string
  readonly weight: number
  readonly isPublic: boolean
  readonly createdAt: Date
  readonly updatedAt: Date
}
