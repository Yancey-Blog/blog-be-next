import { Injectable } from '@nestjs/common'
import { ServerInfoModel } from './models/server-info.model'

@Injectable()
export class BandwagonService {
  public async getServiceInfo(): Promise<ServerInfoModel[]> {
    return {} as ServerInfoModel[]
  }

  public async getUsageStats(): Promise<ServerInfoModel[]> {
    return {} as ServerInfoModel[]
  }
}
