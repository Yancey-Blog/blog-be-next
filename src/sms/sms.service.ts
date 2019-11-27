import { Injectable } from '@nestjs/common'
import RPCClient from '@alicloud/pop-core'
import { ConfigService } from '../config/config.service'
import {
  ALI_SMS_END_POINT,
  ALI_SMS_API_VERSION,
  ALI_SMS_REGION,
} from '../shared/constants'

@Injectable()
export class SmsService {
  private readonly sms: RPCClient

  private readonly basicParams: any

  constructor(configService: ConfigService) {
    const {
      accessKeyId,
      accessKeySecret,
      signName,
      templateCode,
    } = configService.getAliSMSKeys()

    this.sms = new RPCClient({
      accessKeyId,
      accessKeySecret,
      endpoint: ALI_SMS_END_POINT,
      apiVersion: ALI_SMS_API_VERSION,
    })

    this.basicParams = {
      RegionId: ALI_SMS_REGION,
      SignName: signName,
      TemplateCode: templateCode,
    }
  }

  public sendMessage(phoneNumber: string) {
    const params = { ...this.basicParams, PhoneNumbers: phoneNumber }
    this.sms
      .request('SendSms', params, {
        method: 'POST',
      })
      .then(
        result => {
          console.log(JSON.stringify(result))
        },
        ex => {
          console.log(ex)
        },
      )
  }
}
