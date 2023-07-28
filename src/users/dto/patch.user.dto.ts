import { type PutUserDto } from './put.user.dto.js'

export interface PatchUserDto extends Partial<PutUserDto> {}
