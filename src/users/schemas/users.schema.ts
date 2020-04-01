import mongoose, { HookNextFunction } from 'mongoose'
import { v4 } from 'uuid'
import bcrypt from 'bcrypt'
import { Roles, User } from '../interfaces/user.interface'

export const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    email: {
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
    avaterUrl: {
      default: '',
      type: String,
      required: false,
    },
    username: {
      default: '',
      type: String,
      required: false,
    },
    phoneNumber: {
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
      type: Array,
      required: false,
    },
  },
  {
    collection: 'user',
    timestamps: true,
  },
)

UserSchema.pre<User>('save', function (next: HookNextFunction) {
  this.password = bcrypt.hashSync(this.password, 10)
  next()
})

UserSchema.methods.isValidPassword = function (password: string): boolean {
  return bcrypt.compareSync(password, this.password)
}
