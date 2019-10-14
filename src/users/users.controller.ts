import { Controller, Get, Post, HttpCode, Param, Body } from '@nestjs/common'
import { Observable, of } from 'rxjs'
import { UserService } from './users.service'
import { CreateUserDto } from './dtos/createUser.dto'
import { IUserController } from './interfaces/user-controller.interface'
import { IUser } from './interfaces/user.interface'

@Controller('user')
export class UserController implements IUserController {
  constructor(private readonly userService: UserService) {
    this.userService = userService
  }

  @Get()
  @HttpCode(200)
  public getAllUsers(): Observable<IUser[]> {
    return of(this.userService.findAllUsers())
  }

  @Get(':id')
  public getUserById(@Param('id') id: string): Observable<IUser | undefined> {
    return of(this.userService.findUserById(id))
  }

  @Post()
  public addUser(@Body() createUserDto: CreateUserDto): Observable<boolean> {
    return of(this.userService.create(createUserDto))
  }
}
