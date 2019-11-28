import { IsString, IsNotEmpty } from 'class-validator'

export class ValidateSMSDto {
  @IsNotEmpty()
  @IsString()
  public readonly phoneNumber: string

  @IsNotEmpty()
  @IsString()
  public readonly verificationCode: string
}
