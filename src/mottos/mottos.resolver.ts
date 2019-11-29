import {
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
  Controller,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { MottosService } from './mottos.service'
import { CreateMottoDto } from './dtos/createMotto.dto'
import { Motto } from './interfaces/motto.interface'

@Controller('mottos')
export class MottosResolver {
  constructor(private readonly mottosService: MottosService) {
    this.mottosService = mottosService
  }

  @Get()
  public getAllMottos(): Promise<Motto[]> {
    return this.mottosService.findAll()
  }

  @Get(':id')
  public getMottoById(@Param('id') id: string): Promise<Motto> {
    return this.mottosService.findOneById(id)
  }

  @UseGuards(AuthGuard())
  @Post()
  public createMotto(@Body(new ValidationPipe()) createMottoDto: CreateMottoDto): Promise<Motto> {
    return this.mottosService.create(createMottoDto)
  }

  @UseGuards(AuthGuard())
  @Put(':id')
  public updateMotto(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateMottoDto: CreateMottoDto,
  ): Promise<Motto> {
    return this.mottosService.update(id, updateMottoDto)
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  public deleteMottoById(@Param('id') id: string): Promise<Motto> {
    return this.mottosService.deleteOneById(id)
  }

  @UseGuards(AuthGuard())
  @Delete()
  public deleteMottos(@Body('ids') ids: string[]): Promise<any> {
    return this.mottosService.batchDelete(ids)
  }
}
