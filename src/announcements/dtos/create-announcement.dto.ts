import { IsString, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  private readonly announcement: string
}
