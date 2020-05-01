import { Document } from 'mongoose'

export interface Post extends Document {
  readonly posterUrl: string
  readonly title: string
  readonly summary: string
  readonly content: string
  readonly tags: string[]
  readonly lastModifiedDate: Date
  readonly like: number
  readonly pv: number
  readonly isPublic: boolean
  readonly createdAt: Date
  readonly updatedAt: Date
  readonly prev: Post | null
  readonly next: Post | null
}
