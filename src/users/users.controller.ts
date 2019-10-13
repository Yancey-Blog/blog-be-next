import { Controller, Get, Post, HttpCode, Param, Body } from '@nestjs/common'
import { Observable, of } from 'rxjs'
import { UserService } from './users.service'
import { IUser, IParam } from './types'
import { CreateUserDto } from './dtos/createUser.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
    this.userService = userService
  }

  @Get()
  @HttpCode(200)
  public getAllUsers(): Observable<IUser[]> {
    return of(this.userService.findAllUsers())
  }

  @Get(':id')
  public getUserById(@Param() param: IParam): Observable<IUser | undefined> {
    const { id } = param
    return of(this.userService.findUserById(id))
  }

  @Post()
  public addUser(@Body() createUserDto: CreateUserDto): Observable<boolean> {
    return of(this.userService.create(createUserDto))
  }
}
