import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './interfaces/user.interface'
import { CreateUserInput } from './dtos/create-user.input'
import { UpdateUserInput } from './dtos/update-user.input'

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

  public async create(createUserInput: CreateUserInput): Promise<User> {
    return this.UserModel.create(createUserInput)
  }

  public async updateUser(updateUserInput: UpdateUserInput): Promise<User> {
    const { id, ...rest } = updateUserInput
    return this.UserModel.findByIdAndUpdate(id, rest, { new: true })
  }
}
