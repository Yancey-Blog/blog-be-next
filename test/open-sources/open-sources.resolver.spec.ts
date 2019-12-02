import { Test, TestingModule } from '@nestjs/testing'
import { OpenSourcesResolver } from '../../src/open-sources/open-sources.resolver'

describe('OpenSourcesResolver', () => {
  let resolver: OpenSourcesResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenSourcesResolver],
    }).compile()

    resolver = module.get<OpenSourcesResolver>(OpenSourcesResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
