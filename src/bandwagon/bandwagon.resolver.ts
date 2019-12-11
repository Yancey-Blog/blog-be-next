import { Resolver, Query } from '@nestjs/graphql'
import { BandwagonService } from './bandwagon.service'
import { ServerInfoModel } from './models/server-info.model'

@Resolver(() => ServerInfoModel)
export class BandwagonResolver {
  constructor(private readonly bandwagonService: BandwagonService) {
    this.bandwagonService = bandwagonService
  }

  @Query(() => ServerInfoModel)
  public async getServiceInfo() {
    return this.bandwagonService.getServiceInfo()
  }

  @Query(() => [ServerInfoModel])
  public async getUsageStats() {
    return this.bandwagonService.getUsageStats()
  }
}
