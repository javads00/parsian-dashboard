import { usePaginatedList } from '@/hooks/usePaginatedList'
import type { EmailTemplateApiPayload } from '../utils'
import {
  createEmailTemplateMutation,
  deleteEmailTemplateMutation,
  updateEmailTemplateMutation,
} from '@/lib/services/mutations/crud'
import { emailTemplateListQuery } from '@/lib/services/queries/lists'
import { keys } from '@/lib/services/keys'
import type { TEmailTemplate, TGlobalPayload } from '@/typescript'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useGetEmailTemplatesData = () =>
  usePaginatedList<TEmailTemplate>(emailTemplateListQuery, keys.emailTemplate.lists())

export function useCreateEmailTemplate() {
  const queryClient = useQueryClient()
  return useMutation({
    ...createEmailTemplateMutation(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.emailTemplate.lists() }),
  })
}

export function useEditEmailTemplate() {
  const queryClient = useQueryClient()
  return useMutation({
    ...updateEmailTemplateMutation(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.emailTemplate.lists() }),
  })
}

export function useDeleteEmailTemplate() {
  const queryClient = useQueryClient()
  return useMutation({
    ...deleteEmailTemplateMutation(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.emailTemplate.lists() }),
  })
}

export type { TEmailTemplate, EmailTemplateApiPayload, TGlobalPayload }
