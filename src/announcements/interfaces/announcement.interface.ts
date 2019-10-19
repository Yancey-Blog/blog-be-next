import { Document } from 'mongoose'

export interface IAnnouncement extends Document {
  readonly _id: string
  readonly announcement: string
  readonly created_at: string
  readonly updated_at: string
}
