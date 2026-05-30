import { endpoints } from '@/lib/services/endpoints'
import { useCustomQuery } from '@/lib/services/useQuery'
import type { TRole } from '@/typescript'

export function useRoles() {
  const { data, isPending } = useCustomQuery<TRole[]>({
    url: endpoints?.roles?.list(1, 10),
    key: endpoints?.roles?.key(1, 10),
  })

  return {
    roles: data?.data || [],
    isPending,
  }
}
