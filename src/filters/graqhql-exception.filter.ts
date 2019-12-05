import {
  Catch,
  ArgumentsHost, // 获取客户端参数
  HttpException,
} from '@nestjs/common'
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql'

@Catch(HttpException)
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost) {
    GqlArgumentsHost.create(host)
    return exception
  }
}
