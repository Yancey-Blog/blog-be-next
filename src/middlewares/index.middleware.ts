import { NestFastifyApplication } from '@nestjs/platform-fastify'
import path from 'path'
import favicon from 'fastify-favicon'
import helmet from 'fastify-helmet'
import rateLimit from 'fastify-rate-limit'
import cors from 'fastify-cors'
import healthcheck from 'fastify-healthcheck'

export const configMiddlewares = (app: NestFastifyApplication) => {
  app.register(favicon, { path: path.join(process.cwd(), 'public') })
  app.register(helmet)
  app.register(rateLimit, {
    timeWindow: '1 minute',
    max: 100,
    whitelist: [],
    addHeaders: {
      'x-ratelimit-limit': true,
      'x-ratelimit-remaining': true,
      'x-ratelimit-reset': true,
      'retry-after': true,
    },
  })
  app.register(cors, {
    origin: [/\.yanceyleo\.com$/, /\.yancey\.app$/, /\.yancey\.pro$/],
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
  })
  app.register(healthcheck)

  // app.use(bodyParser.json())
  // app.use(bodyParser.urlencoded({ extended: true }))
}
