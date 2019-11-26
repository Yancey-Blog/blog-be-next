import {
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
  Controller,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { MottosService } from './mottos.service'
import { CreateMottoDto } from './dtos/create-motto.dto'
import { IMotto } from './interfaces/motto.interface'

@Controller('mottos')
export class MottosResolver {
  constructor(private readonly mottosService: MottosService) {
    this.mottosService = mottosService
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  public getAllMottos(): Promise<IMotto[]> {
    return this.mottosService.findAll()
  }

  @Get(':id')
  public getMottoById(@Param('id') id: string): Promise<IMotto> {
    return this.mottosService.findOneById(id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  public createMotto(@Body() createMottoDto: CreateMottoDto): Promise<IMotto> {
    return this.mottosService.create(createMottoDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  public updateMotto(
    @Param('id') id: string,
    @Body() updateMottoDto: CreateMottoDto,
  ): Promise<IMotto> {
    return this.mottosService.update(id, updateMottoDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  public deleteMottoById(@Param('id') id: string): Promise<IMotto> {
    return this.mottosService.deleteOneById(id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  public deleteMottos(@Body('ids') ids: string[]): Promise<any> {
    return this.mottosService.batchDelete(ids)
  }
}
