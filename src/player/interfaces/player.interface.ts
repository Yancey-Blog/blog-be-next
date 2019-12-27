import { Document } from 'mongoose'

export interface Player extends Document {
  readonly title: string
  readonly artist: string
  readonly lrc: string
  readonly coverUrl: string
  readonly musicFileUrl: string
  readonly createdAt: string
  readonly updatedAt: string
}
