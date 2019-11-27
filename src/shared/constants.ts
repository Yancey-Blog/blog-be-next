export const MAX_SIZE = 20 * 1024 * 1024

export const EXPIRES_TIME = 7 * 24 * 60 * 60

export const FORMIDABLE = {
  maxFileSize: MAX_SIZE,
  keepExtensions: true,
  hash: 'md5',
}

export const BANDWAGON_URL = 'https://api.64clouds.com/v1/'

export const RECAPTCHA_URL = 'https://www.google.com/recaptcha/api/siteverify/'

export const ALI_OSS_REGION = 'oss-cn-hongkong'

export const ALI_OSS_END_POINT = 'https://static.yancey.app/'

export const ALI_SMS_END_POINT = 'https://dysmsapi.aliyuncs.com'

export const ALI_SMS_API_VERSION = '2017-05-25'

export const ALI_SMS_REGION = 'cn-hangzhou'

export const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gim
