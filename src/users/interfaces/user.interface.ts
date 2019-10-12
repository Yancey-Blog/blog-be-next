export interface IHobby {
  _id: string
  name: string
}

export interface IUser {
  _id: string
  name: string
  age: number
  gender: string
  role: 'SUPERUSER' | 'ADMIN' | 'STAFF'
  hobbies: IHobby[]
  created_at: string
  updated_at: string
}

export interface UserById {
  [key: string]: IUser
}
