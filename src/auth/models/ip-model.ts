/* eslint-disable max-classes-per-file */

import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Language {
  @Field()
  public readonly code: string

  @Field()
  public readonly name: string

  @Field()
  public readonly native: string
}

@ObjectType()
export class Location {
  @Field()
  public readonly geoname_id: number

  @Field()
  public readonly capital: string

  @Field(() => [Language])
  public readonly languages: Language[]

  @Field()
  public readonly country_flag: string

  @Field()
  public readonly country_flag_emoji: string

  @Field()
  public readonly country_flag_emoji_unicode: string

  @Field()
  public readonly calling_code: string

  @Field()
  public readonly is_eu: boolean
}

@ObjectType()
export class IPModel {
  @Field()
  public readonly ip: string

  @Field()
  public readonly type: string

  @Field()
  public readonly continent_code: string

  @Field()
  public readonly continent_name: string

  @Field()
  public readonly country_code: string

  @Field()
  public readonly country_name: string

  @Field()
  public readonly region_code: string

  @Field()
  public readonly city: string

  @Field()
  public readonly zip: string

  @Field()
  public readonly latitude: number

  @Field()
  public readonly longitude: number

  @Field(() => Location)
  public readonly location: Location
}
