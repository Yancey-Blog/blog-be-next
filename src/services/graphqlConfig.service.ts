import { Injectable } from '@nestjs/common'
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql'

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  createGqlOptions(): GqlModuleOptions {
    return {
      typePaths: ['./**/*.graphql'],
    }
  }
}
