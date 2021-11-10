import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ValidationError } from 'apollo-server-express'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { ConfigModule } from '../config/config.module'
import { ConfigService } from '../config/config.service'
import { SCHEMA_GQL_FILE_NAME } from '../shared/constants'

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        debug: !configService.isEnvProduction,
        playground: false,
        introspection: !configService.isEnvProduction,
        installSubscriptionHandlers: true,
        useGlobalPrefix: true,
        typePaths: ['./**/*.gql'],
        autoSchemaFile: SCHEMA_GQL_FILE_NAME,
        context: ({ req }) => ({ req }),
        formatError(error: ValidationError) {
          const {
            message,
            extensions: { code },
          } = error
          return configService.isEnvProduction
            ? {
                code,
                message,
                timestamp: new Date(),
              }
            : error
        },
        plugins: [
          !configService.isEnvProduction && ApolloServerPluginLandingPageLocalDefault(),
        ].filter(Boolean),
      }),

      inject: [ConfigService],
    }),
  ],
})
export class GraphqlModule {}
