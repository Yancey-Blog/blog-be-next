import dotenv from 'dotenv'
import fs from 'fs'

export class ConfigService {
  private readonly envConfig: Record<string, string>

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath))
  }

  public get(key: string): string {
    return this.envConfig[key]
  }

  public getMongoURI(): string {
    const isEnvProduction = this.get('NODE_ENV') === 'production'

    const host = this.get('DATABASE_HOST')
    const port = this.get('DATABASE_PORT')
    const userName = this.get('DATABASE_USER')
    const userPwd = this.get('DATABASE_PWD')
    const collection = this.get('DATABASE_COLLECTION')

    const prefix = 'mongodb://'
    const auth = `${userName}:${userPwd}@`
    const connection = `${host}:${port}/${collection}`

    return isEnvProduction
      ? `${prefix}${auth}${connection}`
      : `${prefix}${connection}`
  }
}
