import {
  crudActionsColumn,
  crudCreatedAtColumn,
  crudRowNumberColumn,
} from '@/lib/table/crudColumns'
import { type TRoleStatusMapping } from '@/typescript'
import { type ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<TRoleStatusMapping>[] = [
  crudRowNumberColumn<TRoleStatusMapping>(),
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => <div>{row.original?.roleId?.name ?? '-'}</div>,
  },
  {
    accessorKey: 'visibleAs',
    header: 'Visible As',
    cell: ({ row }) => (
      <div>{row.original.visibleAs?.label || row.original.visibleAs?.name || '-'}</div>
    ),
  },
  {
    accessorKey: 'originals',
    header: 'Originals',
    cell: ({ row }) => <div>{row.original.originals?.length ?? 0}</div>,
  },
  crudCreatedAtColumn<TRoleStatusMapping>(),
  crudActionsColumn<TRoleStatusMapping>(),
]
