import type { RoleFormValues } from '@/lib'
import { endpoints } from '@/lib/services/endpoints'
import { useCustomMutation } from '@/lib/services/useMutation'
import type { TRole } from '@/typescript'
import { useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/services/api'
import { request } from '@/lib/services/requst'

export function useCreateRole() {
  return useCustomMutation<TRole, RoleFormValues>({
    method: 'post',
    url: endpoints.roles.create(),
    key: ['roles', 'create'],
  })
}

export function useEditRole() {
  return useCustomMutation<TRole, RoleFormValues & { id: string }>({
    method: 'put',
    requestFn: ({ id, ...payload }) =>
      request<TRole, RoleFormValues & { id: string }>(
        apiClient,
        'put',
        endpoints.roles.update(),
        {
          ...payload,
          id,
        }
      ),
    key: ['roles', 'edit'],
  })
}

export function useDeleteRole(id: string) {
  const queryClient = useQueryClient()

  return useCustomMutation<TRole, void>({
    method: 'delete',
    url: endpoints.roles.delete(id),
    key: ['roles', 'delete', id],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roleQueryKeys.all })
    },
  })
}

export const roleQueryKeys = {
  all: ['roles'] as const,
  list: () => [...roleQueryKeys.all, 'list'] as const,
  listPage: (page: number, limit: number) => [...roleQueryKeys.list(), { page, limit }] as const,
  find: (id: string) => [...roleQueryKeys.all, 'find', id] as const,
}
