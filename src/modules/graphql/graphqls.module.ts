import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      installSubscriptionHandlers: true,
      typePaths: ['./**/*.graphql'],
      autoSchemaFile: 'schema.gql',
    }),
  ],
})
export class GraphQLsModule {}
