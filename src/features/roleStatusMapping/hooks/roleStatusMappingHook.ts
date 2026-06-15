import { usePaginatedList } from '@/hooks/usePaginatedList'
import {
  createRoleStatusMappingMutation,
  deleteRoleStatusMappingMutation,
  updateRoleStatusMappingMutation,
} from '@/lib/services/mutations/crud'
import { roleStatusMappingListQuery } from '@/lib/services/queries/lists'
import { keys } from '@/lib/services/keys'
import type { RoleStatusMappingFormProps } from '@/lib/schema'
import type { TGlobalPayload, TRoleStatusAccessClient, TRoleStatusMapping } from '@/typescript'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const ROLE_STATUS_MAPPING_LIMIT = 100

export const useGetRoleStatusMappingData = () =>
  usePaginatedList<TRoleStatusMapping>(
    roleStatusMappingListQuery,
    keys.roleStatusMapping.lists(),
    ROLE_STATUS_MAPPING_LIMIT
  )

export function useCreateRoleMapping() {
  const queryClient = useQueryClient()
  return useMutation({
    ...createRoleStatusMappingMutation(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.roleStatusMapping.lists() }),
  })
}

export function useEditRoleMapping() {
  const queryClient = useQueryClient()
  return useMutation({
    ...updateRoleStatusMappingMutation(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.roleStatusMapping.lists() }),
  })
}

export function useDeleteRoleMapping() {
  const queryClient = useQueryClient()
  return useMutation({
    ...deleteRoleStatusMappingMutation(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.roleStatusMapping.lists() }),
  })
}

export type {
  TRoleStatusMapping,
  TRoleStatusAccessClient,
  RoleStatusMappingFormProps,
  TGlobalPayload,
}
