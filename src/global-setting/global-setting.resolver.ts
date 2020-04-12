import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver, Mutation } from '@nestjs/graphql'
import { GlobalSettingService } from './global-setting.service'
import { GlobalSettingModel } from './models/global-setting.model'
import { UpdateGlobalSettingInput } from './dtos/update-global-setting.input'
import { GqlAuthGuard } from '../shared/guard/gqlAuth.guard'

@Resolver(() => GlobalSettingModel)
export class GlobalSettingResolver {
  constructor(private readonly globalSettingService: GlobalSettingService) {
    this.globalSettingService = globalSettingService
  }

  @Query(() => GlobalSettingModel)
  @UseGuards(GqlAuthGuard)
  public async getGlobalSetting() {
    return this.globalSettingService.findOne()
  }

  @Mutation(() => GlobalSettingModel)
  @UseGuards(GqlAuthGuard)
  public async updateGlobalSettingById(@Args('input') input: UpdateGlobalSettingInput) {
    return this.globalSettingService.update(input)
  }
}
