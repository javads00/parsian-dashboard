import { endpoints, useCustomQuery } from '@/lib'
import type { Role } from '@/typescript'

export function useRoles() {
  const { data, isPending } = useCustomQuery<Role[]>({
    url: endpoints.roles.list(),
    key: endpoints.roles.key(),
  })

  return {
    roles: data?.data || [],
    isPending,
  }
}
