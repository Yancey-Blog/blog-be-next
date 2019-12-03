import { NestApplication } from '@nestjs/core'
import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'
import { GraphQLModule } from '@nestjs/graphql'
import request from 'supertest'
import { OpenSourcesModule } from '../src/open-sources/open-sources.module'
import { CreateOpenSourceInput } from '../src/open-sources/dtos/create-open-source.input'
import { UpdateOpenSourceInput } from '../src/open-sources/dtos/update-open-source.input'

let id = ''

const data: CreateOpenSourceInput = {
  title: 'blog-be-next',
  description: 'the backend for my blog',
  url: 'https://yaneyleo.com',
  posterUrl: 'https://yaneyleo.com',
}

const updatedData: UpdateOpenSourceInput = {
  id,
  title: 'blog-cms-v2',
  description: 'the cms for my blog',
  url: 'https://yaneyleo.com',
  posterUrl: 'https://yaneyleo.com',
}

const createDataObject = JSON.stringify(data).replace(/\"([^(\")"]+)\":/g, '$1:')

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

describe('ItemsController (e2e)', () => {
  let app: NestApplication
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        OpenSourcesModule,
        MongooseModule.forRoot('mongodb://localhost:27017/blog'),
        GraphQLModule.forRoot({
          autoSchemaFile: 'schema.gql',
        }),
      ],
    }).compile()
    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('createOpenSource', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: createDataMutation,
      })
      .expect(({ body }) => {
        const testingData = body.data.createOpenSource

        const { _id, title, description } = testingData
        id = _id

        expect(title).toBe(data.title)
        expect(description).toBe(data.description)
      })
      .expect(200)
  })

  afterAll(async () => {
    await app.close()
  })
})
