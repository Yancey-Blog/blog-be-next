import { NestApplication } from '@nestjs/core'
import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'
import { GraphQLModule } from '@nestjs/graphql'
import request from 'supertest'
import { SCHEMA_GQL_FILE_NAME } from '../src/shared/constants'
import { ConfigModule } from '../src/config/config.module'
import { ConfigService } from '../src/config/config.service'
import { AgendaModule } from '../src/agenda/agenda.module'
import { AgendaModel } from '../src/agenda/models/agenda.model'
import { CreateAgendaInput } from '../src/agenda/dtos/create-agenda.input'
import { UpdateAgendaInput } from '../src/agenda/dtos/update-agenda.input'
import { BatchUpdateModel } from '../src/database/models/batch-update.model'

describe('AgendaController (e2e)', () => {
  let app: NestApplication
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        AgendaModule,
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

  const createdData: CreateAgendaInput = {
    title: 'metting',
    startDate: new Date().toJSON(),
  }

  let id = ''

  const updatedData: UpdateAgendaInput = {
    id,
    title: 'exercise',
    startDate: new Date().toJSON(),
  }

  const createDataString = JSON.stringify(createdData).replace(/"([^(")"]+)":/g, '$1:')

  // CREATE_ONE
  it('createAgenda', () => {
    const createOneTypeDefs = `
    mutation CreateAgenda {
      createAgenda(input: ${createDataString}) {
        _id
        title
        startDate
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: createOneTypeDefs,
      })
      .expect(({ body }) => {
        const testData: AgendaModel = body.data.createAgenda

        id = testData._id

        expect(testData.title).toBe(createdData.title)
      })
      .expect(200)
  })

  // READ_ALL
  it('getAgenda', () => {
    const getAllTypeDefs = `
    query GetAgenda {
      getAgenda {
        _id
        title
        startDate
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: getAllTypeDefs,
      })
      .expect(({ body }) => {
        const testData: AgendaModel[] = body.data.getAgenda

        const firstData = testData[0]

        expect(testData.length).toBeGreaterThan(0)
        expect(firstData._id).toBe(id)
        expect(firstData.title).toBe(createdData.title)
      })
      .expect(200)
  })

  // UPDATE_ONE
  it('updateAgendaById', () => {
    const updateDataString = JSON.stringify({ ...updatedData, id }).replace(/"([^(")"]+)":/g, '$1:')

    const updateOneByIdTypeDefs = `
    mutation UpdateAgendaById {
      updateAgendaById(input: ${updateDataString}) {
        _id
        title
        startDate
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: updateOneByIdTypeDefs,
      })
      .expect(({ body }) => {
        const testData: AgendaModel = body.data.updateAgendaById

        expect(testData.title).toBe(updatedData.title)
      })
      .expect(200)
  })

  // DELETE_ONE
  it('deleteAgendaById', () => {
    const deleteOneByIdTypeDefs = `
    mutation DeleteAgendaById {
      deleteAgendaById(id: "${id}") {
        _id
        title
        startDate
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: deleteOneByIdTypeDefs,
      })
      .expect(({ body }) => {
        const testData: AgendaModel = body.data.deleteAgendaById

        expect(testData.title).toBe(updatedData.title)
      })
      .expect(200)
  })
})
