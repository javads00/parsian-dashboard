import { crudActionsColumn, crudRowNumberColumn } from '@/lib/table/crudColumns'
import type { TRole } from '@/typescript'
import { type ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<TRole>[] = [
  crudRowNumberColumn<TRole>(),
  {
    accessorKey: 'name',
    header: 'Role Name',
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: 'fullAccess',
    header: 'Full Access',
    cell: ({ row }) => <div>{row.original.fullAccess ? 'Yes' : 'No'}</div>,
  },
  {
    accessorKey: 'permissions',
    header: 'Permissions',
    cell: ({ row }) => {
      const permissions = row.original.permissions || []
      const permissionSummary = permissions
        .map(
          (p) =>
            `${p.resource} (${p.actions.canCreate ? 'C' : ''}${p.actions.canRead ? 'R' : ''}${p.actions.canEdit ? 'U' : ''}${p.actions.canDelete ? 'D' : ''})`
        )
        .join(', ')
      return (
        <div
          className="text-muted-foreground max-w-xs truncate text-sm"
          title={permissionSummary}
        >
          {permissionSummary || 'No permissions'}
        </div>
      )
    },
  },
  crudActionsColumn<TRole>(),
]
