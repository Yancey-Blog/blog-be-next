import { INestApplication } from '@nestjs/common'
import path from 'path'
import serveFavicon from 'serve-favicon'
import bodyParser from 'body-parser'

export const configMiddlewares = (app: INestApplication) => {
  app.use(serveFavicon(path.join(process.cwd(), 'public/assets/favicon.ico')))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
}
