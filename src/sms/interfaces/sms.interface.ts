import { Document } from 'mongoose'

export interface SMS extends Document {
  readonly _id: string
  readonly phoneNumber: string
  readonly verificationCode: string
  readonly createdAt: string
  readonly updatedAt: string
}

export interface SMSRes {
  success: boolean
}

export interface SMSParams {
  readonly RegionId: string
  readonly SignName: string
  readonly TemplateCode: string
  readonly PhoneNumbers: string
  readonly TemplateParam: string
}
