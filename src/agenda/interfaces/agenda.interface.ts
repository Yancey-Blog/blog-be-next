import { Document } from 'mongoose'

export interface Agenda extends Document {
  readonly _id: string
  readonly title: string
  readonly startDate: Date
  readonly endDate?: Date
  readonly rRule?: string
  readonly exDate?: Date
  readonly createdAt: string
  readonly updatedAt: string
}
