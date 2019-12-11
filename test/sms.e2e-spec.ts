import { NestApplication } from '@nestjs/core'
import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'
import { GraphQLModule } from '@nestjs/graphql'
import request from 'supertest'
import { SCHEMA_GQL_FILE_NAME } from '../src/shared/constants'
import { ConfigModule } from '../src/config/config.module'
import { ConfigService } from '../src/config/config.service'
import { SMSModule } from '../src/sms/sms.module'
import { SendSMSInput } from '../src/sms/dtos/sendSMS.input'
import { ValidateSMSInput } from '../src/sms/dtos/validateSMS.input'
import { SendSMSRes } from '../src/sms/dtos/sendSMSRes.dto'
import { ValidateSMSRes } from '../src/sms/dtos/validateSMSRes.dto'
import { SMSModel } from '../src/sms/models/sms.model'
import { GraphQLError } from '../src/graphql/interfaces/errorRes.interface'
import { jsonStringify } from '../src/shared/utils'

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

  // it('send SMS too often (trigger Ali SMS exception).', () =>
  //   request(app.getHttpServer())
  //     .post('/graphql')
  //     .send({
  //       operationName: null,
  //       query: sendSMSTypeDefs,
  //     })
  //     .expect(({ body }) => {
  //       const testData: GraphQLError = body.errors

  //       const firstData = testData[0]

  //       expect(typeof firstData.message).toBe('string')
  //     })
  //     .expect(200))

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
