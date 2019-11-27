import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './interfaces/user.interface'
import { CreateUserDto } from './dtos/createUser.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly UserModel: Model<User>,
  ) {
    this.UserModel = UserModel
  }

  public findOneByEmail(email: string) {
    return this.UserModel.findOne({ email })
  }

  public create(user: CreateUserDto) {
    return this.UserModel.create(user)
  }
}
