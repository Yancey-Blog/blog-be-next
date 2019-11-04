import { IUser } from './user.interface'
import { CreateUserDto } from '../dtos/createUser.dto'

export interface IUserService {
  create(user: CreateUserDto): boolean
  findAllUsers(): IUser[]
  findUserById(id: string): IUser
}
