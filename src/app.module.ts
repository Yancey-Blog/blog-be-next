import { Module, ValidationPipe } from '@nestjs/common'
import { APP_FILTER, APP_PIPE, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { MorganModule, MorganInterceptor } from 'nest-morgan'
// import { GraphQLModule } from '@nestjs/graphql'
import { UsersModule } from './users/users.module'
import { HttpExceptionFilter } from './filters/http-exception.filter'
import { RolesGuard } from './guard/roles.guard'

@Module({
  imports: [
    // GraphQLModule.forRoot({
    //   debug: true,
    //   playground: true,
    // }),
    UsersModule,
    MorganModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('combined'),
    },
  ],
})
export class AppModule {}
