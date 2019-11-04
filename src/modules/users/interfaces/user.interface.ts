export interface IHobby {
  readonly _id: string
  readonly name: string
}

export interface IUser {
  readonly _id: string
  readonly name: string
  readonly age: number
  readonly gender: string
  readonly role: 'SUPERUSER' | 'ADMIN' | 'STAFF'
  readonly hobbies: IHobby[]
  readonly created_at: string
  readonly updated_at: string
}
