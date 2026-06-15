import {
  crudActionsColumn,
  crudCreatedAtColumn,
  crudRowNumberColumn,
} from '@/lib/table/crudColumns'
import { type TCountry } from '@/typescript'
import { type ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<TCountry>[] = [
  crudRowNumberColumn<TCountry>(),
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  crudCreatedAtColumn<TCountry>(),
  crudActionsColumn<TCountry>(),
]
