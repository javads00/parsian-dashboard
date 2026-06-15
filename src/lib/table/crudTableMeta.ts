import type { Table } from '@tanstack/react-table'
import { DEFAULT_LIST_LIMIT } from '@/lib/services/keys'

export type CrudTableMeta<T> = {
  page: number
  limit: number
  onEdit?: (row: T) => void
  onDelete?: (id: string) => void
}

export function getCrudTableMeta<T>(table: Table<T>): CrudTableMeta<T> {
  const meta = table.options.meta as Partial<CrudTableMeta<T>> | undefined
  return {
    page: meta?.page ?? 1,
    limit: meta?.limit ?? DEFAULT_LIST_LIMIT,
    onEdit: meta?.onEdit,
    onDelete: meta?.onDelete,
  }
}
