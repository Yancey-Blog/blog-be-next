import { Document } from 'mongoose'
import { IPModel } from '../../auth/models/ip-model'

export enum TwoFactorAuthentications {
  TOTP,
  SMS,
}

export enum Roles {
  SUPERUSER = 0b0000000000000,
  ADMIN = 0b0000000000001,
  USER = 0b0000000000010,
  NOT_CERTIFIED = 0b0000000000100,
}

export interface User extends Document {
  _id: string
  username: string
  email: string
  password: string
  role: Roles
  avaterUrl: string
  phoneNumber: string
  isTOTP: boolean
  totpSecret: string
  recoveryCodes: string[]
  loginStatistics: IPModel[]
  createdAt: Date
  updatedAt: Date
  isValidPassword(plainPwd: string, encryptedPwd: string): boolean
}
