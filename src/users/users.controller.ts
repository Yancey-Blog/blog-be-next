// 控制器层负责处理传入的请求, 并返回对客户端的响应。
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
  getAllUsers(): Observable<IUser[]> {
    console.log(process.env.DATABASE_DB)
    return of(this.userService.findAllUsers())
  }

  @Get(':id')
  getUserById(@Param() param: IParam): Observable<IUser> {
    const { id } = param
    return of(this.userService.findUserById(id))
  }

  @Post()
  addUser(@Body() createUserDto: CreateUserDto): Observable<boolean> {
    console.log(createUserDto)
    return of(true)
  }

  @Get()
  getHello(): string {
    return this.userService.getHello()
  }
}
