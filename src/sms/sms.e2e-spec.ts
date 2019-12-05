import { NestApplication } from '@nestjs/core'
import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'
import { GraphQLModule } from '@nestjs/graphql'
import request from 'supertest'
import { SCHEMA_GQL_FILE_NAME } from '../shared/constants'
import { ConfigModule } from '../config/config.module'
import { ConfigService } from '../config/config.service'
import { SMSModule } from './sms.module'
import { SendSMSInput } from './dtos/sendSMS.input'
import { ValidateSMSInput } from './dtos/validateSMS.input'
import { SendSMSRes } from './dtos/sendSMSRes.dto'
import { ValidateSMSRes } from './dtos/validateSMSRes.dto'

describe('SMSController (e2e)', () => {
  let app: NestApplication
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        SMSModule,
        MongooseModule.forRootAsync({
          useFactory: async (configService: ConfigService) => ({
            uri: configService.getMongoURI(),
            useFindAndModify: false,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
          }),
          inject: [ConfigService],
        }),
        GraphQLModule.forRoot({
          autoSchemaFile: SCHEMA_GQL_FILE_NAME,
        }),
      ],
    }).compile()
    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  const validPhoneNumber = '15011189639'
  // const invalidPhoneNumber = '15011189639x'

  let verificationCode = ''

  it('sendSMS', () => {
    const sendSMSData: SendSMSInput = {
      phoneNumber: validPhoneNumber,
    }

    const sendSMSJSON = JSON.stringify(sendSMSData).replace(/"([^(")"]+)":/g, '$1:')

    const sendSMSTypeDefs = `
    mutation SendSMSOpenSource {
      sendSMS(input: ${sendSMSJSON}) {
        verificationCode
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: sendSMSTypeDefs,
      })
      .expect(({ body }) => {
        const testData: SendSMSRes = body.data.sendSMS
        verificationCode = testData.verificationCode
      })
      .expect(200)
  })

  it('validateSMS', () => {
    const validateSMSData: ValidateSMSInput = {
      phoneNumber: validPhoneNumber,
      verificationCode,
    }

    const validateSMSJSON = JSON.stringify(validateSMSData).replace(/"([^(")"]+)":/g, '$1:')

    const validateSMSTypeDefs = `
    mutation ValidateSMS {
      validateSMS(input: ${validateSMSJSON}) {
        success
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: validateSMSTypeDefs,
      })
      .expect(({ body }) => {
        const testData: ValidateSMSRes = body.data.validateSMS

        expect(testData.success).toBeTruthy()
      })
      .expect(200)
  })
})
