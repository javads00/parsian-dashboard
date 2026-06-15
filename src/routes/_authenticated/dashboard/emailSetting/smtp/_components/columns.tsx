import {
  crudActionsColumn,
  crudCreatedAtColumn,
  crudRowNumberColumn,
} from '@/lib/table/crudColumns'
import { type TSmtp } from '@/typescript'
import { type ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<TSmtp>[] = [
  crudRowNumberColumn<TSmtp>(),
  {
    accessorKey: 'host',
    header: 'Host',
    cell: ({ row }) => <div>{row.original?.host}</div>,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <div>{row.original?.email}</div>,
  },
  {
    accessorKey: 'type',
    header: 'Auth Type',
    cell: ({ row }) => <div>{row.original?.type}</div>,
  },
  {
    accessorKey: 'port',
    header: 'Port',
    cell: ({ row }) => <div>{row.original?.port}</div>,
  },
  
  crudCreatedAtColumn<TSmtp>(),
  crudActionsColumn<TSmtp>(),
]
