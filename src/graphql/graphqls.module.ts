import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'

// TODO: 异步导入模块
@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      installSubscriptionHandlers: true,
      typePaths: ['./**/*.graphql'],
      autoSchemaFile: 'schema.gql',
      resolvers: { JSON: GraphQLJSON },
    }),
  ],
})
export class GraphqlModule {}
