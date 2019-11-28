import { Document } from 'mongoose'

export interface SMS extends Document {
  readonly phoneNumber: string
  readonly verificationCode: string
  readonly createdAt: string
  readonly updatedAt: string
}
