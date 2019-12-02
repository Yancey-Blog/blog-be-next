import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { configMiddlewares } from './middlewares/index.middleware'
import { AppModule } from './app.module'

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  configMiddlewares(app)
  await app.listen(process.env.port || 3002, () => console.log('Server is listening on port 3002.'))
}

bootstrap()
