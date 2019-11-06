import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ConfigService } from '../config/config.service'

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        debug: !configService.isEnvProduction,
        playground: !configService.isEnvProduction,
        installSubscriptionHandlers: true,
        typePaths: ['./**/*.graphql'],
        autoSchemaFile: 'schema.gql',
      }),
      inject: [ConfigService],
    }),
  ],
})
export class GraphqlModule {}
