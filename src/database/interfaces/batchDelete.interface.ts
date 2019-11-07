import { DeleteWriteOpResultObject } from 'mongodb'

export type IBatchDelete = DeleteWriteOpResultObject['result'] & {
  deletedCount?: number
}
