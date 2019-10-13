import { Injectable } from '@nestjs/common'

@Injectable()
export class ConfigService {
  private readonly envConfig: string

  constructor(filePath: string) {
    this.envConfig = filePath
  }
}
