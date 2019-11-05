import { PutObjectResult } from 'ali-oss'

// 垃圾阿里云，类型定义跟💩一样
export interface IAliOSSRes extends PutObjectResult {
  url: string
  statusCode: number
  statusMessage: string
}
