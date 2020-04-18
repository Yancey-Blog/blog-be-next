import { UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { Args, Resolver, Mutation } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { UserModel } from './models/user.model'
import { UpdateUserInput } from './dtos/update-user.input'
import { GqlAuthGuard } from '../shared/guard/gqlAuth.guard'
import { ReqDecorator } from '../shared/decorators/req.decorator'
import { decodeJwt } from '../shared/utils'

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly usersService: UsersService) {
    this.usersService = usersService
  }

  @Mutation(() => UserModel)
  @UseGuards(GqlAuthGuard)
  public async updateUser(@Args('input') input: UpdateUserInput, @ReqDecorator() req: Request) {
    const { sub: userId } = decodeJwt(req.headers.authorization)
    return this.usersService.updateUser({ ...input, id: userId })
  }

  @Mutation(() => UserModel)
  @UseGuards(GqlAuthGuard)
  public async updateUserName(
    @Args({ name: 'username', type: () => String }) username: string,
    @ReqDecorator() req: Request,
  ) {
    return this.usersService.updateUserName(username, req)
  }

  @Mutation(() => UserModel)
  @UseGuards(GqlAuthGuard)
  public async updateEmail(
    @Args({ name: 'email', type: () => String }) email: string,
    @ReqDecorator() req: Request,
  ) {
    return this.usersService.updateEmail(email, req)
  }

  @Mutation(() => UserModel)
  @UseGuards(GqlAuthGuard)
  public async deleteAccount(@ReqDecorator() req: Request) {
    return this.usersService.deleteOneById(req)
  }
}
