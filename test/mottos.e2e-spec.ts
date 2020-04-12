import { NestApplication } from '@nestjs/core'
import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'
import { GraphQLModule } from '@nestjs/graphql'
import request from 'supertest'
import { SCHEMA_GQL_FILE_NAME } from '../src/shared/constants'
import { ConfigModule } from '../src/config/config.module'
import { ConfigService } from '../src/config/config.service'
import { MottosModule } from '../src/mottos/mottos.module'
import { MottoModel } from '../src/mottos/models/mottos.model'
import { CreateMottoInput } from '../src/mottos/dtos/create-motto.input'
import { UpdateMottoInput } from '../src/mottos/dtos/update-motto.input'
import { BatchDeleteModel } from '../src/database/models/batch-delete.model'

describe('MottosController (e2e)', () => {
  let app: NestApplication
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        MottosModule,
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

  const createdData: CreateMottoInput = {
    content: 'blog-be-next',
  }

  let id = ''

  const updatedData: UpdateMottoInput = {
    id,
    content: 'blog-be-cms',
  }

  const createDataString = JSON.stringify(createdData).replace(/"([^(")"]+)":/g, '$1:')

  // CREATE_ONE
  it('createMotto', async () => {
    const createOneTypeDefs = `
    mutation CreateMotto {
      createMotto(input: ${createDataString}) {
        _id
        content
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: createOneTypeDefs,
      })
      .expect(({ body }) => {
        const testData: MottoModel = body.data.createMotto
        id = testData._id
        expect(testData.content).toBe(createdData.content)
      })
      .expect(200)
  })

  // EXCHANGE
  it('exchangePositionMotto', async () => {
    const exchangeTypeDefs = `
      mutation ExchangePositionMotto {
        exchangePositionMotto(input: ${JSON.stringify({
          id,
          exchangedId: id,
          weight: 1,
          exchangedWeight: 1,
        }).replace(/"([^(")"]+)":/g, '$1:')}) {
          _id
          content
        }
      }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: exchangeTypeDefs,
      })
      .expect(({ body }) => {
        const testData: MottoModel[] = body.data.exchangePositionMotto
        const firstData = testData[0]
        expect(firstData.content).toBe(createdData.content)
      })
      .expect(200)
  })

  // READ_ALL
  it('getMottos', async () => {
    const getAllTypeDefs = `
    query GetMottos {
      getMottos {
        _id
        content
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: getAllTypeDefs,
      })
      .expect(({ body }) => {
        const testData: MottoModel[] = body.data.getMottos

        const firstData = testData[0]

        expect(testData.length).toBeGreaterThan(0)
        expect(firstData._id).toBe(id)
        expect(firstData.content).toBe(createdData.content)
      })
      .expect(200)
  })

  // READ_ONE
  it('getMottoById', async () => {
    const getOneByIdTypeDefs = `
    query GetMottoById {
      getMottoById(id: "${id}") {
        _id
        content
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: getOneByIdTypeDefs,
      })
      .expect(({ body }) => {
        const testData: MottoModel = body.data.getMottoById

        expect(testData._id).toBe(id)
        expect(testData.content).toBe(createdData.content)
      })
      .expect(200)
  })

  // UPDATE_ONE
  it('updateMottoById', async () => {
    const updateDataString = JSON.stringify({ ...updatedData, id }).replace(/"([^(")"]+)":/g, '$1:')

    const updateOneByIdTypeDefs = `
    mutation UpdateMottoById {
      updateMottoById(input: ${updateDataString}) {
        _id
        content
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: updateOneByIdTypeDefs,
      })
      .expect(({ body }) => {
        const testData: MottoModel = body.data.updateMottoById
        expect(testData.content).toBe(updatedData.content)
      })
      .expect(200)
  })

  // DELETE_ONE
  it('deleteMottoById', async () => {
    const deleteOneByIdTypeDefs = `
    mutation DeleteMottoById {
      deleteMottoById(id: "${id}") {
        _id
        content
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: deleteOneByIdTypeDefs,
      })
      .expect(({ body }) => {
        const testData: MottoModel = body.data.deleteMottoById

        expect(testData.content).toBe(updatedData.content)
      })
      .expect(200)
  })

  // BATCH_DELETE
  it('deleteMottos', async () => {
    const batchDeleteTypeDefs = `
    mutation DeleteMottos {
      deleteMottos(ids: ["${id}"]) {
        ok
        n
        deletedCount
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: batchDeleteTypeDefs,
      })
      .expect(({ body }) => {
        const testData: BatchDeleteModel = body.data.deleteMottos
        expect(testData.ok).toBe(1)
        expect(testData.n).toBe(0)
        expect(testData.deletedCount).toBe(0)
      })
      .expect(200)
  })
})
