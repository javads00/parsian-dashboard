import {
  crudActionsColumn,
  crudCreatedAtColumn,
  crudRowNumberColumn,
} from '@/lib/table/crudColumns'
import { type TOrderStatus } from '@/typescript'
import { type ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<TOrderStatus>[] = [
  crudRowNumberColumn<TOrderStatus>(),
  {
    accessorKey: 'label',
    header: 'Label',
    cell: ({ row }) => <div>{row.original.label}</div>,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  crudCreatedAtColumn<TOrderStatus>(),
  crudActionsColumn<TOrderStatus>(),
]
