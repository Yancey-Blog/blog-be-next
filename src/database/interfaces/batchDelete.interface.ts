import { DeleteWriteOpResultObject } from 'mongodb'

export type BatchDelete = DeleteWriteOpResultObject['result'] & {
  deletedCount?: number
}
