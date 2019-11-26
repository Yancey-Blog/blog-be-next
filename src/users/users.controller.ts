import {
  Controller,
  Get,
  Post,
  HttpCode,
  Param,
  Body,
  HttpStatus,
  // UnauthorizedException,
  // UseFilters,
} from '@nestjs/common'
import { Observable, of } from 'rxjs'
import { UsersService } from './users.service'
import { CreateUserDto } from './dtos/createUser.dto'
import { User } from './interfaces/user.interface'
import { Roles } from '../decorators/roles.decorator'

@Controller('auth')
export class UsersController {
  constructor(private readonly userService: UsersService) {
    this.userService = userService
  }

  @Get()
  // 这里最好传递类而非实例
  // 它可以减少内存使用量，因为 Nest 可以轻松地在整个应用程序中重复使用同一类的实例。
  // @UseFilters(HttpExceptionFilter)
  public getAllUsers(): Observable<User[]> {
    return of(this.userService.findAllUsers())
    // throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN)
    // throw new HttpException(
    //   {
    //     status: HttpStatus.UNAUTHORIZED,
    //     message: '知道错了吗',
    //   },
    //   401,
    // )

    // HTTP 常见异常，继承自 HttpException
    // throw new UnauthorizedException()
  }

  @Get(':id')
  public getUserById(@Param('id') id: string): Observable<User | undefined> {
    return of(this.userService.findUserById(id))
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles('staff')
  public addUser(@Body() createUserDto: CreateUserDto): Observable<boolean> {
    return of(this.userService.create(createUserDto))
  }
}
