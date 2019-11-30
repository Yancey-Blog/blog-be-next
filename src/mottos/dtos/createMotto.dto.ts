import { IsString, IsNotEmpty } from 'class-validator'

export class CreateMottoDto {
  @IsNotEmpty()
  @IsString()
  protected readonly motto: string
}
