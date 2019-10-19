import { IsString, IsNotEmpty } from 'class-validator'

export class CreateMottoDto {
  @IsNotEmpty()
  @IsString()
  private readonly motto: string
}
