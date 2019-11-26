export interface Hobby {
  readonly _id: string
  readonly name: string
}

export interface User {
  readonly _id: string
  readonly name: string
  readonly password: string
  readonly age: number
  readonly gender: string
  readonly role: 'SUPERUSER' | 'ADMIN' | 'STAFF'
  readonly hobbies: Hobby[]
  readonly created_at: string
  readonly updated_at: string
}
