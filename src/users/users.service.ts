import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './interfaces/user.interface'
import { CreateUserDto } from './dtos/createUser.dto'
import { ChangePasswordInput } from './dtos/change-password.input'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly UserModel: Model<User>,
  ) {
    this.UserModel = UserModel
  }

  public async getUserCount(): Promise<number> {
    return this.UserModel.estimatedDocumentCount()
  }

  public async findOneByEmail(email: string): Promise<User> {
    return this.UserModel.findOne({ email })
  }

  public async findOneByUserName(username: string): Promise<User> {
    return this.UserModel.findOne({ username })
  }

  public async create(user: CreateUserDto): Promise<User> {
    return this.UserModel.create(user)
  }

  // TODO:
  public async changePassword(params: ChangePasswordInput): Promise<User> {
    const { id, oldPassword, newPassword } = params
    return this.UserModel.findByIdAndUpdate(id, { password: newPassword })
  }

  // TODO:
  public async supportTOTP(params: ChangePasswordInput): Promise<User> {
    const { id } = params
    return this.UserModel.findByIdAndUpdate(id, { isTOTP: true })
  }
}
