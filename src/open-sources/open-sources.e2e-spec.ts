import { NestApplication } from '@nestjs/core'
import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'
import { GraphQLModule } from '@nestjs/graphql'
import request from 'supertest'
import { OpenSourcesModule } from './open-sources.module'
import { CreateOpenSourceInput } from './dtos/create-open-source.input'
import { UpdateOpenSourceInput } from './dtos/update-open-source.input'

let id = ''

const data: CreateOpenSourceInput = {
  title: 'blog-be-next',
  description: 'the backend for my blog',
  url: 'https://yaneyleo.com',
  posterUrl: 'https://yaneyleo.com',
}

// eslint-disable-next-line
const updatedData: UpdateOpenSourceInput = {
  id,
  title: 'blog-cms-v2',
  description: 'the cms for my blog',
  url: 'https://yaneyleo.com',
  posterUrl: 'https://yaneyleo.com',
}

const createDataObject = JSON.stringify(data).replace(/"([^(")"]+)":/g, '$1:')

const createDataMutation = `
  mutation {
    createOpenSource(input: ${createDataObject}) {
      _id
      title
      description
      url
      posterUrl
      createdAt
      updatedAt
    }
  }`

describe('OpenSourcesController (e2e)', () => {
  let app: NestApplication
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        OpenSourcesModule,
        MongooseModule.forRoot('mongodb://localhost:27017/blog_test'),
        GraphQLModule.forRoot({
          autoSchemaFile: 'schema.gql',
        }),
      ],
    }).compile()
    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('createOpenSource', () =>
    request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: createDataMutation,
      })
      .expect(({ body }) => {
        const testData = body.data.createOpenSource

        id = testData._id

        expect(testData.title).toBe(data.title)
        expect(testData.description).toBe(data.description)
      })
      .expect(200))

  it('getOpenSources', () =>
    request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: '{getOpenSources{_id, title, description, url, posterUrl}}',
      })
      .expect(({ body }) => {
        const testData = body.data.getOpenSources

        const firstData = testData[0]

        expect(testData.length).toBeGreaterThan(0)
        expect(firstData.title).toBe(data.title)
        expect(firstData.description).toBe(data.description)
        expect(firstData.url).toBe(data.url)
      })
      .expect(200))

  afterAll(async () => {
    await app.close()
  })
})
