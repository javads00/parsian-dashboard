import { usePaginatedList } from '@/hooks/usePaginatedList'
import {
  createCountryMutation,
  deleteCountryMutation,
  updateCountryMutation,
} from '@/lib/services/mutations/crud'
import { countryListQuery } from '@/lib/services/queries/lists'
import { keys } from '@/lib/services/keys'
import type { CountryFormValues } from '@/lib/schema'
import type { TCountry, TGlobalPayload } from '@/typescript'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useGetCountryData = () =>
  usePaginatedList<TCountry>(countryListQuery, keys.country.lists())

export function useCreateCountry() {
  const queryClient = useQueryClient()
  return useMutation({
    ...createCountryMutation(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.country.lists() }),
  })
}

export function useEditCountry() {
  const queryClient = useQueryClient()
  return useMutation({
    ...updateCountryMutation(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.country.lists() }),
  })
}

export function useDeleteCountry() {
  const queryClient = useQueryClient()
  return useMutation({
    ...deleteCountryMutation(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.country.lists() }),
  })
}

export type { TCountry, CountryFormValues, TGlobalPayload }
