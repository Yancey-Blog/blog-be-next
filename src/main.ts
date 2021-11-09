import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { configLog } from './shared/log/log.config'
import { configMiddlewares } from './shared/middlewares/middleware.config'
import { AppModule } from './app.module'

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.setGlobalPrefix('beg')

  configMiddlewares(app)
  configLog(app)

  // eslint-disable-next-line no-console
  await app.listen(process.env.port || 3002, () => console.log('Server is listening on port 3002.'))
}

bootstrap()
