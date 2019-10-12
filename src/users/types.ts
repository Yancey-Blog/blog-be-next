export enum Role {
  SUPERUSER = 'SUPERUSER',
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
}

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

export interface IArgs {
  _id: string
}

export interface IQuery {
  id: string
}

export interface IBody {
  id: string
}

export interface IParam {
  id: string
}

export interface IHeaders {
  id: string
}
