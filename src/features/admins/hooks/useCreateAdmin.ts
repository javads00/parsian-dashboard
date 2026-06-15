import { createAdminMutation, keys } from '@/lib'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateAdmin() {
  const queryClient = useQueryClient()

  return useMutation({
    ...createAdminMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.admins.lists() })
    },
  })
}
