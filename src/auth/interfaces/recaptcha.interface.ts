export interface GoogleRecaptchaRes {
  success: boolean
  challenge_ts: string // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
  hostname: string // the hostname of the site where the reCAPTCHA was solved
  'error-codes'?: string[] // optional
}
