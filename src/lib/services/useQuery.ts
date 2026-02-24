import { useInfiniteQuery, useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { apiClient } from './api'
import { fetchData } from './requst'
import type {
  ApiResponse,
  UseInfiniteQueryOptionsProps,
  UsePaginationQueryOptionsProps,
  UseQueryOptionsProps,
} from './type'

export function useCustomQuery<T>({ url, key, options, headers }: UseQueryOptionsProps<T>) {
  return useQuery<ApiResponse<T>, Error>({
    queryKey: key,
    queryFn: () => fetchData<T>(apiClient, url, headers),
    ...options,
  })
}

export function useCustomSuspenseQuery<T>({ url, key, options, headers }: UseQueryOptionsProps<T>) {
  return useSuspenseQuery<ApiResponse<T>, Error>({
    queryKey: key,
    queryFn: () => fetchData<T>(apiClient, url, headers),
    ...options,
  })
}

export function useCustomInfiniteQuery<T>({
  url,
  key,
  getNextPageParam = () => undefined,
  getPreviousPageParam = () => undefined,
  options,
  headers,
  initialPageParam = 1,
}: UseInfiniteQueryOptionsProps<T>) {
  return useInfiniteQuery<ApiResponse<T>, Error>({
    queryKey: key,
    queryFn: ({ pageParam }) => {
      const finalUrl = typeof url === 'function' ? url(pageParam as number) : url
      return fetchData<T>(apiClient, finalUrl, headers)
    },
    getNextPageParam,
    getPreviousPageParam,
    initialPageParam,
    ...options,
  })
}

export function useCustomPaginationQuery<T>({
  url,
  key,
  options,
  headers,
}: UsePaginationQueryOptionsProps<T>) {
  const [page, setPage] = useState(1)
  const finalUrl = url(page)

  const finalKey =key(page)

  const queryResult = useCustomQuery<T>({
    url: finalUrl,
    key:finalKey as Array<string | object>,
    options,
    headers,
  })

  return {
    ...queryResult,
    page,
    setPage,
  }
}
