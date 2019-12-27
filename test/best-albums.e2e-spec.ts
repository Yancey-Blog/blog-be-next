import { NestApplication } from '@nestjs/core'
import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'
import { GraphQLModule } from '@nestjs/graphql'
import request from 'supertest'
import { SCHEMA_GQL_FILE_NAME } from '../src/shared/constants'
import { ConfigModule } from '../src/config/config.module'
import { ConfigService } from '../src/config/config.service'
import { BestAlbumsModule } from '../src/best-albums/best-albums.module'
import { BestAlbumModel } from '../src/best-albums/models/best-albums.model'
import { CreateBestAlbumInput } from '../src/best-albums/dtos/create-best-album.input'
import { UpdateBestAlbumInput } from '../src/best-albums/dtos/update-best-album.input'
import { BatchDelete } from '../src/database/interfaces/batchDelete.interface'

describe('BestAlbumsController (e2e)', () => {
  let app: NestApplication
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        BestAlbumsModule,
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

  const createdData: CreateBestAlbumInput = {
    title: 'α',
    artist: '山本彩',
    coverUrl: 'https://t4est3.com',
    mvUrl: 'https://1test4.com',
    releaseDate: '2019-12-26T07:14:07.655Z',
  }

  let id = ''

  const updatedData: UpdateBestAlbumInput = {
    id,
    title: '追憶の光',
    artist: '山本彩',
    coverUrl: 'https://t4est3.com',
    mvUrl: 'https://1test4.com',
    releaseDate: '2019-12-26T07:14:07.655Z',
  }

  const createDataString = JSON.stringify(createdData).replace(/"([^(")"]+)":/g, '$1:')

  // CREATE_ONE
  it('createBestAlbum', () => {
    const createOneTypeDefs = `
    mutation CreateBestAlbum {
      createBestAlbum(input: ${createDataString}) {
        _id
        title
        artist
        coverUrl
        mvUrl
        releaseDate
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
        const testData: BestAlbumModel = body.data.createBestAlbum

        id = testData._id

        expect(testData.title).toBe(createdData.title)
        expect(testData.artist).toBe(createdData.artist)
        expect(testData.coverUrl).toBe(createdData.coverUrl)
        expect(testData.mvUrl).toBe(createdData.mvUrl)
      })
      .expect(200)
  })

  // READ_ALL
  it('getBestAlbums', () => {
    const getAllTypeDefs = `
    query GetBestAlbums {
      getBestAlbums {
        _id
        title
        artist
        coverUrl
        mvUrl
        releaseDate
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
        const testData: BestAlbumModel[] = body.data.getBestAlbums

        const firstData = testData[0]

        expect(testData.length).toBeGreaterThan(0)
        expect(firstData._id).toBe(id)
        expect(firstData.title).toBe(createdData.title)
        expect(firstData.artist).toBe(createdData.artist)
        expect(firstData.coverUrl).toBe(createdData.coverUrl)
        expect(firstData.mvUrl).toBe(createdData.mvUrl)
      })
      .expect(200)
  })

  // READ_ONE
  it('getBestAlbumById', () => {
    const getOneByIdTypeDefs = `
    query GetBestAlbumById {
      getBestAlbumById(id: "${id}") {
        _id
        title
        artist
        coverUrl
        mvUrl
        releaseDate
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
        const testData: BestAlbumModel = body.data.getBestAlbumById

        expect(testData._id).toBe(id)
        expect(testData.title).toBe(createdData.title)
        expect(testData.artist).toBe(createdData.artist)
        expect(testData.coverUrl).toBe(createdData.coverUrl)
        expect(testData.mvUrl).toBe(createdData.mvUrl)
      })
      .expect(200)
  })

  // UPDATE_ONE
  it('updateBestAlbumById', () => {
    const updateDataString = JSON.stringify({ ...updatedData, id }).replace(/"([^(")"]+)":/g, '$1:')

    const updateOneByIdTypeDefs = `
    mutation UpdateBestAlbumById {
      updateBestAlbumById(input: ${updateDataString}) {
        _id
        title
        artist
        coverUrl
        mvUrl
        releaseDate
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
        const testData: BestAlbumModel = body.data.updateBestAlbumById
        expect(testData.title).toBe(updatedData.title)
        expect(testData.artist).toBe(updatedData.artist)
        expect(testData.coverUrl).toBe(updatedData.coverUrl)
        expect(testData.mvUrl).toBe(updatedData.mvUrl)
      })
      .expect(200)
  })

  // DELETE_ONE
  it('deleteBestAlbumById', () => {
    const deleteOneByIdTypeDefs = `
    mutation DeleteBestAlbumById {
      deleteBestAlbumById(id: "${id}") {
        _id
        title
        artist
        coverUrl
        mvUrl
        releaseDate
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
        const testData: BestAlbumModel = body.data.deleteBestAlbumById

        expect(testData.title).toBe(updatedData.title)
        expect(testData.title).toBe(updatedData.title)
        expect(testData.artist).toBe(updatedData.artist)
        expect(testData.coverUrl).toBe(updatedData.coverUrl)
        expect(testData.mvUrl).toBe(updatedData.mvUrl)
      })
      .expect(200)
  })

  // // BATCH_DELETE
  it('deleteBestAlbums', () => {
    const batchDeleteTypeDefs = `
    mutation DeleteBestAlbums {
      deleteBestAlbums(ids: ["${id}"]) {
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
        const testData: BatchDelete = body.data.deleteBestAlbums
        expect(testData.ok).toBe(1)
        expect(testData.n).toBe(0)
        expect(testData.deletedCount).toBe(0)
      })
      .expect(200)
  })
})
