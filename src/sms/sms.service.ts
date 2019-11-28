import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import AliSMS from '@alicloud/pop-core'
import moment from 'moment'
import { ConfigService } from '../config/config.service'
import { SMSParams } from './interfaces/smsParams.interface'
import { SMS } from './interfaces/sms.interface'
import { ValidateSMSDto } from './dtos/validateSMS.dto'
import { generateSMSVerificationCode } from '../shared/utils'
import { ALI_SMS_END_POINT, ALI_SMS_API_VERSION, ALI_SMS_REGION } from '../shared/constants'

@Injectable()
export class SMSService {
  private readonly sms: AliSMS

  private readonly params: SMSParams

  constructor(
    @InjectModel('SMS')
    private readonly SMSModel: Model<SMS>,
    configService: ConfigService,
  ) {
    this.SMSModel = SMSModel

    const {
      ALI_SMS_ACCESS_KEY_ID,
      ALI_SMS_ACCESS_KEY_SECRET,
      ALI_SMS_SIGN_NAME,
      ALI_SMS_TEMPLATE_CODE,
    } = configService.getAliSMSKeys()

    this.sms = new AliSMS({
      accessKeyId: ALI_SMS_ACCESS_KEY_ID,
      accessKeySecret: ALI_SMS_ACCESS_KEY_SECRET,
      endpoint: ALI_SMS_END_POINT,
      apiVersion: ALI_SMS_API_VERSION,
    })

    this.params = {
      RegionId: ALI_SMS_REGION,
      SignName: ALI_SMS_SIGN_NAME,
      TemplateCode: ALI_SMS_TEMPLATE_CODE,
      PhoneNumbers: '',
      TemplateParam: '',
    }
  }

  private async saveSMSVerificationCode(phoneNumber: string, verificationCode: string) {
    await this.SMSModel.findOneAndUpdate(
      { phoneNumber },
      { verificationCode },
      {
        new: true,
        upsert: true,
      },
    )
  }

  public sendSMS(phoneNumber: string) {
    const verificationCode = generateSMSVerificationCode()

    const params = {
      ...this.params,
      PhoneNumbers: phoneNumber,
      TemplateParam: JSON.stringify({
        code: verificationCode,
      }),
    }

    this.sms
      .request('SendSMS', params, {
        method: 'POST',
      })
      .then(
        result => {
          console.log(JSON.stringify(result))
          this.saveSMSVerificationCode(phoneNumber, verificationCode)
        },
        ex => {
          console.log(ex)
        },
      )
  }

  public async validateSMSVerificationCode(validateSMSDto: ValidateSMSDto) {
    const { phoneNumber, verificationCode } = validateSMSDto
    const res = await this.SMSModel.findOne({ phoneNumber })
    const { verificationCode: dbVerificationCode, updatedAt } = res
    return (
      moment(updatedAt).isBetween(moment().subtract(20, 'minutes'), moment()) &&
      dbVerificationCode === verificationCode
    )
  }
}
