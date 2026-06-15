import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { useState } from 'react'
import { DEFAULT_LIST_LIMIT } from '@/lib/services/keys'

type AnyListQueryOptions = UseQueryOptions<unknown, Error, unknown, readonly unknown[]>

export function usePaginatedListQuery(
  queryFactory: (page: number, limit: number) => AnyListQueryOptions,
  limit = DEFAULT_LIST_LIMIT
) {
  const [page, setPage] = useState(1)

  const query = useQuery(queryFactory(page, limit))

  return {
    ...query,
    page,
    setPage,
    limit,
  }
}
