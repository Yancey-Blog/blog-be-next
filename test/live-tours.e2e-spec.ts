import { NestApplication } from '@nestjs/core'
import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'
import { GraphQLModule } from '@nestjs/graphql'
import request from 'supertest'
import { SCHEMA_GQL_FILE_NAME } from '../src/shared/constants'
import { ConfigModule } from '../src/config/config.module'
import { ConfigService } from '../src/config/config.service'
import { LiveToursModule } from '../src/live-tours/live-tours.module'
import { LiveTourModel } from '../src/live-tours/models/live-tours.model'
import { CreateLiveTourInput } from '../src/live-tours/dtos/create-live-tour.input'
import { UpdateLiveTourInput } from '../src/live-tours/dtos/update-live-tour.input'
import { BatchDelete } from '../src/database/interfaces/batchDelete.interface'

describe('LiveToursController (e2e)', () => {
  let app: NestApplication
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        LiveToursModule,
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

  const createdData: CreateLiveTourInput = {
    title: 'blog-be-next',
    showTime: new Date().toJSON(),
    posterUrl: 'https://yaneyleo.com',
  }

  let id = ''

  const updatedData: UpdateLiveTourInput = {
    id,
    title: 'blog-cms-v2',
    showTime: new Date().toJSON(),
    posterUrl: 'https://yaneyleo.com',
  }

  const createDataString = JSON.stringify(createdData).replace(/"([^(")"]+)":/g, '$1:')

  // CREATE_ONE
  it('createLiveTour', () => {
    const createOneTypeDefs = `
    mutation CreateLiveTour {
      createLiveTour(input: ${createDataString}) {
        _id
        title
        posterUrl
        showTime
        createdAt
        updatedAt
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: createOneTypeDefs,
      })
      .expect(({ body }) => {
        const testData: LiveTourModel = body.data.createLiveTour

        id = testData._id

        expect(testData.title).toBe(createdData.title)
        expect(testData.posterUrl).toBe(createdData.posterUrl)
      })
      .expect(200)
  })

  // READ_ALL
  it('getLiveTours', () => {
    const getAllTypeDefs = `
    query GetLiveTours {
      getLiveTours {
        _id
        title
        posterUrl
        showTime
        createdAt
        updatedAt
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: getAllTypeDefs,
      })
      .expect(({ body }) => {
        const testData: LiveTourModel[] = body.data.getLiveTours

        const firstData = testData[0]

        expect(testData.length).toBeGreaterThan(0)
        expect(firstData._id).toBe(id)
        expect(firstData.title).toBe(createdData.title)
        expect(firstData.posterUrl).toBe(createdData.posterUrl)
      })
      .expect(200)
  })

  // READ_ONE
  it('getLiveTourById', () => {
    const getOneByIdTypeDefs = `
    query GetLiveTourById {
      getLiveTourById(id: "${id}") {
        _id
        title
        posterUrl
        showTime
        createdAt
        updatedAt
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: getOneByIdTypeDefs,
      })
      .expect(({ body }) => {
        const testData: LiveTourModel = body.data.getLiveTourById

        expect(testData._id).toBe(id)
        expect(testData.title).toBe(createdData.title)
        expect(testData.posterUrl).toBe(createdData.posterUrl)
      })
      .expect(200)
  })

  // UPDATE_ONE
  it('updateLiveTourById', () => {
    const updateDataString = JSON.stringify({ ...updatedData, id }).replace(/"([^(")"]+)":/g, '$1:')

    const updateOneByIdTypeDefs = `
    mutation UpdateLiveTourById {
      updateLiveTourById(input: ${updateDataString}) {
        _id
        title
        posterUrl
        showTime
        createdAt
        updatedAt
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: updateOneByIdTypeDefs,
      })
      .expect(({ body }) => {
        const testData: LiveTourModel = body.data.updateLiveTourById
        expect(testData.title).toBe(updatedData.title)
        expect(testData.posterUrl).toBe(updatedData.posterUrl)
      })
      .expect(200)
  })

  // DELETE_ONE
  it('deleteLiveTourById', () => {
    const deleteOneByIdTypeDefs = `
    mutation DeleteLiveTourById {
      deleteLiveTourById(id: "${id}") {
        _id
        title
        posterUrl
        showTime
        createdAt
        updatedAt
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: deleteOneByIdTypeDefs,
      })
      .expect(({ body }) => {
        const testData: LiveTourModel = body.data.deleteLiveTourById

        expect(testData.title).toBe(updatedData.title)
        expect(testData.posterUrl).toBe(updatedData.posterUrl)
      })
      .expect(200)
  })

  // // BATCH_DELETE
  it('deleteLiveTours', () => {
    const batchDeleteTypeDefs = `
    mutation DeleteLiveTours {
      deleteLiveTours(ids: ["${id}"]) {
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
        const testData: BatchDelete = body.data.deleteLiveTours
        expect(testData.ok).toBe(1)
        expect(testData.n).toBe(0)
        expect(testData.deletedCount).toBe(0)
      })
      .expect(200)
  })
})
