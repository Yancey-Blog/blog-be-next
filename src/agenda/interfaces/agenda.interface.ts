import { Document } from 'mongoose'

export interface Agenda extends Document {
  readonly _id: string
  readonly title: string
  readonly startDate: string
  readonly endDate?: string
  readonly rRule?: string
  readonly exDate?: string
  readonly createdAt: Date
  readonly updatedAt: Date
}
