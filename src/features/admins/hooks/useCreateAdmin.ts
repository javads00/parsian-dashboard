import { endpoints } from '@/lib/services/endpoints'
import { useCustomMutation } from '@/lib/services/useMutation'
import type { AdminFormProps } from '@/lib'
import type { TAdmin } from '@/typescript'
import { useQueryClient } from '@tanstack/react-query'

export function useCreateAdmin() {
  const queryClient = useQueryClient()

  return useCustomMutation<TAdmin, AdminFormProps>({
    method: 'post',
    url: endpoints.admins.create(),
    key: endpoints.admins.createKey(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] })
    },
  })
}
