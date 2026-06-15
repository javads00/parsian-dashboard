import { orderStatusListQuery } from '@/lib/services/queries/lists'
import { useQuery } from '@tanstack/react-query'

export function useOrderStatuses() {
  const { data, isPending } = useQuery(orderStatusListQuery(1, 100))

  return {
    orderStatuses: data?.data ?? [],
    isPending,
  }
}
