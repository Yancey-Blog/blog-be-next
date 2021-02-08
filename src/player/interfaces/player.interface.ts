import { Document } from 'mongoose'

export interface Player extends Document {
  readonly _id: string
  readonly title: string
  readonly artist: string
  readonly lrc: string
  readonly coverUrl: string
  readonly musicFileUrl: string
  readonly isPublic: boolean
  readonly weight: number
  readonly createdAt: Date
  readonly updatedAt: Date
}
