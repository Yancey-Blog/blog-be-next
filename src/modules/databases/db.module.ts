import { TypeOrmModule } from '@nestjs/typeorm'
import path from 'path'

TypeOrmModule.forRoot({
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  username: 'root',
  password: 'root',
  database: 'blog',
  entities: [path.join(__dirname, '/**/*.entity{.ts,.js}')],
  synchronize: true,
})
