import {
  Body,
  Res,
  Param,
  Get,
  Post,
  Put,
  Delete,
  Controller,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import { Response } from 'express'
import { AuthGuard } from '@nestjs/passport'
import path from 'path'
import fs from 'fs-extra'
import { MottosService } from './mottos.service'
import { CreateMottoDto } from './dtos/createMotto.dto'
import { Motto } from './interfaces/motto.interface'
import { RECOVERY_CODES_PATH } from '../shared/constants'

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
  public deleteMottos(@Body('ids') ids: string[]) {
    return this.mottosService.batchDelete(ids)
  }

  @Get('generateFile/:id')
  public downloadFile(@Res() res: Response) {
    this.mottosService.generateFile()

    const filePath = path.join(process.cwd(), RECOVERY_CODES_PATH)
    res.download(filePath)
    fs.remove(filePath)
  }
}
