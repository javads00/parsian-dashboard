import {
  crudActionsColumn,
  crudCreatedAtColumn,
  crudRowNumberColumn,
} from '@/lib/table/crudColumns'
import { type TRoleStatusAccessClient } from '@/typescript'
import { type ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<TRoleStatusAccessClient>[] = [
  crudRowNumberColumn<TRoleStatusAccessClient>(),
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => <div>{row.original?.roleId?.name ?? '-'}</div>,
  },
  {
    accessorKey: 'fullAccess',
    header: 'Full Access',
    cell: ({ row }) => <div>{row.original.fullAccess ? 'Yes' : 'No'}</div>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <div>{row.original.fromStatus?.name}</div>,
  },
  crudCreatedAtColumn<TRoleStatusAccessClient>(),
  crudActionsColumn<TRoleStatusAccessClient>(),
]
