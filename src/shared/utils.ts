import QRCode from 'qrcode'
import jwt from 'jsonwebtoken'
import { ApolloError } from 'apollo-server-express'
import { randomSeries } from 'yancey-js-util'
import bcrypt from 'bcrypt'
import { Payload } from '../auth/interfaces/jwt.interface'
import { CORS_ORIGINS_PRODUCTION, CORS_ORIGINS_UN_PRODUCTION } from './constants'

export const jsonStringify = <T>(obj: T) => JSON.stringify(obj).replace(/"([^(")"]+)":/g, '$1:')

export const generateQRCode = async (url: string) => {
  try {
    return await QRCode.toDataURL(url)
  } catch (err) {
    throw new ApolloError('Generate QR code failed!')
  }
}

export const generateRecoveryCodes = () => {
  const codes = Array.from({ length: 10 }, () => '')

  for (let i = 0; i < 10; i += 1) {
    const token = randomSeries(8, 8)
    const series = `${token.slice(0, 4)} ${token.slice(4)}`
    codes[i] = series
  }

  return codes
}

export const decodeJWT = (token: string) => jwt.decode(token.slice(7)) as Payload

export const encryptPassword = (password: string) => bcrypt.hashSync(password, 10)

export const configCORS = () => {
  const isEnvProduction = process.env.NODE_ENV === 'production'

  return {
    origin: isEnvProduction ? CORS_ORIGINS_PRODUCTION : CORS_ORIGINS_UN_PRODUCTION,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: '*',
  }
}
