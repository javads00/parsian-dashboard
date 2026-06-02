import type { RoleStatusAccessFormProps } from '@/lib/schema'
import type { TStatusOrder } from '@/typescript'

type StatusLike = string | Pick<TStatusOrder, 'id' | 'name' | 'label'>

type RoleStatusAccessRow = {
  roleId: { id: string } | string
  fullAccess: boolean
  fromStatus?: { id: string } | string | null
  statusId?: StatusLike[]
  toStatus?: StatusLike[]
}

export type RoleStatusAccessFormDefaults = RoleStatusAccessFormProps & {
  statusItemLabels: Record<string, string>
}

function normalizeStatusList(row: RoleStatusAccessRow): StatusLike[] {
  return row.statusId ?? row.toStatus ?? []
}

export function mapRoleStatusAccessToForm(row: RoleStatusAccessRow): RoleStatusAccessFormDefaults {
  const statusItemLabels: Record<string, string> = {}
  const statusId = normalizeStatusList(row).map((status) => {
    if (typeof status === 'object') {
      statusItemLabels[status.id] = status.label || status.name
      return status.id
    }
    return status
  })

  return {
    roleId: typeof row.roleId === 'object' ? row.roleId.id : row.roleId,
    fullAccess: row.fullAccess,
    fromStatus:
      row.fromStatus && typeof row.fromStatus === 'object' ? row.fromStatus.id : (row.fromStatus ?? ''),
    statusId,
    statusItemLabels,
  }
}
