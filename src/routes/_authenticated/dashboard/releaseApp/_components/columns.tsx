import {
  crudActionsColumn,
  crudCreatedAtColumn,
  crudRowNumberColumn,
} from '@/lib/table/crudColumns'
import { type TReleaseApp } from '@/typescript'
import { type ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<TReleaseApp>[] = [
  crudRowNumberColumn<TReleaseApp>(),
  {
    accessorKey: 'appName',
    header: 'appName',
    cell: ({ row }) => <div>{row.original?.appName}</div>,
  },
  {
    accessorKey: 'platform',
    header: 'Platform',
    cell: ({ row }) => <div>{row.original?.platform}</div>,
  },
  {
    accessorKey: 'version',
    header: 'version',
    cell: ({ row }) => <div>{row.original?.version}</div>,
  },
  {
    accessorKey: 'previousVersion',
    header: 'previousVersion',
    cell: ({ row }) => <div>{row.original?.previousVersion}</div>,
  },
  crudCreatedAtColumn<TReleaseApp>(),
  crudActionsColumn<TReleaseApp>(),
]
