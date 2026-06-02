import { endpoints } from '@/lib/services/endpoints'
import { useCustomQuery } from '@/lib/services/useQuery'
import type { TRole } from '@/typescript'

export function useRoles() {
  const { data, isPending } = useCustomQuery<TRole[]>({
    url: endpoints?.rolesClient?.getList(),
    key: endpoints?.rolesClient?.getListKey(),
  })

  return {
    roles: data?.data || [],
    isPending,
  }
}
