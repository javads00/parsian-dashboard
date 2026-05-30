import { Button } from '@/components/ui/forms/button'
import type { TRole } from '@/typescript'
import { type ColumnDef } from '@tanstack/react-table'
import { PencilIcon, Trash2Icon } from 'lucide-react'

export const createColumns = (
  page: number = 1,
  limit: number = 10,
  _onViewClick?: (role: TRole) => void,
  onEditClick?: (role: TRole) => void,
  onDeleteClick?: (id: string) => void
): ColumnDef<TRole>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => {
      const rowNumber = (page - 1) * limit + row.index + 1
      return <div>{rowNumber}</div>
    },
  },

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
      const permissionSummary = permissions.map(p => `${p.resource} (${p.actions.canCreate ? 'C' : ''}${p.actions.canRead ? 'R' : ''}${p.actions.canEdit ? 'U' : ''}${p.actions.canDelete ? 'D' : ''})`).join(', ')
      return <div className="text-sm text-muted-foreground max-w-xs truncate" title={permissionSummary}>{permissionSummary || 'No permissions'}</div>
    },
  },

  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      const role = row.original as TRole & { _id?: string }
      const roleId = role.id ?? role._id
      const roleWithId = roleId ? { ...role, id: roleId } : role
      return (
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onEditClick?.(roleWithId)}
        >
          <PencilIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => roleId && onDeleteClick?.(roleId)}
          disabled={!roleId}
        >
          <Trash2Icon className="h-4 w-4" />
        </Button>
      </div>
      )
    },
  },
]

export const columns = createColumns()
