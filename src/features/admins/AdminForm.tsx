import { adminFormSchema, type AdminFormProps } from '@/lib'
import { endpoints } from '@/lib/services/endpoints'
import { useCustomMutation } from '@/lib/services/useMutation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { adminQueryKeys } from '@/lib/services/endpoints'
import AdminsFormUi from './AdminsFormUi'
import { useRoles } from './hooks/useRoles'
import { z } from 'zod'

type AdminFormComponentProps = {
  onSubmit?: (data: AdminFormProps) => void | Promise<void>
  onCancel: () => void
  onSuccess?: () => void
  defaultValues?: Partial<AdminFormProps>
  editId?: string
  isPending?: boolean
}

export function AdminForm({
  onSubmit,
  onCancel,
  onSuccess,
  defaultValues,
  editId,
  isPending = false,
}: AdminFormComponentProps) {
  const isEditMode = Boolean(defaultValues && Object.keys(defaultValues).length > 0)
  const formSchema = isEditMode
    ? adminFormSchema.extend({
      password: z.string().optional(),
    })
    : adminFormSchema

  const initialValues: AdminFormProps = useMemo(
    () => ({
      firstName: defaultValues?.firstName ?? '',
      lastName: defaultValues?.lastName ?? '',
      email: defaultValues?.email ?? '',
      username: defaultValues?.username ?? '',
      mobile: defaultValues?.mobile ?? '',
      password: defaultValues?.password ?? '',
      roleId: defaultValues?.roleId ?? '',
    }),
    [defaultValues]
  )

  const { roles, isPending: isLoadingRoles } = useRoles()
  const queryClient = useQueryClient()
  const refreshAdminsList = () => {
    queryClient.invalidateQueries({
      queryKey: adminQueryKeys.all,
    })
    queryClient.refetchQueries({
      queryKey: adminQueryKeys.all,
      type: 'active',
    })
  }
  const handleMutationSuccess = () => {
    // Parent can coordinate refresh/close flow; otherwise fallback to local refresh.
    if (onSuccess) {
      onSuccess()
      return
    }
    refreshAdminsList()
  }

  const form = useForm<AdminFormProps>({
    resolver: zodResolver(formSchema) as any,
    mode: 'all',
    defaultValues: initialValues,
  })

  useEffect(() => {
    form.reset(initialValues)
  }, [form, initialValues])

  const { mutate: mutateCreateAdmin, isPending: isCreating } = useCustomMutation<unknown, AdminFormProps>({
    key: ['admins', 'create'],
    method: 'post',
    url: endpoints.admins.create(),
    onSuccess: () => {
      handleMutationSuccess()
    },
  })

  const { mutate: mutateEditAdmin, isPending: isUpdating } = useCustomMutation<unknown, AdminFormProps & { id: string }>({
    key: ['admins', 'edit'],
    method: 'put',
    url: endpoints.admins.update(),
    onSuccess: () => {
      handleMutationSuccess()
    },
  })

  const handleSubmit = (data: AdminFormProps) => {
    const payload = isEditMode ? { ...data, password: '', id: editId ?? '' } : data

    if (onSubmit) {
      Promise.resolve(onSubmit(payload)).then(() => {
        onSuccess?.()
      })
      return
    }

    if (isEditMode) {
      if (!editId) {
        return
      }
      mutateEditAdmin({ ...payload, id: editId })
      return
    }

    mutateCreateAdmin(payload)
  }

  return (
    <AdminsFormUi
      form={form}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      isPending={isPending || isCreating || isUpdating}
      roles={roles}
      isLoadingRoles={isLoadingRoles}
      showPassword={!isEditMode}
      submitLabel={isEditMode ? 'Edit Admin' : 'Create Admin'}
    />
  )
}
