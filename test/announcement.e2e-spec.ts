import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify'
import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'
import { GraphQLModule } from '@nestjs/graphql'
import { SCHEMA_GQL_FILE_NAME } from '../src/shared/constants'
import { ConfigModule } from '../src/config/config.module'
import { ConfigService } from '../src/config/config.service'
import { AnnouncementsModule } from '../src/announcements/announcements.module'
import { AnnouncementsModel } from '../src/announcements/models/announcements.model'
import { CreateAnnouncementInput } from '../src/announcements/dtos/create-announcement.input'
import { UpdateAnnouncementInput } from '../src/announcements/dtos/update-announcement.input'
import { BatchDelete } from '../src/database/interfaces/batchDelete.interface'

describe('AnnouncementsController (e2e)', () => {
  let app: NestFastifyApplication
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        AnnouncementsModule,
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

  const createdData: CreateAnnouncementInput = {
    content: 'blog-be-next',
  }

  let id = ''

  const updatedData: UpdateAnnouncementInput = {
    id,
    content: 'blog-be-cms',
  }

  const createDataString = JSON.stringify(createdData).replace(/"([^(")"]+)":/g, '$1:')

  // CREATE_ONE
  it('createAnnouncement', async () => {
    const createOneTypeDefs = `
    mutation CreateAnnouncement {
      createAnnouncement(input: ${createDataString}) {
        _id
        content
      }
    }`

    const { payload } = await app.inject({
      method: 'POST',
      url: '/graphql',
      payload: { operationName: null, query: createOneTypeDefs },
    })
    const testData: AnnouncementsModel = JSON.parse(payload).data.createAnnouncement
    id = testData._id
    expect(testData.content).toBe(createdData.content)
  })

  // READ_ALL
  it('getAnnouncements', async () => {
    const getAllTypeDefs = `
    query GetAnnouncements {
      getAnnouncements {
        _id
        content
      }
    }`

    const { payload } = await app.inject({
      method: 'POST',
      url: '/graphql',
      payload: { operationName: null, query: getAllTypeDefs },
    })
    const testData: AnnouncementsModel[] = JSON.parse(payload).data.getAnnouncements
    const firstData = testData[0]
    expect(testData.length).toBeGreaterThan(0)
    expect(firstData._id).toBe(id)
    expect(firstData.content).toBe(createdData.content)
  })

  // READ_ONE
  it('getAnnouncementById', async () => {
    const getOneByIdTypeDefs = `
    query GetAnnouncementById {
      getAnnouncementById(id: "${id}") {
        _id
        content
      }
    }`

    const { payload } = await app.inject({
      method: 'POST',
      url: '/graphql',
      payload: { operationName: null, query: getOneByIdTypeDefs },
    })
    const testData: AnnouncementsModel = JSON.parse(payload).data.getAnnouncementById
    expect(testData._id).toBe(id)
    expect(testData.content).toBe(createdData.content)
  })

  // UPDATE_ONE
  it('updateAnnouncementById', async () => {
    const updateDataString = JSON.stringify({ ...updatedData, id }).replace(/"([^(")"]+)":/g, '$1:')

    const updateOneByIdTypeDefs = `
    mutation UpdateAnnouncementById {
      updateAnnouncementById(input: ${updateDataString}) {
        _id
        content
      }
    }`

    const { payload } = await app.inject({
      method: 'POST',
      url: '/graphql',
      payload: { operationName: null, query: updateOneByIdTypeDefs },
    })
    const testData: AnnouncementsModel = JSON.parse(payload).data.updateAnnouncementById

    console.log('updateDataString' + updateDataString)
    console.log(testData)

    expect(testData.content).toBe(updatedData.content)
  })

  // DELETE_ONE
  it('deleteAnnouncementById', async () => {
    const deleteOneByIdTypeDefs = `
    mutation DeleteAnnouncementById {
      deleteAnnouncementById(id: "${id}") {
        _id
        content
      }
    }`

    const { payload } = await app.inject({
      method: 'POST',
      url: '/graphql',
      payload: { operationName: null, query: deleteOneByIdTypeDefs },
    })
    const testData: AnnouncementsModel = JSON.parse(payload).data.deleteAnnouncementById
    expect(testData.content).toBe(updatedData.content)
  })

  // BATCH_DELETE
  it('deleteAnnouncements', async () => {
    const batchDeleteTypeDefs = `
    mutation DeleteAnnouncements {
      deleteAnnouncements(ids: ["${id}"]) {
        ok
        n
        deletedCount
      }
    }`

    const { payload } = await app.inject({
      method: 'POST',
      url: '/graphql',
      payload: { operationName: null, query: batchDeleteTypeDefs },
    })
    const testData: BatchDelete = JSON.parse(payload).data.deleteAnnouncements
    expect(testData.ok).toBe(1)
    expect(testData.n).toBe(0)
    expect(testData.deletedCount).toBe(0)
  })
})
