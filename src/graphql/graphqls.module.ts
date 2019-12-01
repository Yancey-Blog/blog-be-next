import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ValidationError } from 'apollo-server-express'
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
        context: ({ req }) => ({ req }),
        formatError(error: ValidationError) {
          const { message, path } = error
          return {
            message,
            path,
            timestamp: new Date().toISOString(),
          }
        },
      }),

      inject: [ConfigService],
    }),
  ],
})
export class GraphqlModule {}
