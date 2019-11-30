import { IsString, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  public readonly email: string

  @IsNotEmpty()
  @IsString()
  public readonly password: string
}
