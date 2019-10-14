import { IsString, IsInt, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  private readonly name: string

  @IsNotEmpty()
  @IsInt()
  private readonly age: number

  @IsNotEmpty()
  @IsString()
  private readonly gender: string
}
