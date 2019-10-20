import { Body, Get, Post, Controller } from '@nestjs/common'
import { MottosService } from './mottos.service'
import { CreateMottoDto } from './dtos/create-motto.dto'
import { IMotto } from './interfaces/motto.interface'

@Controller('motto')
export class MottosResolver {
  constructor(private readonly mottosService: MottosService) {
    this.mottosService = mottosService
  }

  @Get()
  public getAllMottos(): Promise<IMotto[]> {
    return this.mottosService.findAll()
  }

  @Post()
  public createMotto(@Body() createMottoDto: CreateMottoDto): Promise<IMotto> {
    return this.mottosService.create(createMottoDto)
  }
}
