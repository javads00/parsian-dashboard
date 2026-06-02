import { endpoints } from '@/lib/services/endpoints'
import { useCustomMutation } from '@/lib/services/useMutation'
import { useCustomPaginationQuery } from '@/lib/services/useQuery'
import type { TGlobalPayload, TRoleStatusAccessClient, TRoleStatusMapping } from '@/typescript'
import { useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/services/api'
import { request } from '@/lib/services/requst'
import type { RoleStatusMappingFormProps } from '@/lib/schema'

export const useGetRoleStatusMappingData = () => {
  const { data, isPending, page, setPage, refetch, isRefetching, dataUpdatedAt } =
    useCustomPaginationQuery<TRoleStatusMapping[]>({
      url: (page: number) => endpoints.roleStatusMapping.list(page, 100),
      key: (page: number) => endpoints.roleStatusMapping.key(page, 100),
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

export function useCreateRoleMapping() {
  return useCustomMutation<TRoleStatusAccessClient, RoleStatusMappingFormProps>({
    method: 'post',
    url: endpoints.roleStatusMapping.create(),
    key: endpoints.roleStatusMapping.createKey(),
  })
}

export function useEditRoleMapping() {
  return useCustomMutation<TRoleStatusMapping, RoleStatusMappingFormProps & { id: string }>({
    method: 'put',
    requestFn: ({ id, ...payload }) =>
      request<TRoleStatusMapping, RoleStatusMappingFormProps & { id: string }>(
        apiClient,
        'put',
        endpoints.roleStatusMapping.update(),
        {
          ...payload,
          id,
        }
      ),
    key: ['roleStatusMapping', 'edit'],
  })
}

export function useDeleteRoleMapping() {
  const queryClient = useQueryClient()
  return useCustomMutation<void, TGlobalPayload>({
    method: 'delete',
    url: endpoints.roleStatusMapping.delete(),
    key: ['roleStatusMapping', 'delete'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roleStatusMappingQueryKeys.all })
    },
  })
}

export const roleStatusMappingQueryKeys = {
  all: ['roleStatusMapping'] as const,
  list: () => [...roleStatusMappingQueryKeys.all, 'list'] as const,
  listPage: (page: number, limit: number) =>
    [...roleStatusMappingQueryKeys.list(), { page, limit }] as const,
  find: (id: string) => [...roleStatusMappingQueryKeys.all, 'find', id] as const,
}
