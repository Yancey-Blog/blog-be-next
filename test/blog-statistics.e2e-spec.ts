import { NestApplication } from '@nestjs/core'
import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'
import { GraphQLModule } from '@nestjs/graphql'
import request from 'supertest'
import { SCHEMA_GQL_FILE_NAME } from '../src/shared/constants'
import { ConfigModule } from '../src/config/config.module'
import { ConfigService } from '../src/config/config.service'
import { PostStatisticsModule } from '../src/post-statistics/post-statistics.module'
import { PostStatisticsModel } from '../src/post-statistics/models/post-statistics.model'
import { PostStatisticsGroupModel } from '../src/post-statistics/models/post-statistics-group.model'
import { CreatePostStatisticsInput } from '../src/post-statistics/dtos/create-post-statistics.input'

describe('PostStatisticsController (e2e)', () => {
  let app: NestApplication
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        PostStatisticsModule,
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

  const createdData: CreatePostStatisticsInput = {
    postId: '36f27dc5-9adc-4ded-918f-d1bf9dc1ad4a',
    postName: 'postName',
    scenes: 'switched to public',
  }

  let id = ''

  const createDataString = JSON.stringify(createdData).replace(/"([^(")"]+)":/g, '$1:')

  // CREATE_ONE
  it('createPostStatistics', async () => {
    const createOneTypeDefs = `
    mutation CreatePostStatistics {
      createPostStatistics(input: ${createDataString}) {
        _id
        postId
        postName
        scenes
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: createOneTypeDefs,
      })
      .expect(({ body }) => {
        const testData: PostStatisticsModel = body.data.createPostStatistics
        id = testData._id
        expect(testData.postId).toBe(createdData.postId)
        expect(testData.postName).toBe(createdData.postName)
        expect(testData.scenes).toBe(createdData.scenes)
      })
      .expect(200)
  })

  // READ_ALL
  it('getPostStatistics', async () => {
    const getAllTypeDefs = `
    query GetPostStatistics {
      getPostStatistics {
        _id
        count
        items {
          postId
          postName
          scenes
          operatedAt
        }
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: getAllTypeDefs,
      })
      .expect(({ body }) => {
        const testData: PostStatisticsGroupModel[] = body.data.getPostStatistics

        const firstData = testData[0]

        expect(testData.length).toBeGreaterThan(0)
        expect(firstData.count).toBeGreaterThan(0)
      })
      .expect(200)
  })
})
