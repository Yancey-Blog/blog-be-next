import { IsString, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  private readonly email: string

  @IsNotEmpty()
  @IsString()
  private readonly password: number
}
