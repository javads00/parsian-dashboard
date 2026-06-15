import {
  crudActionsColumn,
  crudCreatedAtColumn,
  crudRowNumberColumn,
} from '@/lib/table/crudColumns'
import { type TLabel } from '@/typescript'
import { type ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<TLabel>[] = [
  crudRowNumberColumn<TLabel>(),
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  crudCreatedAtColumn<TLabel>(),
  crudActionsColumn<TLabel>(),
]
