import { Button } from '@/components/ui/forms/button'
import { type TAdmin } from '@/typescript'
import { type ColumnDef } from '@tanstack/react-table'
import { PencilIcon, Trash2Icon } from 'lucide-react'

export const createColumns = (
  page: number = 1,
  limit: number = 10,
  onDeleteClick?: (id: string) => void,
  onEditClick?: (admin: TAdmin) => void
): ColumnDef<TAdmin>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => {
      const rowNumber = (page - 1) * limit + row.index + 1
      return <div>{rowNumber}</div>
    },
  },
  {
    accessorKey: 'firstName',
    header: 'Name',
    cell: ({ row }) => {
      return (
        <div className="flex flex-col items-center gap-1">
          <span>{row?.original?.firstName}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'lastName',
    header: 'Family',
    cell: ({ row }) => {
      return <div>{row.original.lastName}</div>
    },
  },

  {
    accessorKey: 'username',
    header: 'Username',
    cell: ({ row }) => {
      return <div>{row.original.username}</div>
    },
  },

  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => {
      return <div>{row.original.email}</div>
    },
  },

  {
    accessorKey: 'roleId',
    header: 'Role',
    cell: ({ row }) => {
      return <div>{row.original.roleId.name}</div>
    },
  },

  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      const date = row.original.createdAt ? new Date(row.original.createdAt) : null
      return <div>{date ? date.toMiladi() : '-'}</div>
    },
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => onEditClick?.(row.original)}>
            <PencilIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => onDeleteClick?.(row.original.id)}>
            <Trash2Icon className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]

export const columns = createColumns()
