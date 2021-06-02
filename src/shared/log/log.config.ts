import { INestApplication } from '@nestjs/common'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { GraphQLExceptionFilter } from '../filters/graqhql-exception.filter'

export const configLog = (app: INestApplication) => {
  const nestWinston = app.get(WINSTON_MODULE_NEST_PROVIDER)
  app.useLogger(nestWinston)
  app.useGlobalFilters(new GraphQLExceptionFilter(nestWinston.logger))
}
