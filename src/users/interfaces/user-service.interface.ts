import { Observable } from 'rxjs'
import { IUser } from './user.interface'

export interface IUserService {
  create(): Observable<boolean>
  findAllUsers(): Observable<IUser[]>
  findUserById(id: string): Observable<IUser>
}
