import QRCode from 'qrcode'
import { ApolloError } from 'apollo-server-express'
import { randomSeries } from 'yancey-js-util'

export const generateSMSVerificationCode = () =>
  (Math.floor(Math.random() * 10000) + 10000).toString().slice(1)

export const jsonStringify = <T>(obj: T) => JSON.stringify(obj).replace(/"([^(")"]+)":/g, '$1:')

export const generateQRCode = async (url: string) => {
  try {
    const qrcode = await QRCode.toDataURL(url)
    return { qrcode }
  } catch (err) {
    throw new ApolloError('Generate QR code failed!')
  }
}

export const generateRecoveryCodes = () => {
  const codes = Array.from({ length: 16 }, () => '')

  for (let i = 0; i < 16; i += 1) {
    const token = randomSeries(10, 16)
    const series = `${token.slice(0, 5)}-${token.slice(5)}`
    codes[i] = series
  }

  return codes
}
