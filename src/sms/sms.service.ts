import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { ValidationError, ForbiddenError } from 'apollo-server-express'
import AliSMS from '@alicloud/pop-core'
import moment from 'moment'
import { randomSeries } from 'yancey-js-util'
import { ConfigService } from '../config/config.service'
import { UsersService } from '../users/users.service'
import { SMS, AliSMSParams } from './interfaces/sms.interface'
import { ValidateSMSInput } from './dtos/validateSMS.input'
import { ALI_SMS_END_POINT, ALI_SMS_API_VERSION, ALI_SMS_REGION } from '../shared/constants'
import { decodeJWT } from '../shared/utils'

@Injectable()
export class SMSService {
  private readonly sms: AliSMS

  private readonly params: AliSMSParams

  constructor(
    @InjectModel('SMS')
    private readonly SMSModel: Model<SMS>,
    private readonly usersService: UsersService,
    configService: ConfigService,
  ) {
    this.SMSModel = SMSModel

    this.usersService = usersService

    const {
      ALI_ACCESS_KEY_ID,
      ALI_ACCESS_KEY_SECRET,
      ALI_SMS_SIGN_NAME,
      ALI_SMS_TEMPLATE_CODE,
    } = configService.getAliSMSKeys()

    this.sms = new AliSMS({
      accessKeyId: ALI_ACCESS_KEY_ID,
      accessKeySecret: ALI_ACCESS_KEY_SECRET,
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

  public async sendSMS(phoneNumber: string) {
    const verificationCode = randomSeries(6, 10)

    const params = {
      ...this.params,
      PhoneNumbers: phoneNumber,
      TemplateParam: JSON.stringify({
        code: verificationCode,
      }),
    }

    try {
      await this.sms.request('SendSMS', params, {
        method: 'POST',
      })

      await this.saveSMSVerificationCode(phoneNumber, verificationCode)

      return {
        success: true,
      }
    } catch (e) {
      throw new ForbiddenError(e.data.Message)
    }
  }

  public async validateSMSVerificationCode(input: ValidateSMSInput, token: string) {
    const { sub: userId } = decodeJWT(token)

    const { phoneNumber, smsCode } = input

    const res = await this.SMSModel.findOne({ phoneNumber })

    if (res) {
      const { verificationCode, updatedAt } = res

      switch (true) {
        case verificationCode !== smsCode:
          throw new ValidationError('SMS verification code error.')

        case verificationCode === smsCode && this.checkTimeIsExpired(updatedAt):
          throw new ValidationError('SMS verification code has been expired.')

        default:
          return this.usersService.updateUser({ id: userId, phoneNumber })
      }
    } else {
      throw new ValidationError('You might enter a wrong phone number.')
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

  private checkTimeIsExpired(date: Date) {
    return !moment(date).isBetween(moment().subtract(10, 'minutes'), moment())
  }
}
