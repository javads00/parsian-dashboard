import {
  createRoleMutation,
  deleteRoleMutation,
  updateRoleMutation,
} from '@/lib/services/mutations/crud'
import { keys } from '@/lib/services/keys'
import type { RoleFormValues } from '@/lib'
import type { TRole } from '@/typescript'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateRole() {
  const queryClient = useQueryClient()
  return useMutation({
    ...createRoleMutation(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.roles.lists() }),
  })
}

export function useEditRole() {
  const queryClient = useQueryClient()
  return useMutation({
    ...updateRoleMutation(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.roles.lists() }),
  })
}

export function useDeleteRole(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    ...deleteRoleMutation(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.roles.lists() }),
  })
}

export type { TRole, RoleFormValues }
