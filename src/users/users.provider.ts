import { Connection } from 'mongoose'
import { CatSchema } from './schemas/users.scheme'

export const catsProviders = [
  {
    provide: 'CAT_MODEL',
    useFactory: (connection: Connection) => connection.model('Cat', CatSchema),
    inject: ['DATABASE_CONNECTION'],
  },
]
