/* eslint-disable @typescript-eslint/return-await */
import { type CRUD } from '../../common/interfaces/crud.interface.js'
import UsersDao from '../daos/users.dao.js'
import { type CreateUserDto } from '../dto/create.user.dto.js'
import { type PatchUserDto } from '../dto/patch.user.dto.js'
import { type PutUserDto } from '../dto/put.user.dto.js'

class UsersService implements CRUD {
  async create (resource: CreateUserDto): Promise<string> {
    return await UsersDao.addUser(resource)
  }

  async deleteById (id: string): Promise<string> {
    return await UsersDao.removeUserById(id)
  }

  async list (limit: number, page: number): Promise<CreateUserDto[]> {
    return await UsersDao.getUsers()
  }

  async patchById (id: string, resource: PatchUserDto): Promise<string> {
    return await UsersDao.patchUserById(id, resource)
  }

  async readById (id: string): Promise<CreateUserDto | undefined> {
    return await UsersDao.getUserById(id)
  }

  async putById (id: string, resource: PutUserDto): Promise<string> {
    return await UsersDao.putUserById(id, resource)
  }

  async getUserByEmail (email: string): Promise<CreateUserDto | null> {
    return await UsersDao.getUserByEmail(email)
  }
}

export default new UsersService()
