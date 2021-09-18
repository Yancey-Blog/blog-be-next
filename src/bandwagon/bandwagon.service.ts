import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { BandwagonParams } from './interfaces/bandwagon-params.interface'
import { ServiceInfo } from './interfaces/service-info.interface'
import { UsageStats } from './interfaces/usage-stats.interface'
import { ConfigService } from '../config/config.service'
import { BANDWAGON_SERVICE_INFO_URL, BANDWAGON_USAGE_STATS_URL } from '../shared/constants'

@Injectable()
export class BandwagonService {
  private readonly params: BandwagonParams

  constructor(private readonly httpService: HttpService, configService: ConfigService) {
    this.httpService = httpService
    const { BANDWAGON_SECRET_KEY, BANDWAGON_SERVER_ID } = configService.getBandwagonKeys()
    this.params = { veid: BANDWAGON_SERVER_ID, api_key: BANDWAGON_SECRET_KEY }
  }

  public getServiceInfo(): Observable<ServiceInfo> {
    return this.httpService
      .get(BANDWAGON_SERVICE_INFO_URL, {
        params: this.params,
      })
      .pipe(map((response) => response.data))
  }

  public getUsageStats(): Observable<UsageStats> {
    return this.httpService
      .get(BANDWAGON_USAGE_STATS_URL, { params: this.params })
      .pipe(map((response) => response.data.data))
  }
}
