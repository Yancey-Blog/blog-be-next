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
import { SMSModel } from './models/sms.model'
import { GraphQLError } from '../graphql/interfaces/errorRes.interface'
import { jsonStringify } from '../shared/utils'

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

  const validPhoneNumber = '15997693333'
  const invalidPhoneNumber = '13261308888x'
  const nonexistentPhoneNumber = '13261308888'

  let verificationCode = ''

  const sendSMSData: SendSMSInput = {
    phoneNumber: validPhoneNumber,
  }

  const sendSMSTypeDefs = `
  mutation SendSMSOpenSource {
    sendSMS(input: ${jsonStringify(sendSMSData)}) {
      verificationCode
    }
  }`

  it('send SMS with invalid phone number (trigger ValidationPipe exception).', () => {
    const sendInvalidSMSData: SendSMSInput = {
      phoneNumber: invalidPhoneNumber,
    }

    const typeDefs = `
    mutation SendSMSOpenSource {
      sendSMS(input: ${jsonStringify(sendInvalidSMSData)}) {
        verificationCode
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: typeDefs,
      })
      .expect(({ body }) => {
        const testData: GraphQLError = body.errors

        const firstData = testData[0]

        expect(typeof firstData.message).toBe('string')
      })
      .expect(200)
  })

  it('send SMS success.', () =>
    request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: sendSMSTypeDefs,
      })
      .expect(({ body }) => {
        const testData: SendSMSRes = body.data.sendSMS
        verificationCode = testData.verificationCode
      })
      .expect(200))

  it('send SMS too often (trigger Ali SMS exception).', () =>
    request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: sendSMSTypeDefs,
      })
      .expect(({ body }) => {
        const testData: GraphQLError = body.errors

        const firstData = testData[0]

        expect(typeof firstData.message).toBe('string')
      })
      .expect(200))

  it('validate SMS success.', () => {
    const validateSMSData: ValidateSMSInput = {
      phoneNumber: validPhoneNumber,
      verificationCode,
    }

    const typeDefs = `
    mutation ValidateSMS {
      validateSMS(input: ${jsonStringify(validateSMSData)}) {
        success
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: typeDefs,
      })
      .expect(({ body }) => {
        const testData: ValidateSMSRes = body.data.validateSMS

        expect(testData.success).toBeTruthy()
      })
      .expect(200)
  })

  it('validate SMS with an nonexistent phone number (trigger GraphQLError exception).', () => {
    const validateNonexistentSMSData: ValidateSMSInput = {
      phoneNumber: nonexistentPhoneNumber,
      verificationCode,
    }

    const typeDefs = `
    mutation ValidateSMS {
      validateSMS(input: ${jsonStringify(validateNonexistentSMSData)}) {
        success
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: typeDefs,
      })
      .expect(({ body }) => {
        const testData: GraphQLError = body.errors

        const firstData = testData[0]

        expect(typeof firstData.message).toBe('string')
      })
      .expect(200)
  })

  it('validate SMS with an nonexistent phone number (trigger GraphQLError exception).', () => {
    const validateNonexistentSMSData: ValidateSMSInput = {
      phoneNumber: validPhoneNumber,
      verificationCode: (parseInt(verificationCode, 10) + 1).toString(),
    }

    const typeDefs = `
    mutation ValidateSMS {
      validateSMS(input: ${jsonStringify(validateNonexistentSMSData)}) {
        success
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: typeDefs,
      })
      .expect(({ body }) => {
        const testData: GraphQLError = body.errors

        const firstData = testData[0]

        expect(typeof firstData.message).toBe('string')
      })
      .expect(200)
  })

  it('getAllSMS', () => {
    const typeDefs = `
    query GetAllSMS {
      getAllSMS {
        _id
        phoneNumber
        verificationCode
        createdAt
        updatedAt
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: typeDefs,
      })
      .expect(({ body }) => {
        const testData: SMSModel[] = body.data.getAllSMS

        expect(testData.length).toBeGreaterThan(0)
      })
      .expect(200)
  })
})
