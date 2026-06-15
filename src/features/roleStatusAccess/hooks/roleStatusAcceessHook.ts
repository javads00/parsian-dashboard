import { usePaginatedList } from '@/hooks/usePaginatedList'
import {
  createRoleStatusAccessMutation,
  deleteRoleStatusAccessMutation,
  updateRoleStatusAccessMutation,
} from '@/lib/services/mutations/crud'
import { roleStatusAccessListQuery } from '@/lib/services/queries/lists'
import { keys } from '@/lib/services/keys'
import type { RoleStatusAccessApiPayload } from '../utils/toRoleStatusAccessPayload'
import type { TGlobalPayload, TRoleStatusAccess, TRoleStatusAccessClient } from '@/typescript'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useGetRoleStatusAccessData = () =>
  usePaginatedList<TRoleStatusAccessClient>(roleStatusAccessListQuery, keys.roleStatusAccess.lists())

export function useCreateRoleStatusAccess() {
  const queryClient = useQueryClient()
  return useMutation({
    ...createRoleStatusAccessMutation(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.roleStatusAccess.lists() }),
  })
}

export function useEditRoleStatusAccess() {
  const queryClient = useQueryClient()
  return useMutation({
    ...updateRoleStatusAccessMutation(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.roleStatusAccess.lists() }),
  })
}

export function useDeleteRoleStatusAccess() {
  const queryClient = useQueryClient()
  return useMutation({
    ...deleteRoleStatusAccessMutation(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.roleStatusAccess.lists() }),
  })
}

export type {
  TRoleStatusAccessClient,
  TRoleStatusAccess,
  RoleStatusAccessApiPayload,
  TGlobalPayload,
}
