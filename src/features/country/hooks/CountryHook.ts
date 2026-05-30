import type { CountryFormValues } from '@/lib/schema'
import { apiClient } from '@/lib/services/api'
import { endpoints } from '@/lib/services/endpoints'
import { useCustomMutation } from '@/lib/services/useMutation'
import { useCustomPaginationQuery } from '@/lib/services/useQuery'
import { request } from '@/lib/services/requst'
import type { TCountry, TGlobalPayload } from '@/typescript'
import { useQueryClient } from '@tanstack/react-query'

export const countryQueryKeys = {
  all: ['country'] as const,
  list: () => [...countryQueryKeys.all, 'list'] as const,
  listPage: (page: number, limit: number) => [...countryQueryKeys.list(), { page, limit }] as const,
  find: (id: string) => [...countryQueryKeys.all, 'find', id] as const,
}

export const useGetCountryData = () => {
  const limit = 50
  const { data, isPending, page, setPage, refetch, isRefetching, dataUpdatedAt } =
    useCustomPaginationQuery<TCountry[]>({
      url: (page: number) => endpoints.country.list(page, limit),
      key: (page: number) => countryQueryKeys.listPage(page, limit),
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

export function useCreateCountry() {
  return useCustomMutation<TCountry, CountryFormValues>({
    method: 'post',
    url: endpoints.country.create(),
    key: endpoints.country.createKey(),
  })
}

export function useEditCountry() {
  return useCustomMutation<TCountry, CountryFormValues & { id: string }>({
    method: 'put',
    requestFn: ({ id, ...payload }) =>
      request<TCountry, CountryFormValues & { id: string }>(
        apiClient,
        'put',
        endpoints.country.update(),
        { ...payload, id }
      ),
    key: endpoints.country.updateKey(),
  })
}

export function useDeleteCountry() {
  const queryClient = useQueryClient()
  return useCustomMutation<void, TGlobalPayload>({
    method: 'delete',
    url: endpoints.country.delete(),
    key: endpoints.country.updateKey(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: countryQueryKeys.all })
    },
  })
}
