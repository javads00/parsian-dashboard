import { memo, useMemo } from 'react'
import { DataTable, TablePagination } from '@/components'
import type { CrudTableMeta } from '@/lib/table/crudTableMeta'
import type { ColumnDef } from '@tanstack/react-table'

type CrudListTableProps<T extends { id: string }> = {
  columns: ColumnDef<T, unknown>[]
  rows: T[]
  page: number
  setPage: (page: number) => void
  totalPages?: number
  limit: number
  loading?: boolean
  meta: Pick<CrudTableMeta<T>, 'onEdit' | 'onDelete'>
}

function CrudListTableInner<T extends { id: string }>({
  columns,
  rows,
  page,
  setPage,
  totalPages,
  limit,
  loading,
  meta,
}: CrudListTableProps<T>) {
  const tableMeta = useMemo(
    () => ({
      page,
      limit,
      onEdit: meta.onEdit,
      onDelete: meta.onDelete,
    }),
    [page, limit, meta.onEdit, meta.onDelete]
  )

  const pagination = useMemo(
    () => <TablePagination total={totalPages} page={page} onPageChange={setPage} />,
    [totalPages, page, setPage]
  )

  return (
    <DataTable
      columns={columns}
      data={rows}
      loading={loading}
      meta={tableMeta}
      getRowId={(row) => row.id}
      pagination={pagination}
    />
  )
}

export const CrudListTable = memo(CrudListTableInner) as typeof CrudListTableInner
