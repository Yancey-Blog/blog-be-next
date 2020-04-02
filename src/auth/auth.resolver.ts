import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver, Mutation, ID } from '@nestjs/graphql'
import { Request } from 'express'
import { AuthService } from './auth.service'
import { UserModel } from '../users/models/User.model'
import { TOTPModel } from './models/totp.model'
import { RecoveryCodeModel } from './models/recovery-code.model'
import { LoginInput } from './dtos/login.input'
import { RegisterInput } from './dtos/register.input'
import { ValidateTOTPInput } from './dtos/validate-totp.input'
import { ChangePasswordInput } from './dtos/change-password.input'
import { GqlAuthGuard } from '../shared/guard/gqlAuth.guard'
import { ReqDecorator } from '../shared/decorators/req.decorator'

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
  public async createTOTP(@ReqDecorator() req: Request) {
    // const network = {
    //   ip: requestIP.getClientIp(req),
    //   userAgent: req.headers['user-agent'],
    // }

    return this.authService.createTOTP(req.headers.authorization)
  }

  @Mutation(() => UserModel)
  @UseGuards(GqlAuthGuard)
  public async validateTOTP(@Args('input') input: ValidateTOTPInput, @ReqDecorator() req: Request) {
    return this.authService.validateTOTP(input, req.headers.authorization)
  }

  @Mutation(() => RecoveryCodeModel)
  @UseGuards(GqlAuthGuard)
  public async createRecoveryCodes(@ReqDecorator() req: Request) {
    return this.authService.createRecoveryCodes(req.headers.authorization)
  }

  @Mutation(() => UserModel)
  @UseGuards(GqlAuthGuard)
  public async validateRecoveryCode(
    @Args('input') input: ValidateTOTPInput,
    @ReqDecorator() req: Request,
  ) {
    return this.authService.validateRecoveryCode(input, req.headers.authorization)
  }

  @Mutation(() => UserModel)
  @UseGuards(GqlAuthGuard)
  public async changePassword(
    @Args('input') input: ChangePasswordInput,
    @ReqDecorator() req: Request,
  ) {
    return this.authService.changePassword(input, req.headers.authorization)
  }
}
