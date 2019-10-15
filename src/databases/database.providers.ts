import mongoose from 'mongoose'

const {
  DATABASE_HOST: HOST,
  DATABASE_PORT: PORT,
  DATABASE_COLLECTION: COLLECTION,
  DATABASE_USER: USER,
  DATABASE_PWD: PWD,
} = process.env

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        `mongodb://${USER}:${PWD}@${HOST}:${PORT}/${COLLECTION}`,
      ),
  },
]
