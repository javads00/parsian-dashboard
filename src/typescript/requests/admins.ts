import type { TRole } from './role'

export type TAdmin = {
  id: string
  firstName: string
  lastName: string
  email: string
  username: string
  phone?: string
  mobile?: string
  roleId: TRole
  status: string
  createdAt: Date
}
