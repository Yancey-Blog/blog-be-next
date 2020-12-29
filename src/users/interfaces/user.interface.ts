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
  password: string
  readonly _id: string
  readonly username: string
  readonly email: string
  readonly role: Roles
  readonly name: string
  readonly location: string
  readonly organization: string
  readonly website: string
  readonly bio: string
  readonly avatarUrl: string
  readonly phoneNumber: string
  readonly isTOTP: boolean
  readonly totpSecret: string
  readonly recoveryCodes: string[]
  readonly loginStatistics: IPModel[]
  readonly createdAt: Date
  readonly updatedAt: Date
  isValidPassword(plainPwd: string, encryptedPwd: string): boolean
}
