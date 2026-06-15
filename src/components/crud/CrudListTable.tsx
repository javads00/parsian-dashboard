import { memo, useMemo } from 'react'
import { TablePagination } from '@/components/common/TablePagination'
import { DataTable } from '@/components/ui/dataTable/DataTable'
import type { CrudListTableProps } from '@/typescript/types/components'

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
