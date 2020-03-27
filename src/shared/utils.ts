import QRCode from 'qrcode'
import { ApolloError } from 'apollo-server-express'

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
