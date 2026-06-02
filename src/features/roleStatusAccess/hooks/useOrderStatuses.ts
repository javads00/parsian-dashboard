import { endpoints } from '@/lib/services/endpoints'
import { useCustomQuery } from '@/lib/services/useQuery'
import type { TOrderStatus } from '@/typescript'

export function useOrderStatuses() {
  const { data, isPending } = useCustomQuery<TOrderStatus[]>({
    url: endpoints.orderStaus.list(1, 100),
    key: endpoints.orderStaus.key(1, 100),
  })

  return {
    orderStatuses: data?.data ?? [],
    isPending,
  }
}
