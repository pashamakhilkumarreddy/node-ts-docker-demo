import { nanoid } from 'nanoid'
import debug from 'debug'
import { type CreateUserDto } from '../dto/create.user.dto.js'
import { type PatchUserDto } from '../dto/patch.user.dto.js'
import { type PutUserDto } from '../dto/put.user.dto.js'

const log: debug.IDebugger = debug('app:in-memory-dao')

class UsersDao {
  users: CreateUserDto[] = []

  constructor () {
    log('Created an instance of UsersDao')
  }

  async addUser (user: CreateUserDto): Promise<string> {
    user.id = nanoid()
    this.users.push(user)
    return user.id
  }

  async getUsers (): Promise<CreateUserDto[]> {
    return this.users
  }

  async getUserById (userId: string): Promise<CreateUserDto | undefined> {
    return this.users.find((user: { id: string }) => user.id === userId)
  }

  async putUserById (userId: string, user: PutUserDto): Promise<string> {
    const objIndex = this.users.findIndex(
      (obj: { id: string }) => obj.id === userId
    )
    this.users.splice(objIndex, 1, user)
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `${user.id} updated via put`
  }

  async patchUserById (userId: string, user: PatchUserDto): Promise<string> {
    const objIndex = this.users.findIndex(
      (obj: { id: string }) => obj.id === userId
    )
    const currentUser = this.users[objIndex]
    const allowedPatchFields = [
      'password',
      'firstName',
      'lastName',
      'permissionLevel'
    ]
    for (const field of allowedPatchFields) {
      if (field in user) {
        // @ts-expect-error if field is missing
        currentUser[field] = user[field]
      }
    }
    this.users.splice(objIndex, 1, currentUser)
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `${user.id} patched`
  }

  async removeUserById (userId: string): Promise<string> {
    const objIndex = this.users.findIndex(
      (obj: { id: string }) => obj.id === userId
    )
    this.users.splice(objIndex, 1)
    return `${userId} removed`
  }

  async getUserByEmail (email: string): Promise<CreateUserDto | null> {
    const objIndex = this.users.findIndex(
      (obj: { email: string }) => obj.email === email
    )
    const currentUser = this.users[objIndex]
    return currentUser
  }
}

export default new UsersDao()
