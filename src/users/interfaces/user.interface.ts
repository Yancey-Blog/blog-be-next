import { Document } from 'mongoose'

export enum TwoFactorAuthentications {
  TOTP,
  SMS,
}

export enum Roles {
  SUPERUSER,
  ADMIN,
  USER,
  NOT_CERTIFIED,
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
  createdAt: string
  updatedAt: string
  isValidPassword(plainPwd: string, encryptedPwd: string): boolean
}
