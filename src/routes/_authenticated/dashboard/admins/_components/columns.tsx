import {
  crudActionsColumn,
  crudCreatedAtColumn,
  crudRowNumberColumn,
} from '@/lib/table/crudColumns'
import { type TAdmin } from '@/typescript'
import { type ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<TAdmin>[] = [
  crudRowNumberColumn<TAdmin>(),
  {
    accessorKey: 'firstName',
    header: 'Name',
    cell: ({ row }) => <span>{row.original.firstName}</span>,
  },
  {
    accessorKey: 'lastName',
    header: 'Family',
    cell: ({ row }) => <div>{row.original.lastName}</div>,
  },
  {
    accessorKey: 'username',
    header: 'Username',
    cell: ({ row }) => <div>{row.original.username}</div>,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <div>{row.original.email}</div>,
  },
  {
    accessorKey: 'roleId',
    header: 'Role',
    cell: ({ row }) => <div>{row.original.roleId.name}</div>,
  },
  crudCreatedAtColumn<TAdmin>(),
  crudActionsColumn<TAdmin>(),
]
