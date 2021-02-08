import { Document } from 'mongoose'

export interface GlobalSetting extends Document {
  readonly _id: string
  readonly releasePostId: string
  readonly cvPostId: string
  readonly isGrayTheme: boolean
  readonly createdAt: Date
  readonly updatedAt: Date
}
