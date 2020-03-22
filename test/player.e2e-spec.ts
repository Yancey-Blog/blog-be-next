import { NestApplication } from '@nestjs/core'
import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'
import { GraphQLModule } from '@nestjs/graphql'
import request from 'supertest'
import { SCHEMA_GQL_FILE_NAME } from '../src/shared/constants'
import { ConfigModule } from '../src/config/config.module'
import { ConfigService } from '../src/config/config.service'
import { PlayerModule } from '../src/player/player.module'
import { PlayerModel } from '../src/player/models/player.model'
import { CreatePlayerInput } from '../src/player/dtos/create-player.input'
import { UpdatePlayerInput } from '../src/player/dtos/update-player.input'
import { BatchUpdateModel } from '../src/database/models/batch-update.model'
import { BatchDeleteModel } from '../src/database/models/batch-delete.model'

describe('PlayerController (e2e)', () => {
  let app: NestApplication
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        PlayerModule,
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

  const createdData: CreatePlayerInput = {
    title: 'イチリンソウ',
    artist: '山本彩',
    lrc: '歌词',
    coverUrl: 'https://t4est3.com',
    musicFileUrl: 'https://1test4.com',
    isPublic: true,
  }

  let id = ''

  const updatedData: UpdatePlayerInput = {
    id,
    title: '夕焼けの歌',
    artist: '近藤真彦',
    lrc: '歌词',
    coverUrl: 'https://t5est4.com',
    musicFileUrl: 'https://2test5.com',
    isPublic: true,
  }

  const createDataString = JSON.stringify(createdData).replace(/"([^(")"]+)":/g, '$1:')

  // CREATE_ONE
  it('createPlayer', () => {
    const createOneTypeDefs = `
    mutation CreatePlayer {
      createPlayer(input: ${createDataString}) {
        _id
        title
        artist
        lrc
        coverUrl
        musicFileUrl
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
        const testData: PlayerModel = body.data.createPlayer

        id = testData._id

        expect(testData.title).toBe(createdData.title)
        expect(testData.artist).toBe(createdData.artist)
        expect(testData.lrc).toBe(createdData.lrc)
        expect(testData.coverUrl).toBe(createdData.coverUrl)
        expect(testData.musicFileUrl).toBe(createdData.musicFileUrl)
      })
      .expect(200)
  })

  // READ_ALL
  it('getPlayers', () => {
    const getAllTypeDefs = `
    query GetPlayers {
      getPlayers {
        _id
        title
        artist
        lrc
        coverUrl
        musicFileUrl
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
        const testData: PlayerModel[] = body.data.getPlayers

        const firstData = testData[0]

        expect(testData.length).toBeGreaterThan(0)
        expect(firstData._id).toBe(id)
        expect(firstData.title).toBe(createdData.title)
        expect(firstData.artist).toBe(createdData.artist)
        expect(firstData.lrc).toBe(createdData.lrc)
        expect(firstData.coverUrl).toBe(createdData.coverUrl)
        expect(firstData.musicFileUrl).toBe(createdData.musicFileUrl)
      })
      .expect(200)
  })

  // READ_ONE
  it('getPlayerById', () => {
    const getOneByIdTypeDefs = `
    query GetPlayerById {
      getPlayerById(id: "${id}") {
        _id
        title
        artist
        lrc
        coverUrl
        musicFileUrl
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
        const testData: PlayerModel = body.data.getPlayerById

        expect(testData._id).toBe(id)
        expect(testData.title).toBe(createdData.title)
        expect(testData.artist).toBe(createdData.artist)
        expect(testData.lrc).toBe(createdData.lrc)
        expect(testData.coverUrl).toBe(createdData.coverUrl)
        expect(testData.musicFileUrl).toBe(createdData.musicFileUrl)
      })
      .expect(200)
  })

  // UPDATE_ONE
  it('updatePlayerById', () => {
    const updateDataString = JSON.stringify({ ...updatedData, id }).replace(/"([^(")"]+)":/g, '$1:')

    const updateOneByIdTypeDefs = `
    mutation UpdatePlayerById {
      updatePlayerById(input: ${updateDataString}) {
        _id
        title
        artist
        lrc
        coverUrl
        musicFileUrl
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
        const testData: PlayerModel = body.data.updatePlayerById

        expect(testData.title).toBe(updatedData.title)
        expect(testData.artist).toBe(updatedData.artist)
        expect(testData.lrc).toBe(updatedData.lrc)
        expect(testData.coverUrl).toBe(updatedData.coverUrl)
        expect(testData.musicFileUrl).toBe(updatedData.musicFileUrl)
      })
      .expect(200)
  })

  // OFFLINE
  it('offlinePlayers', () => {
    const offlinePlayersTypeDefs = `
    mutation OfflinePlayers {
      offlinePlayers(ids: ["${id}"]) {
        n
        nModified
        ok
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: offlinePlayersTypeDefs,
      })
      .expect(({ body }) => {
        const testData: BatchUpdateModel = body.data.offlinePlayers

        expect(testData.ok).toBe(1)
        expect(testData.n).toBe(1)
        expect(testData.nModified).toBe(1)
      })
      .expect(200)
  })

  // DELETE_ONE
  it('deletePlayerById', () => {
    const deleteOneByIdTypeDefs = `
    mutation DeletePlayerById {
      deletePlayerById(id: "${id}") {
        _id
        title
        artist
        lrc
        coverUrl
        musicFileUrl
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
        const testData: PlayerModel = body.data.deletePlayerById

        expect(testData.title).toBe(updatedData.title)
        expect(testData.artist).toBe(updatedData.artist)
        expect(testData.lrc).toBe(updatedData.lrc)
        expect(testData.coverUrl).toBe(updatedData.coverUrl)
        expect(testData.musicFileUrl).toBe(updatedData.musicFileUrl)
      })
      .expect(200)
  })

  // BATCH_DELETE
  it('deletePlayers', () => {
    const batchDeleteTypeDefs = `
    mutation DeletePlayers {
      deletePlayers(ids: ["${id}"]) {
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
        const testData: BatchDeleteModel = body.data.deletePlayers
        expect(testData.ok).toBe(1)
        expect(testData.n).toBe(0)
        expect(testData.deletedCount).toBe(0)
      })
      .expect(200)
  })
})
