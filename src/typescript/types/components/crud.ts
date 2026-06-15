import type { CrudTableMeta } from '@/lib/table/crudTableMeta'
import type { ColumnDef } from '@tanstack/react-table'

export type CrudListTableProps<T extends { id: string }> = {
  columns: ColumnDef<T, unknown>[]
  rows: T[]
  page: number
  setPage: (page: number) => void
  totalPages?: number
  limit: number
  loading?: boolean
  meta: Pick<CrudTableMeta<T>, 'onEdit' | 'onDelete'>
}
