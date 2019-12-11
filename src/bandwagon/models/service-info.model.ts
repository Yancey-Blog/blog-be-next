import { Field, ObjectType } from 'type-graphql'
import { IsString, IsNumber, IsBoolean, IsNotEmpty, IsArray } from 'class-validator'

@ObjectType()
export class ServiceInfoModel {
  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly vm_type: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly ve_status: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly ve_mac1: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly ve_used_disk_space_b: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly is_cpu_throttled: string

  @Field()
  @IsNumber()
  @IsNotEmpty()
  public readonly ssh_port: number

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly live_hostname: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly load_average: string

  @Field()
  @IsNumber()
  @IsNotEmpty()
  public readonly mem_available_kb: number

  @Field()
  @IsNumber()
  @IsNotEmpty()
  public readonly swap_total_kb: number

  @Field()
  @IsNumber()
  @IsNotEmpty()
  public readonly swap_available_kb: number

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly hostname: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly node_ip: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly node_alias: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly node_location: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly node_location_id: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly node_datacenter: string

  @Field()
  @IsBoolean()
  @IsNotEmpty()
  public readonly location_ipv6_ready: boolean

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly plan: string

  @Field()
  @IsNumber()
  @IsNotEmpty()
  public readonly plan_monthly_data: number

  @Field()
  @IsNumber()
  @IsNotEmpty()
  public readonly monthly_data_multiplier: number

  @Field()
  @IsNumber()
  @IsNotEmpty()
  public readonly plan_disk: number

  @Field()
  @IsNumber()
  @IsNotEmpty()
  public readonly plan_ram: number

  @Field()
  @IsNumber()
  @IsNotEmpty()
  public readonly plan_swap: number

  @Field()
  @IsNumber()
  @IsNotEmpty()
  public readonly plan_max_ipv6s: number

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly os: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly email: string

  @Field()
  @IsNumber()
  @IsNotEmpty()
  public readonly data_counter: number

  @Field()
  @IsNumber()
  @IsNotEmpty()
  public readonly data_next_reset: number

  @Field(() => [String])
  @IsArray()
  public readonly ip_addresses: string[]

  @Field(() => [String])
  @IsArray()
  public readonly private_ip_addresses: string[]

  @Field(() => [String])
  @IsArray()
  public readonly ip_nullroutes: string[]

  @Field({ nullable: true })
  @IsString()
  public readonly iso1: string | null

  @Field({ nullable: true })
  @IsString()
  public readonly iso2: string | null

  @Field(() => [String])
  @IsArray()
  public readonly available_isos: string[]

  @Field()
  @IsBoolean()
  @IsNotEmpty()
  public readonly plan_private_network_available: boolean

  @Field()
  @IsBoolean()
  @IsNotEmpty()
  public readonly location_private_network_available: boolean

  @Field()
  @IsBoolean()
  @IsNotEmpty()
  public readonly rdns_api_available: boolean

  // FIXME:
  @Field(() => String)
  public readonly ptr: { [index: string]: string | null }

  @Field()
  @IsBoolean()
  @IsNotEmpty()
  public readonly suspended: boolean

  @Field()
  @IsBoolean()
  @IsNotEmpty()
  public readonly policy_violation: boolean

  @Field({ nullable: true })
  @IsNumber()
  @IsNotEmpty()
  public readonly suspension_count: number | null

  @Field()
  @IsNumber()
  @IsNotEmpty()
  public readonly max_abuse_points: number

  @Field()
  @IsNumber()
  @IsNotEmpty()
  public readonly error: number

  @Field()
  @IsNumber()
  @IsNotEmpty()
  public readonly veid: number
}
