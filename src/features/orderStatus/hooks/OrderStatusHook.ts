import { endpoints } from '@/lib/services/endpoints'
import { useCustomMutation } from '@/lib/services/useMutation'
import { useCustomPaginationQuery } from '@/lib/services/useQuery'
import type { TGlobalPayload, TOrderStatus } from '@/typescript'
import { useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/services/api'
import { request } from '@/lib/services/requst'
import type { OrderStatusFormValues } from '@/lib/schema'

export const useGetOrderStausData = () => {
  const { data, isPending, page, setPage, refetch, isRefetching, dataUpdatedAt } =
    useCustomPaginationQuery<TOrderStatus[]>({
      url: (page: number) => endpoints.orderStaus.list(page, 50),
      key: (page: number) => endpoints.orderStaus.key(page, 60),
    })

  return {
    data,
    isPending,
    page,
    setPage,
    refetch,
    dataUpdatedAt,
    isRefetching,
  }
}

export function useCreateOrderStatus() {
  return useCustomMutation<TOrderStatus, OrderStatusFormValues>({
    method: 'post',
    url: endpoints.orderStaus.create(),
    key: endpoints.orderStaus.createKey(),
  })
}

export function useEditOrderStatus() {
  return useCustomMutation<TOrderStatus, OrderStatusFormValues & { id: string }>({
    method: 'put',
    requestFn: ({ id, ...payload }) =>
      request<TOrderStatus, OrderStatusFormValues & { id: string }>(
        apiClient,
        'put',
        endpoints.orderStaus.update(),
        {
          ...payload,
          id,
        }
      ),
    key: ['orderStatus', 'edit'],
  })
}

export function useDeleteOrderStatus() {
  const queryClient = useQueryClient()
  return useCustomMutation<void, TGlobalPayload>({
    method: 'delete',
    url: endpoints.orderStaus.delete(),
    key: ['orderStatus', 'delete'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderStatuQueryKeys.all })
    },
  })
}

export const orderStatuQueryKeys = {
  all: ['orderStatus'] as const,
  list: () => [...orderStatuQueryKeys.all, 'list'] as const,
  listPage: (page: number, limit: number) =>
    [...orderStatuQueryKeys.list(), { page, limit }] as const,
  find: (id: string) => [...orderStatuQueryKeys.all, 'find', id] as const,
}
