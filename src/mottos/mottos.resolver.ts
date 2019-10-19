import { Observable } from 'rxjs'
import { Body, Post, Controller } from '@nestjs/common'
import { MottosService } from './mottos.service'

@Controller('motto')
export class MottosResolver {
  constructor(private readonly mottosService: MottosService) {
    this.mottosService = mottosService
  }

  @Post()
  public createMotto(@Body('motto') motto: string): Observable<any> {
    return this.mottosService.create(motto)
  }
}
