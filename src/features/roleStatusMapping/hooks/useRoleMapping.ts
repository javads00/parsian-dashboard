import { orderStatusFindAllQuery } from '@/lib/services/queries/lists'
import { useQuery } from '@tanstack/react-query'

export function useOrderStatusMapping() {
  const { data, isPending } = useQuery(orderStatusFindAllQuery())

  return {
    orderMappings: data?.data ?? [],
    isPending,
  }
}
