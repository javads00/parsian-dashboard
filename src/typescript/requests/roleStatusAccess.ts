import type { TRole } from './role'

export type TOrderStatus = {
  id: string
  name: string
  label: string
  description?: string
  isPad: boolean
  createdAt?: Date
}

export type TRoleStatusAccess = {
  id: string
  roleId: TRole
  fullAccess: boolean
  fromStatus?: TOrderStatus | null
  toStatus: TOrderStatus[]
  createdAt: Date
  updatedAt: Date
}

export type RoleStatusAccessFilters = {
  q?: string
  roleId?: string
  fromStatusId?: string
  fullAccess?: boolean
}

export type RoleStatusAccessFormValues = {
  roleId: string
  fullAccess: boolean
  fromStatus: string
  toStatus: string[]
}
