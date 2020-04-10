import { Field, ObjectType } from '@nestjs/graphql'
import { IsString, IsNotEmpty } from 'class-validator'

@ObjectType()
export class UsageStatesModel {
  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly timestamp: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly network_in_bytes: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly network_out_bytes: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly disk_read_bytes: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly disk_write_bytes: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly cpu_usage: string
}
