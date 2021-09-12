import dotenv, { DotenvParseOutput } from 'dotenv'
import Joi, { ObjectSchema } from 'joi'
import fs from 'fs'
import { AliSMSKey, AliKey } from './interfaces/ali-keys.interface'
import { BandwagonKey } from './interfaces/bandwagon-keys.interface'

export type EnvConfig = Record<string, any>

export class ConfigService {
  public readonly isEnvProduction: boolean

  public readonly isEnvDevelopment: boolean

  public readonly isEnvTest: boolean

  private readonly envConfig: EnvConfig

  constructor(filePaths: string[]) {
    let config: DotenvParseOutput = {}
    filePaths.forEach((filePath) => {
      const _config = dotenv.parse(fs.readFileSync(filePath))
      config = { ...config, ..._config }
    })
    this.envConfig = this.validateEnvFile(config)
    this.isEnvProduction = this.getNodeEnv() === 'production'
    this.isEnvDevelopment = this.getNodeEnv() === 'development'
    this.isEnvTest = this.getNodeEnv() === 'test'
  }

  public getNodeEnv(): string {
    return this.get('NODE_ENV')
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

  public getAliKeys(): AliKey {
    return {
      ALI_ACCESS_KEY_ID: this.get('ALI_ACCESS_KEY_ID'),
      ALI_ACCESS_KEY_SECRET: this.get('ALI_ACCESS_KEY_SECRET'),
    }
  }

  public getAliSMSKeys(): AliSMSKey {
    return {
      ...this.getAliKeys(),
      ALI_SMS_SIGN_NAME: this.get('ALI_SMS_SIGN_NAME'),
      ALI_SMS_TEMPLATE_CODE: this.get('ALI_SMS_TEMPLATE_CODE'),
    }
  }

  public getBandwagonKeys(): BandwagonKey {
    return {
      BANDWAGON_SECRET_KEY: this.get('BANDWAGON_SECRET_KEY'),
      BANDWAGON_SERVER_ID: this.get('BANDWAGON_SERVER_ID'),
    }
  }

  public getIpStackAccessKey(): string {
    return this.get('IP_STACK_ACCESS_KEY')
  }

  public getJWTSecretKey(): string {
    return this.get('JWT_SECRET_KEY')
  }

  public getJWTExpiresTime(): number {
    return this.get('JWT_EXPIRES_TIME')
  }

  public needSimulateNetworkThrottle(): boolean {
    return this.get('NEED_SIMULATE_NETWORK_THROTTLE')
  }

  public getGoogleRecaptchaKey(): string {
    return this.get('GOOGLE_RECAPTCHA_KEY')
  }

  public getAzureStorageConnectionString(): string {
    return this.get('AZURE_STORAGE_CONNECTION_STRING')
  }

  private validateEnvFile(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production', 'test')
        .default('development')
        .required(),
      APP_PORT: Joi.number().default(3002).required(),
      DATABASE_HOST: Joi.string().required(),
      DATABASE_PORT: Joi.number().default(27017).required(),
      DATABASE_USER: this.isEnvProduction ? Joi.string().required() : Joi.string().optional(),
      DATABASE_PWD: this.isEnvProduction ? Joi.string().required() : Joi.string().optional(),
      DATABASE_COLLECTION: Joi.string().required(),
      BANDWAGON_SECRET_KEY: Joi.string().required(),
      BANDWAGON_SERVER_ID: Joi.string().required(),
      ALI_ACCESS_KEY_ID: Joi.string().required(),
      ALI_ACCESS_KEY_SECRET: Joi.string().required(),
      ALI_SMS_SIGN_NAME: Joi.string().required(),
      ALI_SMS_TEMPLATE_CODE: Joi.string().required(),
      IP_STACK_ACCESS_KEY: Joi.string().required(),
      JWT_SECRET_KEY: Joi.string().required(),
      JWT_EXPIRES_TIME: Joi.number().required(),
      GOOGLE_RECAPTCHA_KEY: Joi.string().required(),
      AZURE_STORAGE_CONNECTION_STRING: Joi.string().required(),
      NEED_SIMULATE_NETWORK_THROTTLE: Joi.boolean().optional(),
    })

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(envConfig)
    if (error) {
      throw new Error(`Config validation error: ${error.message}`)
    }
    return validatedEnvConfig
  }

  private get<T>(key: string): T {
    return this.envConfig[key]
  }
}
