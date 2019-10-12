import { Injectable } from '@nestjs/common'
import { zipObj } from 'ramda'
import { users as dataSource } from '../mocks'
import { IUser, UserById } from './interfaces/user.interface'

@Injectable()
export class UserService {
  private readonly users: IUser[] = dataSource

  private readonly allIds: string[] = this.users.map((user: IUser) => user._id)

  private readonly userById: UserById = zipObj<IUser>(this.allIds, this.users)

  public getHello(): string {
    return 'happy fuck'
  }

  public create(user: IUser) {
    this.users.push(user)
  }

  public findAllUsers(): IUser[] {
    return this.users
  }

  public findUserById(id: string): IUser | undefined {
    return this.userById[id]
  }
}
