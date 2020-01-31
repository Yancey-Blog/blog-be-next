import { NestApplication } from '@nestjs/core'
import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'
import { GraphQLModule } from '@nestjs/graphql'
import request from 'supertest'
import { SCHEMA_GQL_FILE_NAME } from '../src/shared/constants'
import { ConfigModule } from '../src/config/config.module'
import { ConfigService } from '../src/config/config.service'
import { AuthModule } from '../src/Auth/Auth.module'
import { AuthModel } from '../src/auth/models/auth.model'
import { LoginInput } from '../src/auth/dtos/login.input'
import { RegisterInput } from '../src/auth/dtos/register.input'

describe('AuthController (e2e)', () => {
  let app: NestApplication
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        AuthModule,
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

  const loginData: LoginInput = {
    email: 'example@example.com',
    password: 'abcd1234,',
  }

  const registerData: RegisterInput = {
    ...loginData,
    username: 'example',
  }

  const registerDataString = JSON.stringify(registerData).replace(/"([^(")"]+)":/g, '$1:')

  const loginDataString = JSON.stringify(loginData).replace(/"([^(")"]+)":/g, '$1:')

  let id = ''

  // REGISTER
  it('register', async () => {
    const registerTypeDefs = `
    mutation Register {
      register(input: ${registerDataString}) {
        _id
        email
        authorization
        role
        avaterUrl
        username
        phoneNumber
        isTOTP
        createdAt
        updatedAt
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: registerTypeDefs,
      })
      .expect(({ body }) => {
        const testData: AuthModel = body.data.register
        id = testData._id
        expect(testData.username).toBe(registerData.username)
        expect(testData.email).toBe(registerData.email)
      })
      .expect(200)
  })

  // LOGIN
  it('login', async () => {
    const loginTypeDefs = `
    query Login {
      login(input: ${loginDataString}) {
        _id
        email
        authorization
        role
        avaterUrl
        username
        phoneNumber
        isTOTP
        createdAt
        updatedAt
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: loginTypeDefs,
      })
      .expect(({ body }) => {
        const testData: AuthModel = body.data.login

        expect(testData._id).toBe(id)
        expect(testData.email).toBe(loginData.email)
      })
      .expect(200)
  })
})
