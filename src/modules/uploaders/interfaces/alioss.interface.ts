import { PutObjectResult } from 'ali-oss'

// 垃圾阿里云，类型定义的跟💩一样
export interface IAliOssRes extends PutObjectResult {
  url: string
  statusCode: number
  statusMessage: string
}
