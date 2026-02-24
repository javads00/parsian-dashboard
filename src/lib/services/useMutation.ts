import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { apiClient } from './api'
import { request } from './requst'
import type {
  ApiResponse,
  UseMutationOptionsProps,
  UseMutationPaginationOptionsProps,
} from './type'

export function useCustomMutation<T, B = unknown, E = unknown>({
  method,
  url,
  key,
  headers,
  onSuccess,
  onError,
  requestFn,
}: UseMutationOptionsProps<T, B, E>) {
  return useMutation<ApiResponse<T>, E, B>({
    mutationKey: key,
    mutationFn: (body: B) =>
      requestFn ? requestFn(body) : request<T, B>(apiClient, method as "post" | "put" | "patch" | "delete", url as string, body, headers),
    onSuccess: (data) => onSuccess?.(data),
    onError: (error) => onError?.(error),
  })
}

export function useCustomMutationPaginationQuery<T, B = unknown, E = unknown>({
  method,
  url,
  key,
  headers,
  onSuccess,
  onError,
  requestFn,
}: UseMutationPaginationOptionsProps<T, B, E>) {
  const [page, setPage] = useState(1)
  const finalUrl = url(page)

  const mutationResult = useMutation<ApiResponse<T>, E, B>({
    mutationKey: key(page),
    mutationFn: (body: B) =>
      requestFn ? requestFn(body) : request<T, B>(apiClient, method as "post" | "put" | "patch" | "delete", finalUrl, body, headers),
    onSuccess: (data) => onSuccess?.(data),
    onError: (error) => onError?.(error),
  })

  return {
    ...mutationResult,
    page,
    setPage,
  }
}
