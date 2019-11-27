import { Document } from 'mongoose'

export interface Motto extends Document {
  readonly motto: string
}
