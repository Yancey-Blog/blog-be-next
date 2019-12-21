import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify'
import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'
import { GraphQLModule } from '@nestjs/graphql'
import { SCHEMA_GQL_FILE_NAME } from '../src/shared/constants'
import { ConfigModule } from '../src/config/config.module'
import { ConfigService } from '../src/config/config.service'
import { OpenSourcesModule } from '../src/open-sources/open-sources.module'
import { OpenSourceModel } from '../src/open-sources/models/open-sources.model'
import { CreateOpenSourceInput } from '../src/open-sources/dtos/create-open-source.input'
import { UpdateOpenSourceInput } from '../src/open-sources/dtos/update-open-source.input'
import { BatchDelete } from '../src/database/interfaces/batchDelete.interface'

describe('OpenSourcesController (e2e)', () => {
  let app: NestFastifyApplication
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
    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter())
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

    return app
      .inject({
        method: 'POST',
        url: '/graphql',
        payload: { operationName: null, query: createOneTypeDefs },
      })
      .then(({ payload }) => {
        const testData: OpenSourceModel = JSON.parse(payload).data.createOpenSource
        id = testData._id

        expect(testData.title).toBe(createdData.title)
        expect(testData.description).toBe(createdData.description)
        expect(testData.url).toBe(createdData.url)
        expect(testData.posterUrl).toBe(createdData.posterUrl)
      })
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

    return app
      .inject({
        method: 'POST',
        url: '/graphql',
        payload: { operationName: null, query: getAllTypeDefs },
      })
      .then(({ payload }) => {
        const testData: OpenSourceModel[] = JSON.parse(payload).data.getOpenSources

        const firstData = testData[0]

        expect(testData.length).toBeGreaterThan(0)
        expect(firstData._id).toBe(id)
        expect(firstData.title).toBe(createdData.title)
        expect(firstData.description).toBe(createdData.description)
        expect(firstData.url).toBe(createdData.url)
        expect(firstData.posterUrl).toBe(createdData.posterUrl)
      })
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

    return app
      .inject({
        method: 'POST',
        url: '/graphql',
        payload: { operationName: null, query: getOneByIdTypeDefs },
      })
      .then(({ payload }) => {
        const testData: OpenSourceModel = JSON.parse(payload).data.getOpenSourceById

        expect(testData._id).toBe(id)
        expect(testData.title).toBe(createdData.title)
        expect(testData.description).toBe(createdData.description)
        expect(testData.url).toBe(createdData.url)
        expect(testData.posterUrl).toBe(createdData.posterUrl)
      })
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

    return app
      .inject({
        method: 'POST',
        url: '/graphql',
        payload: { operationName: null, query: updateOneByIdTypeDefs },
      })
      .then(({ payload }) => {
        const testData: OpenSourceModel = JSON.parse(payload).data.updateOpenSourceById

        expect(testData.title).toBe(updatedData.title)
        expect(testData.description).toBe(updatedData.description)
        expect(testData.url).toBe(updatedData.url)
        expect(testData.posterUrl).toBe(updatedData.posterUrl)
      })
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

    return app
      .inject({
        method: 'POST',
        url: '/graphql',
        payload: { operationName: null, query: deleteOneByIdTypeDefs },
      })
      .then(({ payload }) => {
        const testData: OpenSourceModel = JSON.parse(payload).data.deleteOpenSourceById

        expect(testData.title).toBe(updatedData.title)
        expect(testData.description).toBe(updatedData.description)
        expect(testData.url).toBe(updatedData.url)
        expect(testData.posterUrl).toBe(updatedData.posterUrl)
      })
  })

  // BATCH_DELETE
  it('deleteOpenSources', () => {
    const batchDeleteTypeDefs = `
    mutation DeleteOpenSources {
      deleteOpenSources(ids: ["${id}"]) {
        ok
        n
        deletedCount
      }
    }`

    return app
      .inject({
        method: 'POST',
        url: '/graphql',
        payload: { operationName: null, query: batchDeleteTypeDefs },
      })
      .then(({ payload }) => {
        const testData: BatchDelete = JSON.parse(payload).data.deleteOpenSources

        expect(testData.ok).toBe(1)
        expect(testData.n).toBe(0)
        expect(testData.deletedCount).toBe(0)
      })
  })
})
