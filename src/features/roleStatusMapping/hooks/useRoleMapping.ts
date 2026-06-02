import { endpoints } from '@/lib/services/endpoints'
import { useCustomQuery } from '@/lib/services/useQuery'
import type { TOrderStatus } from '@/typescript'

export function useOrderStatusMapping() {
  const { data, isPending } = useCustomQuery<TOrderStatus[]>({
    url: endpoints.orderStaus.findAll(),
    key: endpoints.orderStaus.findAllKey(),
  })

  return {
    orderMappings: data ?? [],
    isPending,
  }
}
