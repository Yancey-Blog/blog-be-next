import { Test, TestingModule } from '@nestjs/testing'
import { OpenSourcesService } from '../../src/open-sources/open-sources.service'

describe('OpenSourcesService', () => {
  let service: OpenSourcesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenSourcesService],
    }).compile()

    service = module.get<OpenSourcesService>(OpenSourcesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
