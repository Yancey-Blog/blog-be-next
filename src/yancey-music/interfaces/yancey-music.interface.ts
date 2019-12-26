import { Document } from 'mongoose'

export interface YanceyMusic extends Document {
  readonly title: string
  readonly soundCloudUrl: string
  readonly posterUrl: string
  readonly releaseDate: string
  readonly createdAt: string
  readonly updatedAt: string
}
