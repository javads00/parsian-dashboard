import { usePaginatedList } from '@/hooks/usePaginatedList'
import {
  createReleaseAppMutation,
  deleteReleaseAppMutation,
  updateReleaseAppMutation,
} from '@/lib/services/mutations/crud'
import { releaseAppListQuery } from '@/lib/services/queries/lists'
import { keys } from '@/lib/services/keys'
import type { ReleaseAppFormValues } from '@/lib/schema/releaseApp.schema'
import type { TGlobalPayload, TReleaseApp } from '@/typescript'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useGetReleaseAppData = () =>
  usePaginatedList<TReleaseApp>(releaseAppListQuery, keys.releaseApp.lists())

export function useCreateReleaseApp() {
  const queryClient = useQueryClient()
  return useMutation({
    ...createReleaseAppMutation(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.releaseApp.lists() }),
  })
}

export function useEditReleaseApp() {
  const queryClient = useQueryClient()
  return useMutation({
    ...updateReleaseAppMutation(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.releaseApp.lists() }),
  })
}

export function useDeleteReleaseApp() {
  const queryClient = useQueryClient()
  return useMutation({
    ...deleteReleaseAppMutation(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.releaseApp.lists() }),
  })
}

export type { TReleaseApp, ReleaseAppFormValues, TGlobalPayload }
