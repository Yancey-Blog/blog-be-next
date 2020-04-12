import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Request } from 'express'
import { User } from './interfaces/user.interface'
import { UpdateUserInput } from './dtos/update-user.input'
import { RegisterInput } from '../auth/dtos/register.input'
import { decodeJwt } from '../shared/utils'

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

  public async findOneById(id: string): Promise<User> {
    return this.UserModel.findById(id)
  }

  public async findOneByEmail(email: string): Promise<User> {
    return this.UserModel.findOne({ email })
  }

  public async create(input: RegisterInput): Promise<User> {
    return this.UserModel.create(input)
  }

  public async updateUser(input: UpdateUserInput): Promise<User> {
    const { id, ...rest } = input
    return this.UserModel.findByIdAndUpdate(id, rest, { new: true })
  }

  public async updateUserName(username: String, req: Request): Promise<User> {
    const { sub: id } = decodeJwt(req.headers.authorization)
    return this.UserModel.findByIdAndUpdate(id, { username }, { new: true })
  }

  public async updateEmail(email: String, req: Request): Promise<User> {
    const { sub: id } = decodeJwt(req.headers.authorization)
    return this.UserModel.findByIdAndUpdate(id, { email }, { new: true })
  }

  public async deleteOneById(req: Request): Promise<User> {
    const { sub: id } = decodeJwt(req.headers.authorization)
    return this.UserModel.findByIdAndDelete(id)
  }
}
