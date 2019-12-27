import { Document } from 'mongoose'

export interface BestAlbum extends Document {
  readonly title: string
  readonly artist: string
  readonly coverUrl: string
  readonly mvUrl: string
  readonly releaseDate: string
  readonly createdAt: string
  readonly updatedAt: string
}
