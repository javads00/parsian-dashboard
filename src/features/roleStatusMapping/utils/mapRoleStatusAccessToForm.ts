import type { RoleStatusMappingFormDefaults, TRoleStatusMapping } from '@/typescript'

export function mapRoleStatusMappingToForm(row: TRoleStatusMapping): RoleStatusMappingFormDefaults {
  return {
    roleId: typeof row.roleId === 'object' ? row.roleId.id : row.roleId,
    visibleAs:
      row.visibleAs && typeof row.visibleAs === 'object'
        ? row.visibleAs.id
        : (row.visibleAs ?? null),
    originals: row.originals.map((original) => typeof original === 'object' ? original.id : original),
    originalItemLabels: row.originals.reduce(
      (acc, original) => {
        acc[original.id] = original.label || original.name
        return acc
      },
      {} as Record<string, string>
    ),
  }
}
