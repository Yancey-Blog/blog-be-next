import { Body, Param, Get, Post, Put, Delete, Controller } from '@nestjs/common'
import { MottosService } from './mottos.service'
import { CreateMottoDto } from './dtos/create-motto.dto'
import { IMotto } from './interfaces/motto.interface'

@Controller('mottos')
export class MottosResolver {
  constructor(private readonly mottosService: MottosService) {
    this.mottosService = mottosService
  }

  @Get()
  public getAllMottos(): Promise<IMotto[]> {
    return this.mottosService.findAll()
  }

  @Get(':id')
  public getMottoById(@Param('id') id: string): Promise<IMotto> {
    return this.mottosService.findOneById(id)
  }

  @Post()
  public createMotto(@Body() createMottoDto: CreateMottoDto): Promise<IMotto> {
    return this.mottosService.create(createMottoDto)
  }

  @Put(':id')
  public updateMotto(
    @Param('id') id: string,
    @Body() updateMottoDto: CreateMottoDto,
  ): Promise<IMotto> {
    return this.mottosService.update(id, updateMottoDto)
  }

  @Delete(':id')
  public deleteMottoById(@Param('id') id: string): Promise<IMotto> {
    return this.mottosService.deleteOneById(id)
  }

  @Delete()
  public deleteMottos(@Body('ids') ids: string[]): Promise<any> {
    return this.mottosService.batchDelete(ids)
  }
}
