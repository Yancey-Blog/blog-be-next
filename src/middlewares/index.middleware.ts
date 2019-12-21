import { NestFastifyApplication } from '@nestjs/platform-fastify'
// import path from 'path'
// import serveFavicon from 'serve-favicon'
// import bodyParser from 'body-parser'
// import morgan from 'morgan'
// import helmet from 'fastify-helmet'
// import csurf from 'csurf'
import rateLimit from 'fastify-rate-limit'

export const configMiddlewares = (app: NestFastifyApplication) => {
  // app.register(serveFavicon(path.join(process.cwd(), 'public/assets/favicon/favicon.ico')))
  // app.register(bodyParser.json())
  // app.register(bodyParser.urlencoded({ extended: true }))
  // app.register(morgan('combined'))
  // app.register(helmet())
  // app.register(csurf())
  // app.enableCors({})
  app.register(rateLimit, {
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
}
