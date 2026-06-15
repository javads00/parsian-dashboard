import { usePaginatedList } from '@/hooks/usePaginatedList'
import {
  createLabelMutation,
  deleteLabelMutation,
  updateLabelMutation,
} from '@/lib/services/mutations/crud'
import { labelListQuery } from '@/lib/services/queries/lists'
import { keys } from '@/lib/services/keys'
import type { LabelFormValues } from '@/lib/schema'
import type { TLabel } from '@/typescript'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useGetLabelData = () => usePaginatedList<TLabel>(labelListQuery, keys.label.lists())

/** @deprecated Use useGetLabelData */
export const useGetAdminsData = useGetLabelData

export function useCreateLabel() {
  const queryClient = useQueryClient()
  return useMutation({
    ...createLabelMutation(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.label.lists() }),
  })
}

export function useEditLabel() {
  const queryClient = useQueryClient()
  return useMutation({
    ...updateLabelMutation(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.label.lists() }),
  })
}

type TDeleteLabelPayload = {
  id: string
}

export function useDeleteLabel() {
  const queryClient = useQueryClient()
  return useMutation({
    ...deleteLabelMutation(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.label.lists() }),
  })
}

export type { TLabel, LabelFormValues, TDeleteLabelPayload }
