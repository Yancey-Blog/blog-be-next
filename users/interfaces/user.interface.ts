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
  avater_url: string
  phone_number: string
  is_two_factor_authentication: boolean
  two_factor_authentications: TwoFactorAuthentications[]
  totp_recovery_codes: number[]
  created_at: string
  updated_at: string
  isValidPassword(plainPwd: string, encryptedPwd: string): boolean
}
