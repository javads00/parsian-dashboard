import { endpoints } from '@/lib/services/endpoints'
import { useCustomMutation } from '@/lib/services/useMutation'
import { useCustomPaginationQuery } from '@/lib/services/useQuery'
import type { TLabel } from '@/typescript'
import { useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/services/api'
import { request } from '@/lib/services/requst'
import type { LabelFormValues } from '@/lib/schema'

export const useGetAdminsData = () => {
  const { data, isPending, page, setPage, refetch, isRefetching, dataUpdatedAt } =
    useCustomPaginationQuery<TLabel[]>({
      url: (page: number) => endpoints.label.list(page, 50),
      key: (page: number) => endpoints.label.key(page, 60),
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

export function useCreateLabel() {
  return useCustomMutation<TLabel, LabelFormValues>({
    method: 'post',
    url: endpoints.label.create(),
    key: endpoints.label.createKey(),
  })
}

export function useEditLabel() {
  return useCustomMutation<TLabel, LabelFormValues & { id: string }>({
    method: 'put',
    requestFn: ({ id, ...payload }) =>
      request<TLabel, LabelFormValues & { id: string }>(
        apiClient,
        'put',
        endpoints.label.update(),
        {
          ...payload,
          id,
        }
      ),
    key: ['label', 'edit'],
  })
}

type TDeleteLabelPayload = {
  id: string
}

export function useDeleteLabel() {
  const queryClient = useQueryClient()
  return useCustomMutation<void, TDeleteLabelPayload>({
    method: 'delete',
    url: endpoints.label.delete(),
    key: ['label', 'delete'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roleQueryKeys.all })
    },
  })
}

export const roleQueryKeys = {
  all: ['label'] as const,
  list: () => [...roleQueryKeys.all, 'list'] as const,
  listPage: (page: number, limit: number) => [...roleQueryKeys.list(), { page, limit }] as const,
  find: (id: string) => [...roleQueryKeys.all, 'find', id] as const,
}
