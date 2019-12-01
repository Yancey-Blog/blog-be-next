import { User } from '../../users/interfaces/user.interface'

interface Authorization {
  authorization: string
}

export type LoginRes = Authorization & Omit<User, 'password'>
