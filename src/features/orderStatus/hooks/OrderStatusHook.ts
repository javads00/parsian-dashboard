import { usePaginatedList } from '@/hooks/usePaginatedList'
import {
  createOrderStatusMutation,
  deleteOrderStatusMutation,
  updateOrderStatusMutation,
} from '@/lib/services/mutations/crud'
import { orderStatusListQuery } from '@/lib/services/queries/lists'
import { keys } from '@/lib/services/keys'
import type { OrderStatusFormValues } from '@/lib/schema'
import type { TGlobalPayload, TOrderStatus } from '@/typescript'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useGetOrderStausData = () =>
  usePaginatedList<TOrderStatus>(orderStatusListQuery, keys.orderStatus.lists())

export function useCreateOrderStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    ...createOrderStatusMutation(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.orderStatus.lists() }),
  })
}

export function useEditOrderStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    ...updateOrderStatusMutation(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.orderStatus.lists() }),
  })
}

export function useDeleteOrderStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    ...deleteOrderStatusMutation(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.orderStatus.lists() }),
  })
}

export type { TOrderStatus, OrderStatusFormValues, TGlobalPayload }
