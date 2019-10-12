import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
// import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { configMiddlewares } from './middlewares'
import { AppModule } from './app.module'

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  configMiddlewares(app)
  await app.listen(3002, () => console.log('Server is listening on port 3002.'))
}

bootstrap()
