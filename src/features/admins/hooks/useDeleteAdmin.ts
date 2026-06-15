import { deleteAdminMutation, keys } from '@/lib'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteAdmin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [...keys.admins.all, 'delete'],
    mutationFn: (id: string) => {
      const { mutationFn } = deleteAdminMutation(id)
      if (!mutationFn) throw new Error('Missing deleteAdmin mutationFn')
      return mutationFn(undefined, {} as never)
    },
    meta: { toast: true },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.admins.lists() })
    },
  })
}
