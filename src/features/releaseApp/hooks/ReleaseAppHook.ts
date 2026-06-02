import { endpoints } from '@/lib/services/endpoints'
import { useCustomMutation } from '@/lib/services/useMutation'
import { useCustomPaginationQuery } from '@/lib/services/useQuery'
import type { TGlobalPayload, TReleaseApp } from '@/typescript'
import { useQueryClient } from '@tanstack/react-query'
import type { ReleaseAppFormValues } from '@/lib/schema/releaseApp.schema'

export const useGetReleaseAppData = () => {
  const { data, isPending, page, setPage, refetch, isRefetching, dataUpdatedAt } =
    useCustomPaginationQuery<TReleaseApp[]>({
      url: (page: number) => endpoints.releaseApp.list(page, 50),
      key: (page: number) => endpoints.releaseApp.key(page, 60),
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

export function useCreateReleaseApp() {
  return useCustomMutation<TReleaseApp, ReleaseAppFormValues>({
    method: 'post',
    url: endpoints.releaseApp.create(),
    key: endpoints.releaseApp.createKey(),
  })
}

export function useEditReleaseApp() {
  return useCustomMutation<TReleaseApp, ReleaseAppFormValues & { id: string }>({
    method: 'put',
    url: endpoints.releaseApp.update(),
    key: endpoints.releaseApp.createKey(),
  })
}

export function useDeleteReleaseApp() {
  const queryClient = useQueryClient()
  return useCustomMutation<void, TGlobalPayload>({
    method: 'delete',
    url: endpoints.releaseApp.delete(),
    key: endpoints.releaseApp.deleteKey(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: endpoints.releaseApp.key(1, 50) })
    },
  })
}

export const releaseAppQueryKeys = {
  all: ['releaseApp'] as const,
  list: () => [...releaseAppQueryKeys.all, 'list'] as const,
  listPage: (page: number, limit: number) =>
    [...releaseAppQueryKeys.list(), { page, limit }] as const,
  find: (id: string) => [...releaseAppQueryKeys.all, 'find', id] as const,
}
