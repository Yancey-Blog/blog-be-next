import dotenv from 'dotenv'
import Joi, { ObjectSchema } from '@hapi/joi'
import fs from 'fs'
import { AliOSSKey, AliSMSKey } from './interfaces/aliKeys.interface'

export type EnvConfig = Record<string, string>

export class ConfigService {
  public readonly isEnvProduction: boolean

  public readonly isEnvDevelopment: boolean

  public readonly isEnvTest: boolean

  private readonly envConfig: EnvConfig

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath))
    this.envConfig = this.validateEnvFile(config)
    this.isEnvProduction = this.get('NODE_ENV') === 'production'
    this.isEnvDevelopment = this.get('NODE_ENV') === 'development'
    this.isEnvTest = this.get('NODE_ENV') === 'test'
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

    return this.isEnvProduction ? `${prefix}${auth}${connection}` : `${prefix}${connection}`
  }

  public getAliOSSKeys(): AliOSSKey {
    return {
      ALI_OSS_ACCESS_KEY_ID: this.get('ALI_OSS_ACCESS_KEY_ID'),
      ALI_OSS_ACCESS_KEY_SECRET: this.get('ALI_OSS_ACCESS_KEY_SECRET'),
      ALI_OSS_BUCKET: this.get('ALI_OSS_BUCKET'),
    }
  }

  public getAliSMSKeys(): AliSMSKey {
    return {
      ALI_SMS_ACCESS_KEY_ID: this.get('ALI_SMS_ACCESS_KEY_ID'),
      ALI_SMS_ACCESS_KEY_SECRET: this.get('ALI_SMS_ACCESS_KEY_SECRET'),
      ALI_SMS_SIGN_NAME: this.get('ALI_SMS_SIGN_NAME'),
      ALI_SMS_TEMPLATE_CODE: this.get('ALI_SMS_TEMPLATE_CODE'),
    }
  }

  public getJWTSecretKey(): string {
    return this.get('JWT_SECRET_KEY')
  }

  private validateEnvFile(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production', 'test')
        .default('development'),
      APP_PORT: Joi.number().default(3002),
      DATABASE_HOST: Joi.string(),
      DATABASE_PORT: Joi.number().default(27017),
      DATABASE_USER: this.isEnvProduction ? Joi.string() : Joi.string().optional(),
      DATABASE_PWD: this.isEnvProduction ? Joi.string() : Joi.string().optional(),
      DATABASE_COLLECTION: Joi.string(),
      BANDWAGON_SECRET_KEY: Joi.string(),
      BANDWAGON_SERVER_ID: Joi.number(),
      GOOGLE_RECAPTCHA_SECRET_KEY: Joi.string(),
      GOOGLE_RECAPTCHA_SITE_KEY: Joi.string(),
      ALI_OSS_ACCESS_KEY_ID: Joi.string(),
      ALI_OSS_ACCESS_KEY_SECRET: Joi.string(),
      ALI_OSS_BUCKET: Joi.string(),
      ALI_SMS_ACCESS_KEY_ID: Joi.string(),
      ALI_SMS_SIGN_NAME: Joi.string(),
      ALI_SMS_ACCESS_KEY_SECRET: Joi.string(),
      ALI_SMS_TEMPLATE_CODE: Joi.string(),
      JWT_SECRET_KEY: Joi.string(),
    })

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(envConfig)
    if (error) {
      throw new Error(`Config validation error: ${error.message}`)
    }
    return validatedEnvConfig
  }

  private get(key: string): string {
    return this.envConfig[key]
  }
}
