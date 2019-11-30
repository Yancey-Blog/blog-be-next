import { IsNumberString, IsNotEmpty, IsMobilePhone } from 'class-validator'

export class ValidateSMSDto {
  @IsNotEmpty()
  @IsMobilePhone('zh-CN')
  public readonly phoneNumber: string

  @IsNotEmpty()
  @IsNumberString()
  public readonly verificationCode: string
}
