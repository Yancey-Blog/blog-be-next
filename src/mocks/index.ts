import { zipObj } from 'ramda'
import { IUser, UserById } from '../users/types'

export const users: IUser[] = [
  {
    _id: '70060443-1c58-4522-a515-145ffad66e11',
    name: 'Yancey',
    age: 23,
    gender: 'male',
    role: 'SUPERUSER',
    hobbies: [
      { _id: '5505f86b-cc0f-4341-902e-9df33bb9b4d1', name: 'singing' },
      { _id: '5390ffc4-3dfc-4209-809c-4b27ec7789b0', name: 'jumping' },
    ],
    created_at: '2019-09-29T10:53:11.595Z',
    updated_at: '2019-09-29T11:53:11.595Z',
  },
  {
    _id: '3590134c-bfaf-4935-ad61-37765640f87d',
    name: 'Sayaka',
    age: 26,
    gender: 'female',
    role: 'STAFF',
    hobbies: [
      { _id: 'dcdafda5-c593-4de2-a36f-d44d4314c743', name: 'rapping' },
      { _id: '6512c6ce-d36f-4f23-90c2-2a5b5fd87f0e', name: 'basketball' },
    ],
    created_at: '2019-09-29T10:53:11.595Z',
    updated_at: '2019-09-29T11:53:11.595Z',
  },
]

export const allIds = users.map((user: IUser) => user._id)
export const userById: UserById = zipObj<IUser>(allIds, users)
