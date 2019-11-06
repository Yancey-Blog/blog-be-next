import dotenv from 'dotenv'
import fs from 'fs'
import { IAliOSSKey } from './interfaces/aliOSSKey.interface'

export class ConfigService {
  private readonly envConfig: Record<string, string>

  public readonly isEnvProduction: boolean

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath))
    this.isEnvProduction = this.get('NODE_ENV') === 'production'
  }

  public get(key: string): string {
    return this.envConfig[key]
  }

  public getMongoURI(): string {
    const host = this.get('DATABASE_HOST')
    const port = this.get('DATABASE_PORT')
    const userName = this.get('DATABASE_USER')
    const userPwd = this.get('DATABASE_PWD')
    const collection = this.get('DATABASE_COLLECTION')

    const prefix = 'mongodb://'
    const auth = `${userName}:${userPwd}@`
    const connection = `${host}:${port}/${collection}`

    return this.isEnvProduction
      ? `${prefix}${auth}${connection}`
      : `${prefix}${connection}`
  }

  public getAliOSSKeys(): IAliOSSKey {
    return {
      accessKeyId: this.get('ALI_OSS_ACCESS_KEY_ID'),
      accessKeySecret: this.get('ALI_OSS_ACCESS_KEY_SECRET'),
      bucket: this.get('ALI_OSS_BUCKET'),
    }
  }
}
