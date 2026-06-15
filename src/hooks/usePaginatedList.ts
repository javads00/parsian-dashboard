import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { DEFAULT_LIST_LIMIT } from '@/lib/services/keys'
import type { ApiResponse } from '@/lib/services/type'

type ListQueryFactory = (page: number, limit: number) => object

export function usePaginatedList<T>(
  listQuery: ListQueryFactory,
  listsKey: readonly unknown[],
  limit = DEFAULT_LIST_LIMIT
) {
  const [page, setPage] = useState(1)
  const queryClient = useQueryClient()
  const query = useQuery(listQuery(page, limit) as Parameters<typeof useQuery>[0])

  const response = query.data as ApiResponse<T[]> | undefined
  const rows = response?.data ?? []
  const totalPages =
    response?.pages ??
    (response?.metaData?.totalPages != null ? Number(response.metaData.totalPages) : undefined)
  const totalItems =
    response?.metaData?.totalItems != null ? Number(response.metaData.totalItems) : undefined
  const isInitialLoading = query.isPending && rows.length === 0

  const invalidateList = useCallback(
    () => queryClient.invalidateQueries({ queryKey: listsKey }),
    [queryClient, listsKey]
  )

  return {
    page,
    setPage,
    limit,
    rows,
    totalPages,
    totalItems,
    isInitialLoading,
    isFetching: query.isFetching,
    invalidateList,
  }
}