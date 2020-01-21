export interface AliKey {
  ALI_ACCESS_KEY_ID: string
  ALI_ACCESS_KEY_SECRET: string
}

export interface AliSMSKey extends AliKey {
  ALI_SMS_SIGN_NAME: string
  ALI_SMS_TEMPLATE_CODE: string
}

export interface AliOSSKey extends AliKey {
  ALI_OSS_BUCKET: string
}
