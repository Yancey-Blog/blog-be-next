import { Document } from 'mongoose'

export interface YanceyMusic extends Document {
  readonly title: string
  readonly soundCloudUrl: string
  readonly posterUrl: string
  readonly releaseDate: Date
  readonly createdAt: Date
  readonly updatedAt: Date
}
