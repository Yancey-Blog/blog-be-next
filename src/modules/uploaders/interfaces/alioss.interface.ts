import { PutObjectResult, NormalSuccessResponse } from 'ali-oss'

interface IRes extends NormalSuccessResponse {
  statusCode: number
  statusMessage: string
}

// 垃圾阿里云，类型定义跟💩一样
export interface IAliOSSRes extends PutObjectResult {
  name: string
  url: string
  res: IRes
}
