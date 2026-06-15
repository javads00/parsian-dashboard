import type { TStatusOrder } from './global.type'
import type { Resource, TColumn, TFilterItem, TPermission, TSubMenu } from '../role.types'

export type { Resource, TColumn, TFilterItem, TPermission, TSubMenu }

export type TRole = {
  id: string
  name: string
  fullAccess: boolean
  permissions: TPermission[]
  isDeleted: boolean
  deletedBy?: string
  createdAt: Date
  updatedAt: Date
}

export type TRoleClient = {
  id: string
  name: string
  key: string
  inOffice: boolean
  priority: number
  createdAt: Date
  updatedAt: Date
}

export type TRoleMappings = {
  id: string
  roleId: TRoleClient
  originals: TOrderStatus
  visibleAs: TOrderStatus[]
  createdAt: Date
  updatedAt: Date
}

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
  fromStatus: string | null
  statusId: string[]
}

export type TRoleStatusAccessClient = {
  id: string
  roleId: TRoleClient
  fullAccess: boolean
  fromStatus?: TStatusOrder | null
  statusId: TStatusOrder[]
  /** @deprecated API may still return this alias */
  toStatus?: TStatusOrder[]
  createdAt: Date
  updatedAt: Date
}

export type TRoleStatusMapping = {
  id: string
  roleId: TRoleClient
  visibleAs: TStatusOrder
  originals: TStatusOrder[]
  createdAt: Date
}

export type RoleStatusMappingFormValues = {
  roleId: string
  visibleAs: string
  originals: string[]
}

export type RoleStatusMappingFormDefaults = RoleStatusMappingFormValues & {
  originalItemLabels: Record<string, string>
}
