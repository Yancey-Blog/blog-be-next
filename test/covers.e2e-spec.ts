import { NestApplication } from '@nestjs/core'
import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'
import { GraphQLModule } from '@nestjs/graphql'
import request from 'supertest'
import { SCHEMA_GQL_FILE_NAME } from '../src/shared/constants'
import { ConfigModule } from '../src/config/config.module'
import { ConfigService } from '../src/config/config.service'
import { CoversModule } from '../src/covers/covers.module'
import { CoverModel } from '../src/covers/models/covers.model'
import { CreateCoverInput } from '../src/covers/dtos/create-cover.input'
import { UpdateCoverInput } from '../src/covers/dtos/update-cover.input'
import { BatchDeleteModel } from '../src/database/models/batch-delete.model'

describe('CoversController (e2e)', () => {
  let app: NestApplication
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        CoversModule,
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

  const createdData: CreateCoverInput = {
    title: 'blog-be-next',
    coverUrl: 'https://www.yanceyleo.com/',
    isPublic: true,
  }

  let id = ''

  const updatedData: UpdateCoverInput = {
    id,
    title: 'blog-be',
    coverUrl: 'https://www.yanceyleo.com/jpg',
  }

  const createDataString = JSON.stringify(createdData).replace(/"([^(")"]+)":/g, '$1:')

  // CREATE_ONE
  it('createCover', async () => {
    const createOneTypeDefs = `
    mutation CreateCover {
      createCover(input: ${createDataString}) {
        _id
        title
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: createOneTypeDefs,
      })
      .expect(({ body }) => {
        const testData: CoverModel = body.data.createCover
        id = testData._id
        expect(testData.title).toBe(createdData.title)
      })
      .expect(200)
  })

  // EXCHANGE
  it('exchangePositionCover', async () => {
    const exchangeTypeDefs = `
      mutation ExchangePositionCover {
        exchangePositionCover(input: ${JSON.stringify({
          id,
          exchangedId: id,
          weight: 1,
          exchangedWeight: 1,
        }).replace(/"([^(")"]+)":/g, '$1:')}) {
          _id
          title
        }
      }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: exchangeTypeDefs,
      })
      .expect(({ body }) => {
        const testData: CoverModel[] = body.data.exchangePositionCover
        const firstData = testData[0]
        expect(firstData.title).toBe(createdData.title)
      })
      .expect(200)
  })

  // READ_ALL
  it('getCovers', async () => {
    const getAllTypeDefs = `
    query GetCovers {
      getCovers {
        _id
        title
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: getAllTypeDefs,
      })
      .expect(({ body }) => {
        const testData: CoverModel[] = body.data.getCovers

        const firstData = testData[0]

        expect(testData.length).toBeGreaterThan(0)
        expect(firstData._id).toBe(id)
        expect(firstData.title).toBe(createdData.title)
      })
      .expect(200)
  })

  // READ_ONE
  it('getCoverById', async () => {
    const getOneByIdTypeDefs = `
    query GetCoverById {
      getCoverById(id: "${id}") {
        _id
        title
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: getOneByIdTypeDefs,
      })
      .expect(({ body }) => {
        const testData: CoverModel = body.data.getCoverById

        expect(testData._id).toBe(id)
        expect(testData.title).toBe(createdData.title)
      })
      .expect(200)
  })

  // UPDATE_ONE
  it('updateCoverById', async () => {
    const updateDataString = JSON.stringify({ ...updatedData, id }).replace(/"([^(")"]+)":/g, '$1:')

    const updateOneByIdTypeDefs = `
    mutation UpdateCoverById {
      updateCoverById(input: ${updateDataString}) {
        _id
        title
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: updateOneByIdTypeDefs,
      })
      .expect(({ body }) => {
        const testData: CoverModel = body.data.updateCoverById
        expect(testData.title).toBe(updatedData.title)
      })
      .expect(200)
  })

  // DELETE_ONE
  it('deleteCoverById', async () => {
    const deleteOneByIdTypeDefs = `
    mutation DeleteCoverById {
      deleteCoverById(id: "${id}") {
        _id
        title
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: deleteOneByIdTypeDefs,
      })
      .expect(({ body }) => {
        const testData: CoverModel = body.data.deleteCoverById

        expect(testData.title).toBe(updatedData.title)
      })
      .expect(200)
  })

  // BATCH_DELETE
  it('deleteCovers', async () => {
    const batchDeleteTypeDefs = `
    mutation DeleteCovers {
      deleteCovers(ids: ["${id}"]) {
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
        const testData: BatchDeleteModel = body.data.deleteCovers
        expect(testData.ok).toBe(1)
        expect(testData.n).toBe(0)
        expect(testData.deletedCount).toBe(0)
      })
      .expect(200)
  })
})
