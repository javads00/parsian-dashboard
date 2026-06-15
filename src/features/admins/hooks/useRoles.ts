import { rolesClientListQuery, rolesListQuery } from '@/lib'
import { useQuery } from '@tanstack/react-query'

export function useRoles() {
  const { data, isPending } = useQuery(rolesListQuery(1, 100))

  return {
    roles: data?.data || [],
    isPending,
  }
}

export function useRolesClient() {
  const { data, isPending } = useQuery(rolesClientListQuery())

  return {
    roles: data?.data || [],
    isPending,
  }
}
