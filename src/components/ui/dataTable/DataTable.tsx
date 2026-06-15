'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination/Pagination'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table/table'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import type { DataTableProps } from '@/typescript/types/components'
import { memo, useMemo } from 'react'

const SKELETON_CELL_WIDTHS = ['w-24', 'w-36', 'w-28', 'w-44', 'w-20', 'w-32'] as const
const PAGINATION_SKELETON_EDGE_PAGE_COUNT = 3

function DataTableInner<TData, TValue>({
  columns,
  data,
  loading,
  skeletonRows = 10,
  pagination,
  meta,
  getRowId,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta,
    getRowId: getRowId ? (row) => getRowId(row) : undefined,
  })

  const isLoading = Boolean(loading) && data.length === 0
  const headerGroups = table.getHeaderGroups()
  const rowModel = table.getRowModel()

  const bodyContent = useMemo(() => {
    if (isLoading) {
      return (
        <SkeletonCell skeletonRows={skeletonRows} columnCount={columns.length} />
      )
    }

    if (rowModel.rows.length) {
      return rowModel.rows.map((row) => (
        <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))
    }

    return (
      <TableRow>
        <TableCell colSpan={columns.length} className="h-24 text-center">
          No results.
        </TableCell>
      </TableRow>
    )
  }, [isLoading, skeletonRows, columns.length, rowModel.rows])

  return (
    <>
      <div className="container-overflow max-h-[calc(100vh-15rem)] overflow-hidden overflow-y-auto rounded-md border">
        <Table>
          <TableHeader>
            {headerGroups.map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>{bodyContent}</TableBody>
        </Table>
      </div>
      {isLoading && pagination != null ? <PaginationSkeleton /> : pagination}
    </>
  )
}

export const DataTable = memo(DataTableInner) as typeof DataTableInner

function PaginationSkeleton() {
  const firstPages = Array.from(
    { length: PAGINATION_SKELETON_EDGE_PAGE_COUNT },
    (_, index) => index + 1
  )
  const lastPages = Array.from(
    { length: PAGINATION_SKELETON_EDGE_PAGE_COUNT },
    (_, index) => index + PAGINATION_SKELETON_EDGE_PAGE_COUNT + 2
  )

  return (
    <Pagination className="mt-4 flex w-full justify-end" aria-hidden>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious className="pointer-events-none opacity-50" tabIndex={-1} />
        </PaginationItem>

        {firstPages.map((pageNumber, index) => (
          <PaginationItem key={`skeleton-first-${pageNumber}`}>
            <PaginationLink
              size="default"
              isActive={index === 0}
              className="pointer-events-none min-w-9 px-3"
              aria-disabled
            >
              <Skeleton className="h-4 w-3" />
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        {lastPages.map((pageNumber) => (
          <PaginationItem key={`skeleton-last-${pageNumber}`}>
            <PaginationLink
              size="default"
              className="pointer-events-none min-w-9 px-3"
              aria-disabled
            >
              <Skeleton className="h-4 w-3" />
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext className="pointer-events-none opacity-50" tabIndex={-1} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

function SkeletonCell({
  skeletonRows,
  columnCount,
}: {
  skeletonRows: number
  columnCount: number
}) {
  return Array.from({ length: skeletonRows }).map((_, rowIndex) => (
    <TableRow key={`skeleton-${rowIndex}`} className="hover:bg-transparent">
      {Array.from({ length: columnCount }).map((_, colIndex) => (
        <TableCell key={`skeleton-${rowIndex}-${colIndex}`} className="py-4">
          <div className="flex items-center gap-3">
            {colIndex === 0 ? <Skeleton className="size-8 shrink-0 rounded-full" /> : null}
            <div className="w-full space-y-2">
              <Skeleton
                className={`h-4 ${
                  SKELETON_CELL_WIDTHS[(rowIndex + colIndex) % SKELETON_CELL_WIDTHS.length]
                } max-w-full`}
              />
              {colIndex === 0 ? <Skeleton className="h-3 w-20 max-w-full" /> : null}
            </div>
          </div>
        </TableCell>
      ))}
    </TableRow>
  ))
}
