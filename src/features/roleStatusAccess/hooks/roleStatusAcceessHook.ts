import { endpoints } from '@/lib/services/endpoints'
import { useCustomMutation } from '@/lib/services/useMutation'
import { useCustomPaginationQuery } from '@/lib/services/useQuery'
import type { TGlobalPayload, TRoleStatusAccess, TRoleStatusAccessClient } from '@/typescript'
import { useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/services/api'
import { request } from '@/lib/services/requst'
import type { RoleStatusAccessApiPayload } from '../utils/toRoleStatusAccessPayload'

export const useGetRoleStatusAccessData = () => {
  const { data, isPending, page, setPage, refetch, isRefetching, dataUpdatedAt } =
    useCustomPaginationQuery<TRoleStatusAccessClient[]>({
      url: (page: number) => endpoints.roleStatusAccess.list(page, 50),
      key: (page: number) => endpoints.roleStatusAccess.key(page, 60),
    })

  return {
    data,
    isPending,
    page,
    setPage,
    refetch,
    dataUpdatedAt,
    isRefetching,
  }
}

export function useCreateRoleStatusAccess() {
  return useCustomMutation<TRoleStatusAccessClient, RoleStatusAccessApiPayload>({
    method: 'post',
    url: endpoints.roleStatusAccess.create(),
    key: endpoints.roleStatusAccess.createKey(),
  })
}

export function useEditRoleStatusAccess() {
  return useCustomMutation<TRoleStatusAccess, RoleStatusAccessApiPayload & { id: string }>({
    method: 'put',
    requestFn: ({ id, ...payload }) =>
      request<TRoleStatusAccess, RoleStatusAccessApiPayload & { id: string }>(
        apiClient,
        'put',
        endpoints.roleStatusAccess.update(),
        {
          ...payload,
          id,
        }
      ),
    key: ['roleStatusAccess', 'edit'],
  })
}

export function useDeleteRoleStatusAccess() {
  const queryClient = useQueryClient()
  return useCustomMutation<void, TGlobalPayload>({
    method: 'delete',
    url: endpoints.roleStatusAccess.delete(),
    key: ['roleStatusAccess', 'delete'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roleStatusAccessQueryKeys.all })
    },
  })
}

export const roleStatusAccessQueryKeys = {
  all: ['roleStatusAccess'] as const,
  list: () => [...roleStatusAccessQueryKeys.all, 'list'] as const,
  listPage: (page: number, limit: number) =>
    [...roleStatusAccessQueryKeys.list(), { page, limit }] as const,
  find: (id: string) => [...roleStatusAccessQueryKeys.all, 'find', id] as const,
}
