import { NestApplication } from '@nestjs/core'
import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'
import { GraphQLModule } from '@nestjs/graphql'
import request from 'supertest'
import { SCHEMA_GQL_FILE_NAME } from '../src/shared/constants'
import { ConfigModule } from '../src/config/config.module'
import { ConfigService } from '../src/config/config.service'
import { AnnouncementsModule } from '../src/announcements/announcements.module'
import { AnnouncementModel } from '../src/announcements/models/announcements.model'
import { CreateAnnouncementInput } from '../src/announcements/dtos/create-announcement.input'
import { UpdateAnnouncementInput } from '../src/announcements/dtos/update-announcement.input'
import { BatchDeleteModel } from '../src/database/models/batch-delete.model'

describe('AnnouncementsController (e2e)', () => {
  let app: NestApplication
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

    app = moduleFixture.createNestApplication()
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

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: createOneTypeDefs,
      })
      .expect(({ body }) => {
        const testData: AnnouncementModel = body.data.createAnnouncement
        id = testData._id
        expect(testData.content).toBe(createdData.content)
      })
      .expect(200)
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

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: getAllTypeDefs,
      })
      .expect(({ body }) => {
        const testData: AnnouncementModel[] = body.data.getAnnouncements

        const firstData = testData[0]

        expect(testData.length).toBeGreaterThan(0)
        expect(firstData._id).toBe(id)
        expect(firstData.content).toBe(createdData.content)
      })
      .expect(200)
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

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: getOneByIdTypeDefs,
      })
      .expect(({ body }) => {
        const testData: AnnouncementModel = body.data.getAnnouncementById

        expect(testData._id).toBe(id)
        expect(testData.content).toBe(createdData.content)
      })
      .expect(200)
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

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: updateOneByIdTypeDefs,
      })
      .expect(({ body }) => {
        const testData: AnnouncementModel = body.data.updateAnnouncementById
        expect(testData.content).toBe(updatedData.content)
      })
      .expect(200)
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

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: deleteOneByIdTypeDefs,
      })
      .expect(({ body }) => {
        const testData: AnnouncementModel = body.data.deleteAnnouncementById

        expect(testData.content).toBe(updatedData.content)
      })
      .expect(200)
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

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: batchDeleteTypeDefs,
      })
      .expect(({ body }) => {
        const testData: BatchDeleteModel = body.data.deleteAnnouncements
        expect(testData.ok).toBe(1)
        expect(testData.n).toBe(0)
        expect(testData.deletedCount).toBe(0)
      })
      .expect(200)
  })
})
