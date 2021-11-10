import mongoose from 'mongoose'
import { v4 } from 'uuid'
import bcrypt from 'bcrypt'
import { encryptPassword } from '../../shared/utils'
import { IPModel } from '../../auth/models/ip-model'
import { Roles, User } from '../interfaces/user.interface'

export const UserSchema = new mongoose.Schema<User>(
  {
    _id: {
      type: String,
      default: v4,
    },
    email: {
      type: String,
      required: true,
    },
    username: {
      default: '',
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      default: Roles.NOT_CERTIFIED,
      type: Number,
      required: true,
    },
    name: {
      default: '',
      type: String,
      required: false,
    },
    location: {
      default: '',
      type: String,
      required: false,
    },
    organization: {
      default: '',
      type: String,
      required: false,
    },
    website: {
      default: '',
      type: String,
      required: false,
    },
    bio: {
      default: '',
      type: String,
      required: false,
    },
    avatarUrl: {
      default: '',
      type: String,
      required: false,
    },
    isTOTP: {
      default: false,
      type: Boolean,
      required: true,
    },
    totpSecret: {
      type: String,
      required: false,
    },
    recoveryCodes: {
      type: [String],
      required: false,
    },
    loginStatistics: {
      type: [],
      required: false,
    },
  },
  {
    collection: 'user',
    timestamps: true,
  },
)

UserSchema.pre<User>('save', function (next) {
  this.password = encryptPassword(this.password)
  next()
})

UserSchema.methods.isValidPassword = function (password: string): boolean {
  return bcrypt.compareSync(password, this.password)
}
