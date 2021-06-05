import {
  Catch,
  ArgumentsHost, // 获取客户端参数
  HttpException,
} from '@nestjs/common'
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql'
import { Logger } from 'winston'

@Catch(HttpException)
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  constructor(private readonly logger: Logger) {
    this.logger = logger
  }

  public catch(exception: HttpException, host: ArgumentsHost) {
    this.logger.error(exception.toString())

    GqlArgumentsHost.create(host)
    return exception
  }
}
