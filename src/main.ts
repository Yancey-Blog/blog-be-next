import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
// import { configMiddlewares } from './middlewares/index.middleware'
import { AppModule } from './app.module'

const bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
  // configMiddlewares(app)
  await app.listen(process.env.port || 3002, () => console.log('Server is listening on port 3002.'))
}

bootstrap()
