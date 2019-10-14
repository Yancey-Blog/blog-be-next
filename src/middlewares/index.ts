import { INestApplication } from '@nestjs/common'
import path from 'path'
import serveFavicon from 'serve-favicon'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'

export const configMiddlewares = (app: INestApplication) => {
  app.use(serveFavicon(path.join(process.cwd(), 'public/assets/favicon.ico')))
  app.use(cors())
  app.use(morgan('combined'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
}
