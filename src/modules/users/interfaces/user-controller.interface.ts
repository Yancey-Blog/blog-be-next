import { Observable } from 'rxjs'
import { IUser } from './user.interface'
import { CreateUserDto } from '../dtos/createUser.dto'

export interface IUserController {
  addUser(user: CreateUserDto): Observable<boolean>
  getAllUsers(): Observable<IUser[]>
  getUserById(id: string): Observable<IUser>
}
