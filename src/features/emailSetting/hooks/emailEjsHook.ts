import { usePaginatedList } from '@/hooks/usePaginatedList'
import type { EmailEjsApiPayload } from '../utils'
import {
  createEmailEjsMutation,
  deleteEmailEjsMutation,
  updateEmailEjsMutation,
} from '@/lib/services/mutations/crud'
import { emailEjsListQuery } from '@/lib/services/queries/lists'
import { keys } from '@/lib/services/keys'
import type { TEmailEjs, TGlobalPayload } from '@/typescript'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useGetEmailEjsData = () =>
  usePaginatedList<TEmailEjs>(emailEjsListQuery, keys.emailEjs.lists())

export function useCreateEmailEjs() {
  const queryClient = useQueryClient()
  return useMutation({
    ...createEmailEjsMutation(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.emailEjs.lists() }),
  })
}

export function useEditEmailEjs() {
  const queryClient = useQueryClient()
  return useMutation({
    ...updateEmailEjsMutation(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.emailEjs.lists() }),
  })
}

export function useDeleteEmailEjs() {
  const queryClient = useQueryClient()
  return useMutation({
    ...deleteEmailEjsMutation(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.emailEjs.lists() }),
  })
}

export type { TEmailEjs, EmailEjsApiPayload, TGlobalPayload }
