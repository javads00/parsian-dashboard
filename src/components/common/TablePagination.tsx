import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination/Pagination'
import type { TablePaginationProps } from '@/typescript/types/components'

const EDGE_PAGE_COUNT = 3

export function TablePagination({
  total,
  page = 1,
  onPageChange,
}: TablePaginationProps) {
  if (total == null || total <= 1) return null

  const firstPages = Array.from(
    { length: Math.min(EDGE_PAGE_COUNT, total) },
    (_, index) => index + 1
  )
  const lastPages =
    total > EDGE_PAGE_COUNT * 2
      ? Array.from({ length: EDGE_PAGE_COUNT }, (_, index) => total - EDGE_PAGE_COUNT + index + 1)
      : []
  const pages = lastPages.length ? [...firstPages, 'ellipsis' as const, ...lastPages] : firstPages

  return (
    <Pagination className="mt-4 flex w-full justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange?.(page - 1)}
            className={page <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
          />
        </PaginationItem>
        {pages.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            {pageNumber === 'ellipsis' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                size="default"
                isActive={pageNumber === page}
                onClick={() => onPageChange?.(pageNumber)}
                className="min-w-9 cursor-pointer px-3"
              >
                {pageNumber}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange?.(page + 1)}
            className={page >= total ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
