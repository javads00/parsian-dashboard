import { endpoints, useCustomMutation } from '@/lib'
import type { AdminFormProps } from '@/lib'
import type { Admin } from '@/typescript'
import { useQueryClient } from '@tanstack/react-query'

export function useCreateAdmin() {
  const queryClient = useQueryClient()

  return useCustomMutation<Admin, AdminFormProps>({
    method: 'post',
    url: endpoints.admins.create(),
    key: endpoints.admins.createKey(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] })
    },
  })
}
