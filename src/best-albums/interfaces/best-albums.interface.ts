import { Document } from 'mongoose'

export interface BestAlbum extends Document {
  readonly title: string
  readonly artist: string
  readonly coverUrl: string
  readonly mvUrl: string
  readonly releaseDate: Date
  readonly createdAt: Date
  readonly updatedAt: Date
}
