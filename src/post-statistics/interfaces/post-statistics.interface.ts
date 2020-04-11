import { Document } from 'mongoose'

export interface PostStatistics extends Document {
  readonly _id: string
  readonly postId: string
  readonly postName: string
  readonly scenes: string
  readonly createdAt: Date
  readonly updatedAt: Date
}
