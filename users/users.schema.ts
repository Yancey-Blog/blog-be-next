import mongoose from 'mongoose'
import { v4 } from 'uuid'
import bcrypt from 'bcrypt'
import { Roles, User } from './interfaces/user.interface'

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
    avater_url: {
      default: '',
      type: String,
      required: false,
    },
    username: {
      default: '',
      type: String,
      required: false,
    },
    phone_number: {
      default: '',
      type: String,
      required: false,
    },
    is_two_factor_authentication: {
      default: false,
      type: Boolean,
      required: true,
    },
    two_factor_authentications: {
      default: [],
      type: Array,
      required: true,
    },
    totp_recovery_codes: {
      default: [],
      type: Array,
      required: true,
    },
  },
  {
    collection: 'user',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
)

UserSchema.pre<User>('save', function(next) {
  this.password = bcrypt.hashSync(this.password, 10)
  next()
})

UserSchema.methods.isValidPassword = function(password: string) {
  return bcrypt.compareSync(password, this.password)
}
