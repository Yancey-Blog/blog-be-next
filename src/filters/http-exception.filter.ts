import {
  ExceptionFilter,
  Catch,
  ArgumentsHost, // 获取客户端参数
  HttpException,
} from '@nestjs/common'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()
    const status = exception.getStatus()

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: `${request.method} ${request.url}`,
      message: exception.message.message,
    })
  }
}
