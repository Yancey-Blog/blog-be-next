import { UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { Args, Query, Resolver, Mutation, ID } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { UserModel } from '../users/models/User.model'
import { TOTPModel } from './models/totp.model'
import { RecoveryCodeModel } from './models/recovery-code.model'
import { LoginInput } from './dtos/login.input'
import { RegisterInput } from './dtos/register.input'
import { ValidateTOTPInput } from './dtos/validate-totp.input'
import { GqlAuthGuard } from '../shared/guard/gqlAuth.guard'
import { ReqDecorator } from '../shared/decorators'

@Resolver(() => UserModel)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {
    this.authService = authService
  }

  @Query(() => UserModel)
  public async login(@Args('input') input: LoginInput) {
    return this.authService.login(input)
  }

  @Mutation(() => UserModel)
  public async register(@Args('input') input: RegisterInput) {
    return this.authService.register(input)
  }

  @Mutation(() => TOTPModel)
  @UseGuards(GqlAuthGuard)
  public async createTOTP(
    @Args({ name: 'userId', type: () => ID }) userId: string,
    @ReqDecorator() req: Request,
  ) {
    console.log(req)
    return this.authService.createTOTP(userId)
  }

  @Mutation(() => UserModel)
  @UseGuards(GqlAuthGuard)
  public async validateTOTP(@Args('input') input: ValidateTOTPInput) {
    return this.authService.validateTOTP(input)
  }

  @Mutation(() => RecoveryCodeModel)
  @UseGuards(GqlAuthGuard)
  public async createRecoveryCodes(@Args({ name: 'userId', type: () => ID }) userId: string) {
    return this.authService.createRecoveryCodes(userId)
  }

  @Mutation(() => UserModel)
  @UseGuards(GqlAuthGuard)
  public async validateRecoveryCode(@Args('input') input: ValidateTOTPInput) {
    return this.authService.validateRecoveryCode(input)
  }
}
