import { Document } from 'mongoose'

export interface Announcement extends Document {
  readonly _id: string
  readonly announcement: string
  readonly createdAt: string
  readonly updatedAt: string
}
