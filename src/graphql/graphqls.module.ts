import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ValidationError } from 'apollo-server-express'
import { ConfigService } from '../config/config.service'
import { SCHEMA_GQL_FILE_NAME } from '../shared/constants'
@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        debug: !configService.isEnvProduction,
        playground: !configService.isEnvProduction,
        installSubscriptionHandlers: true,
        typePaths: ['./**/*.graphql'],
        autoSchemaFile: SCHEMA_GQL_FILE_NAME,
        context: ({ req }) => ({ req }),
        // cors: {
        //   credentials: true,
        //   origin: true,
        // },
        formatError(error: ValidationError) {
          const { message, path } = error
          return configService.isEnvProduction
            ? {
                message,
                path,
                timestamp: new Date(),
              }
            : error
        },
      }),

      inject: [ConfigService],
    }),
  ],
})
export class GraphqlModule {}
