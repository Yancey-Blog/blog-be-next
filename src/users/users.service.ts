import { Injectable } from '@nestjs/common'
import { users as dataSource } from '../mocks'
import { IUser } from './interfaces/user.interface'
import { IUserService } from './interfaces/user-service.interface'
import { CreateUserDto } from './dtos/createUser.dto'

@Injectable()
export class UserService implements IUserService {
  private readonly users: IUser[] = dataSource

  public create(user: CreateUserDto) {
    return !!user
  }

  public findAllUsers(): IUser[] {
    return this.users
  }

  public findUserById(id: string): IUser | undefined {
    return this.users.find((user: IUser) => user._id === id)
  }
}
