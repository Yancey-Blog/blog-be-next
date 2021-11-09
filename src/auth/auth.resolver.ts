import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver, Mutation } from '@nestjs/graphql'
import { Request } from 'express'
import { AuthService } from './auth.service'
import { UserModel } from '../users/models/user.model'
import { TOTPModel } from './models/totp.model'
import { IPModel } from './models/ip-model'
import { RecoveryCodeModel } from './models/recovery-code.model'
import { LoginInput } from './dtos/login.input'
import { RegisterInput } from './dtos/register.input'
import { ValidateTOTPInput } from './dtos/validate-totp.input'
import { ChangePasswordInput } from './dtos/change-password.input'
import { JwtAuthGuard } from '../shared/guard/GraphQLAuth.guard'
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

  // 暂时不开放注册
  // @Mutation(() => UserModel)
  // public async register(@Args('input') input: RegisterInput) {
  //   return this.authService.register(input)
  // }

  @Mutation(() => TOTPModel)
  @UseGuards(JwtAuthGuard)
  public async createTOTP(@ReqDecorator() req: Request) {
    return this.authService.createTOTP(req.headers.authorization)
  }

  @Mutation(() => UserModel)
  @UseGuards(JwtAuthGuard)
  public async validateTOTP(@Args('input') input: ValidateTOTPInput, @ReqDecorator() req: Request) {
    return this.authService.validateTOTP(input, req.headers.authorization)
  }

  @Mutation(() => RecoveryCodeModel)
  @UseGuards(JwtAuthGuard)
  public async createRecoveryCodes(@ReqDecorator() req: Request) {
    return this.authService.createRecoveryCodes(req.headers.authorization)
  }

  @Mutation(() => UserModel)
  @UseGuards(JwtAuthGuard)
  public async validateRecoveryCode(
    @Args('input') input: ValidateTOTPInput,
    @ReqDecorator() req: Request,
  ) {
    return this.authService.validateRecoveryCode(input, req.headers.authorization)
  }

  @Mutation(() => UserModel)
  @UseGuards(JwtAuthGuard)
  public async changePassword(
    @Args('input') input: ChangePasswordInput,
    @ReqDecorator() req: Request,
  ) {
    return this.authService.changePassword(input, req.headers.authorization)
  }

  @Mutation(() => IPModel)
  @UseGuards(JwtAuthGuard)
  public async loginStatistics(@ReqDecorator() req: Request) {
    return this.authService.loginStatistics(req)
  }
}
