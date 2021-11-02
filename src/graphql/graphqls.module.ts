import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ValidationError } from 'apollo-server-express'
import { ConfigModule } from '../config/config.module'
import { ConfigService } from '../config/config.service'
import { SCHEMA_GQL_FILE_NAME } from '../shared/constants'
import { configCORS } from '../shared/utils'

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],

      useFactory: async (configService: ConfigService) => ({
        debug: !configService.isEnvProduction,
        playground: !configService.isEnvProduction,
        installSubscriptionHandlers: true,
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
        cors: configCORS(),
      }),

      inject: [ConfigService],
    }),
  ],
})
export class GraphqlModule {}
