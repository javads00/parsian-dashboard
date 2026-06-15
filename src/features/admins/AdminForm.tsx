import { adminFormSchema, createAdminMutation, keys, updateAdminMutation, type AdminFormProps } from '@/lib'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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
    queryClient.invalidateQueries({ queryKey: keys.admins.lists() })
  }

  const handleMutationSuccess = () => {
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

  const { mutate: mutateCreateAdmin, isPending: isCreating } = useMutation({
    ...createAdminMutation(),
    onSuccess: () => {
      handleMutationSuccess()
    },
  })

  const { mutate: mutateEditAdmin, isPending: isUpdating } = useMutation({
    ...updateAdminMutation(),
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
