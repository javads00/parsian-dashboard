import { adminFormSchema, useCustomMutation, type AdminFormProps } from '@/lib'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { endpoints } from '@/lib'
import AdminsFormUi from './AdminsFormUi'
import { useRoles } from './hooks/useRoles'
import { useCustomMutationNormal } from '@/lib/services/useCustomMutation'
import { QueryClient, useQueryClient } from '@tanstack/react-query'



export function AdminForm({
  onSubmit,
  onCancel,
  onSuccess
}: {
  onSubmit?: (data: AdminFormProps) => void
  onCancel: () => void
  onSuccess?: () => void
}) {
  const { roles, isPending: isLoadingRoles } = useRoles()
  const queryClient = useQueryClient()
  const form = useForm<AdminFormProps>({
    resolver: zodResolver(adminFormSchema),
    mode: 'all',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      phone: '',
      password: '',
      roleId: '',
    },
  })






  const { mutate: mutateCreateAdmin, isPending: isCreating } = useCustomMutation<unknown, AdminFormProps>({
    key: ['admins', 'create'],
    method: 'post',
    url: endpoints.admins.create(),
    onSuccess: () => { 
      
      
      queryClient.invalidateQueries({ queryKey: ['admins', 'list']  }) }

      // key: (page: number) => ['admins',{page: page.toString()}],
  })













  const handleSubmit = (data: AdminFormProps) => {
    console.log(data, '11111111111111111')
    if (onSubmit) {
      onSubmit(data)
    } else {
      mutateCreateAdmin(data)
    }
  }

  return (
    <AdminsFormUi
      form={form}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      isPending={isCreating}
      roles={roles}
      isLoadingRoles={isLoadingRoles}
    />
  )
}
