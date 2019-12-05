import { NestApplication } from '@nestjs/core'
import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'
import { GraphQLModule } from '@nestjs/graphql'
import request from 'supertest'
import { SCHEMA_GQL_FILE_NAME } from '../shared/constants'
import { ConfigModule } from '../config/config.module'
import { ConfigService } from '../config/config.service'
import { OpenSourcesModule } from './open-sources.module'
import { OpenSourceModel } from './models/open-sources.model'
import { CreateOpenSourceInput } from './dtos/create-open-source.input'
import { UpdateOpenSourceInput } from './dtos/update-open-source.input'
import { BatchDelete } from '../database/interfaces/batchDelete.interface'

describe('OpenSourcesController (e2e)', () => {
  let app: NestApplication
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        OpenSourcesModule,
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

  const createdData: CreateOpenSourceInput = {
    title: 'blog-be-next',
    description: 'the backend for my blog',
    url: 'https://yaneyleo.com',
    posterUrl: 'https://yaneyleo.com',
  }

  let id = ''

  const updatedData: UpdateOpenSourceInput = {
    id,
    title: 'blog-cms-v2',
    description: 'the cms for my blog',
    url: 'https://yaneyleo.com',
    posterUrl: 'https://yaneyleo.com',
  }

  const createDataString = JSON.stringify(createdData).replace(/"([^(")"]+)":/g, '$1:')

  // CREATE_ONE
  it('createOpenSource', () => {
    const createOneTypeDefs = `
    mutation CreateOpenSource {
      createOpenSource(input: ${createDataString}) {
        _id
        title
        description
        url
        posterUrl
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
        const testData: OpenSourceModel = body.data.createOpenSource

        id = testData._id

        expect(testData.title).toBe(createdData.title)
        expect(testData.description).toBe(createdData.description)
        expect(testData.url).toBe(createdData.url)
        expect(testData.posterUrl).toBe(createdData.posterUrl)
      })
      .expect(200)
  })

  // READ_ALL
  it('getOpenSources', () => {
    const getAllTypeDefs = `
    query GetOpenSources {
      getOpenSources {
        _id
        title
        description
        url
        posterUrl
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
        const testData: OpenSourceModel[] = body.data.getOpenSources

        const firstData = testData[0]

        expect(testData.length).toBeGreaterThan(0)
        expect(firstData._id).toBe(id)
        expect(firstData.title).toBe(createdData.title)
        expect(firstData.description).toBe(createdData.description)
        expect(firstData.url).toBe(createdData.url)
        expect(firstData.posterUrl).toBe(createdData.posterUrl)
      })
      .expect(200)
  })

  // READ_ONE
  it('getOpenSourceById', () => {
    const getOneByIdTypeDefs = `
    query GetOpenSourceById {
      getOpenSourceById(id: "${id}") {
        _id
        title
        description
        url
        posterUrl
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
        const testData: OpenSourceModel = body.data.getOpenSourceById

        expect(testData._id).toBe(id)
        expect(testData.title).toBe(createdData.title)
        expect(testData.description).toBe(createdData.description)
        expect(testData.url).toBe(createdData.url)
        expect(testData.posterUrl).toBe(createdData.posterUrl)
      })
      .expect(200)
  })

  // UPDATE_ONE
  it('updateOpenSourceById', () => {
    const updateDataString = JSON.stringify({ ...updatedData, id }).replace(/"([^(")"]+)":/g, '$1:')

    const updateOneByIdTypeDefs = `
    mutation UpdateOpenSourceById {
      updateOpenSourceById(input: ${updateDataString}) {
        _id
        title
        description
        url
        posterUrl
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
        const testData: OpenSourceModel = body.data.updateOpenSourceById
        expect(testData.title).toBe(updatedData.title)
        expect(testData.description).toBe(updatedData.description)
        expect(testData.url).toBe(updatedData.url)
        expect(testData.posterUrl).toBe(updatedData.posterUrl)
      })
      .expect(200)
  })

  // DELETE_ONE
  it('deleteOpenSourceById', () => {
    const deleteOneByIdTypeDefs = `
    mutation DeleteOpenSourceById {
      deleteOpenSourceById(id: "${id}") {
        _id
        title
        description
        url
        posterUrl
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
        const testData: OpenSourceModel = body.data.deleteOpenSourceById

        expect(testData.title).toBe(updatedData.title)
        expect(testData.description).toBe(updatedData.description)
        expect(testData.url).toBe(updatedData.url)
        expect(testData.posterUrl).toBe(updatedData.posterUrl)
      })
      .expect(200)
  })

  // // BATCH_DELETE
  it('deleteOpenSources', () => {
    const batchDeleteTypeDefs = `
    mutation DeleteOpenSources {
      deleteOpenSources(ids: ["${id}"]) {
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
        const testData: BatchDelete = body.data.deleteOpenSources
        expect(testData.ok).toBe(1)
        expect(testData.n).toBe(0)
        expect(testData.deletedCount).toBe(0)
      })
      .expect(200)
  })
})
