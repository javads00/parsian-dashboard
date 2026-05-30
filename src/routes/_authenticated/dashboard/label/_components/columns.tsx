import { Button } from '@/components/ui/forms/button'
import { type TLabel } from '@/typescript'
import { type ColumnDef } from '@tanstack/react-table'
import { PencilIcon, Trash2Icon } from 'lucide-react'

export const createColumns = (
  page: number = 1,
  limit: number = 10,
  _onViewClick?: (role: TLabel) => void,
  onEditClick?: (role: TLabel) => void,
  onDeleteClick?: (id: string) => void
): ColumnDef<TLabel>[] => [
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
    header: 'Name',
    cell: ({ row }) => {
      return <div>{row.original.name}</div>
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
