import type { UseInfiniteQueryOptions, UseQueryOptions } from '@tanstack/react-query'

type MetaData = {
  currentPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
  nextPage: number
  prevPage: number
  totalPages: number
  totalItems: number
}
export interface ApiResponse<T> {
  data: T
  metaData?: MetaData
  message?: string
  pages?: number
  status: number
  statusText: string
  headers: Headers
  ok: boolean
}

export interface UseMutationOptionsProps<T, B = unknown, E = unknown> {
  url?: string
  key: string[] | Array<string | object>
  headers?: HeadersInit
  method?: 'post' | 'put' | 'patch' | 'get' | 'delete'
  onSuccess?: (data: ApiResponse<T>) => void
  onError?: (error: E) => void
  requestFn?: (body: B) => Promise<ApiResponse<T>>
}

export interface UseMutationPaginationOptionsProps<T, B = unknown, E = unknown> {
  url: (page: number) => string
  key: (page: number) => string[] | Array<string | object>
  headers?: HeadersInit
  method: 'post' | 'put' | 'patch' | 'get'
  onSuccess?: (data: ApiResponse<T>) => void
  onError?: (error: E) => void
  requestFn?: (body: B) => Promise<ApiResponse<T>>
}

export interface UseQueryOptionsProps<T> {
  url: string
  key: string[] | Array<string | object>
  options?: Omit<UseQueryOptions<ApiResponse<T>, Error>, 'queryKey' | 'queryFn'>
  headers?: HeadersInit
}

export interface UseInfiniteQueryOptionsProps<T> {
  url: string | ((pageParam: unknown) => string)
  key: string[] | Array<string | object>
  getNextPageParam?: (lastPage: ApiResponse<T>, allPages: ApiResponse<T>[]) => unknown
  getPreviousPageParam?: (firstPage: ApiResponse<T>, allPages: ApiResponse<T>[]) => unknown
  options?: Partial<
    Omit<
      UseInfiniteQueryOptions<ApiResponse<T>, Error>,
      'queryKey' | 'queryFn' | 'getNextPageParam' | 'initialPageParam' | 'select'
    >
  >
  headers?: HeadersInit
  initialPageParam?: unknown
}

export interface UsePaginationQueryOptionsProps<T> {
  url: (page: number) => string
  key: (page: number) => any
  options?: Omit<UseQueryOptions<ApiResponse<T>, Error>, 'queryKey' | 'queryFn'>
  headers?: HeadersInit
}

export type Endpoint = string | ((...args: never[]) => string)
export type EndpointEntry =
  | Endpoint
  | ((...args: never[]) => string[] | string)
  | readonly string[]
  | string
