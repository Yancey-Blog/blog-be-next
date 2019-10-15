import {
  Controller,
  Get,
  Post,
  HttpCode,
  Param,
  Body,
  HttpException,
  HttpStatus,
  // UnauthorizedException,
  // UseFilters,
} from '@nestjs/common'
import { Observable, of } from 'rxjs'
import { UserService } from './users.service'
import { CreateUserDto } from './dtos/createUser.dto'
import { IUserController } from './interfaces/user-controller.interface'
import { IUser } from './interfaces/user.interface'
import { Roles } from '../decorators/roles.decorator'

@Controller('user')
export class UserController implements IUserController {
  constructor(private readonly userService: UserService) {
    this.userService = userService
  }

  @Get()
  // 这里最好传递类而非实例
  // 它可以减少内存使用量，因为 Nest 可以轻松地在整个应用程序中重复使用同一类的实例。
  // @UseFilters(HttpExceptionFilter)
  public getAllUsers(): Observable<IUser[]> {
    // return of(this.userService.findAllUsers())
    // throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN)
    throw new HttpException(
      {
        status: HttpStatus.UNAUTHORIZED,
        message: '知道错了吗',
      },
      401,
    )

    // HTTP 常见异常，继承自 HttpException
    // throw new UnauthorizedException()
  }

  @Get(':id')
  public getUserById(@Param('id') id: string): Observable<IUser | undefined> {
    return of(this.userService.findUserById(id))
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles('admin')
  public addUser(@Body() createUserDto: CreateUserDto): Observable<boolean> {
    return of(this.userService.create(createUserDto))
  }
}
