import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigService } from '../config/config.service'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        // uri: configService.getMongoURI(),
        uri: 'mongodb://mongo:27017/blog',
        useFindAndModify: false,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DataBaseModule {}
