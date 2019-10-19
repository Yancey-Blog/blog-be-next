import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

// const {
//   DATABASE_HOST: HOST,
//   DATABASE_PORT: PORT,
//   DATABASE_COLLECTION: COLLECTION,
//   DATABASE_USER: USER,
//   DATABASE_PWD: PWD,
// } = process.env

@Module({
  imports: [
    MongooseModule.forRoot(
      // `mongodb://${USER}:${PWD}@${HOST}:${PORT}/${COLLECTION}`,
      'mongodb://localhost:27017/blog',
    ),
  ],
})
export class DataBasesModule {}
