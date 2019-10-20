import { Document } from 'mongoose'

export interface IMotto extends Document {
  readonly _id: string
  readonly motto: string
  readonly created_at: string
  readonly updated_at: string
  readonly __v: number
}
