import { UseGuards } from '@nestjs/common'
import { Resolver, Query } from '@nestjs/graphql'
import { BandwagonService } from './bandwagon.service'
import { ServiceInfoModel } from './models/service-info.model'
import { UsageStatesModel } from './models/usage-stats.model'
import { JwtAuthGuard } from '../shared/guard/GraphQLAuth.guard'

@Resolver('Bandwagon')
export class BandwagonResolver {
  constructor(private readonly bandwagonService: BandwagonService) {
    this.bandwagonService = bandwagonService
  }

  @Query(() => ServiceInfoModel)
  @UseGuards(JwtAuthGuard)
  public getBanwagonServiceInfo() {
    return this.bandwagonService.getServiceInfo()
  }

  @Query(() => [UsageStatesModel])
  @UseGuards(JwtAuthGuard)
  public getBanwagonUsageStats() {
    return this.bandwagonService.getUsageStats()
  }
}
