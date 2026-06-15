import { Button } from '@/components/ui/forms/button'
import type { CellContext, ColumnDef } from '@tanstack/react-table'
import { PencilIcon, Trash2Icon } from 'lucide-react'
import { getCrudTableMeta } from './crudTableMeta'

export function rowNumberCell<T>({ row, table }: CellContext<T, unknown>) {
  const { page, limit } = getCrudTableMeta(table)
  return <div>{(page - 1) * limit + row.index + 1}</div>
}

function formatCreatedAt(value: unknown) {
  if (!value) return '-'
  const date = value instanceof Date ? value : new Date(String(value))
  return Number.isNaN(date.getTime()) ? '-' : date.toMiladi()
}

export function crudCreatedAtColumn<T>(): ColumnDef<T> {
  return {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => <div>{formatCreatedAt((row.original as { createdAt?: unknown }).createdAt)}</div>,
  }
}

export function crudActionsCell<T extends { id: string }>({ row, table }: CellContext<T, unknown>) {
  const { onEdit, onDelete } = getCrudTableMeta(table)

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="icon" onClick={() => onEdit?.(row.original)}>
        <PencilIcon className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={() => onDelete?.(row.original.id)}>
        <Trash2Icon className="h-4 w-4" />
      </Button>
    </div>
  )
}

export function crudRowNumberColumn<T>(): ColumnDef<T> {
  return { id: 'rowNumber', header: 'ID', cell: rowNumberCell }
}

export function crudActionsColumn<T extends { id: string }>(): ColumnDef<T> {
  return { id: 'actions', header: 'Action', cell: crudActionsCell }
}
