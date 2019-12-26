import { NestApplication } from '@nestjs/core'
import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'
import { GraphQLModule } from '@nestjs/graphql'
import request from 'supertest'
import { SCHEMA_GQL_FILE_NAME } from '../src/shared/constants'
import { ConfigModule } from '../src/config/config.module'
import { ConfigService } from '../src/config/config.service'
import { YanceyMusicModule } from '../src/yancey-music/yancey-music.module'
import { YanceyMusicModel } from '../src/yancey-music/models/yancey-music.model'
import { CreateYanceyMusicInput } from '../src/yancey-music/dtos/create-yancey-music.input'
import { UpdateYanceyMusicInput } from '../src/yancey-music/dtos/update-yancey-music.input'
import { BatchDelete } from '../src/database/interfaces/batchDelete.interface'

describe('YanceyMusicController (e2e)', () => {
  let app: NestApplication
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        YanceyMusicModule,
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

  const createdData: CreateYanceyMusicInput = {
    title: 'test4',
    releaseDate: '2019-12-26T07:14:07.655Z',
    soundCloudUrl: 'https://t4est3.com',
    posterUrl: 'https://1test4.com',
  }

  let id = ''

  const updatedData: UpdateYanceyMusicInput = {
    id,
    title: 'test5',
    releaseDate: '2019-12-26T07:14:07.655Z',
    soundCloudUrl: 'https://yancey.com',
    posterUrl: 'https://yancey.com',
  }

  const createDataString = JSON.stringify(createdData).replace(/"([^(")"]+)":/g, '$1:')

  // CREATE_ONE
  it('createYanceyMusic', () => {
    const createOneTypeDefs = `
    mutation CreateYanceyMusic {
      createYanceyMusic(input: ${createDataString}) {
        _id
        title
        releaseDate
        soundCloudUrl
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
        const testData: YanceyMusicModel = body.data.createYanceyMusic

        id = testData._id

        expect(testData.title).toBe(createdData.title)
        expect(testData.soundCloudUrl).toBe(createdData.soundCloudUrl)
        expect(testData.posterUrl).toBe(createdData.posterUrl)
      })
      .expect(200)
  })

  // READ_ALL
  it('getYanceyMusic', () => {
    const getAllTypeDefs = `
    query GetYanceyMusic {
      getYanceyMusic {
        _id
        title
        releaseDate
        soundCloudUrl
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
        const testData: YanceyMusicModel[] = body.data.getYanceyMusic

        const firstData = testData[0]

        expect(testData.length).toBeGreaterThan(0)
        expect(firstData._id).toBe(id)
        expect(firstData.title).toBe(createdData.title)
        expect(firstData.soundCloudUrl).toBe(createdData.soundCloudUrl)
        expect(firstData.posterUrl).toBe(createdData.posterUrl)
      })
      .expect(200)
  })

  // READ_ONE
  it('getYanceyMusicById', () => {
    const getOneByIdTypeDefs = `
    query GetYanceyMusicById {
      getYanceyMusicById(id: "${id}") {
        _id
        title
        releaseDate
        soundCloudUrl
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
        const testData: YanceyMusicModel = body.data.getYanceyMusicById

        expect(testData._id).toBe(id)
        expect(testData.title).toBe(createdData.title)
        expect(testData.soundCloudUrl).toBe(createdData.soundCloudUrl)
        expect(testData.posterUrl).toBe(createdData.posterUrl)
      })
      .expect(200)
  })

  // UPDATE_ONE
  it('updateYanceyMusicById', () => {
    const updateDataString = JSON.stringify({ ...updatedData, id }).replace(/"([^(")"]+)":/g, '$1:')

    const updateOneByIdTypeDefs = `
    mutation UpdateYanceyMusicById {
      updateYanceyMusicById(input: ${updateDataString}) {
        _id
        title
        releaseDate
        soundCloudUrl
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
        const testData: YanceyMusicModel = body.data.updateYanceyMusicById
        expect(testData.title).toBe(updatedData.title)
        expect(testData.soundCloudUrl).toBe(updatedData.soundCloudUrl)
        expect(testData.posterUrl).toBe(updatedData.posterUrl)
      })
      .expect(200)
  })

  // DELETE_ONE
  it('deleteYanceyMusicById', () => {
    const deleteOneByIdTypeDefs = `
    mutation DeleteYanceyMusicById {
      deleteYanceyMusicById(id: "${id}") {
        _id
        title
        releaseDate
        soundCloudUrl
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
        const testData: YanceyMusicModel = body.data.deleteYanceyMusicById

        expect(testData.title).toBe(updatedData.title)
        expect(testData.soundCloudUrl).toBe(updatedData.soundCloudUrl)
        expect(testData.posterUrl).toBe(updatedData.posterUrl)
      })
      .expect(200)
  })

  // BATCH_DELETE
  it('deleteYanceyMusic', () => {
    const batchDeleteTypeDefs = `
    mutation DeleteYanceyMusic {
      deleteYanceyMusic(ids: ["${id}"]) {
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
        const testData: BatchDelete = body.data.deleteYanceyMusic
        expect(testData.ok).toBe(1)
        expect(testData.n).toBe(0)
        expect(testData.deletedCount).toBe(0)
      })
      .expect(200)
  })
})
