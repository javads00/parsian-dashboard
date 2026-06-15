import { usePaginatedList } from '@/hooks/usePaginatedList'
import type { SmtpApiPayload } from '../utils'
import {
  createEmailSmtpMutation,
  deleteEmailSmtpMutation,
  updateEmailSmtpMutation,
} from '@/lib/services/mutations/crud'
import { emailSmtpListQuery } from '@/lib/services/queries/lists'
import { keys } from '@/lib/services/keys'
import type { TGlobalPayload, TSmtp } from '@/typescript'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useGetSmtpData = () =>
  usePaginatedList<TSmtp>(emailSmtpListQuery, keys.emailSMTP.lists())

export function useCreateSmtp() {
  const queryClient = useQueryClient()
  return useMutation({
    ...createEmailSmtpMutation(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.emailSMTP.lists() }),
  })
}

export function useEditSmtp() {
  const queryClient = useQueryClient()
  return useMutation({
    ...updateEmailSmtpMutation(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.emailSMTP.lists() }),
  })
}

export function useDeleteSmtp() {
  const queryClient = useQueryClient()
  return useMutation({
    ...deleteEmailSmtpMutation(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.emailSMTP.lists() }),
  })
}

export type { TSmtp, SmtpApiPayload, TGlobalPayload }
