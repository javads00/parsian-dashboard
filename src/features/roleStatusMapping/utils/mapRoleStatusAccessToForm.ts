import type { RoleStatusMappingFormDefaults, TRoleStatusMapping } from '@/typescript'

export function mapRoleStatusMappingToForm(row: TRoleStatusMapping): RoleStatusMappingFormDefaults {
  const visibleAsId =
    row.visibleAs && typeof row.visibleAs === 'object'
      ? row.visibleAs.id
      : String(row.visibleAs ?? '')

  const originalItemLabels = row.originals.reduce(
    (acc, original) => {
      const id = typeof original === 'object' ? original.id : String(original)
      const label =
        typeof original === 'object' ? original.label || original.name : String(original)
      acc[id] = label
      return acc
    },
    {} as Record<string, string>
  )

  if (row.visibleAs && typeof row.visibleAs === 'object') {
    originalItemLabels[row.visibleAs.id] = row.visibleAs.label || row.visibleAs.name
  }

  return {
    roleId: typeof row.roleId === 'object' ? row.roleId.id : String(row.roleId),
    visibleAs: visibleAsId,
    originals: row.originals.map((original) =>
      typeof original === 'object' ? original.id : String(original)
    ),
    originalItemLabels,
  }
}
