import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { useCreateRoleStatusAccess, useEditRoleStatusAccess, useOrderStatuses } from '../hooks'
import { roleStatusAccessFormSchema, type RoleStatusAccessFormProps } from '@/lib/schema'
import type { TFormContainerProps } from '@/typescript/form'
import { useRoles } from '@/features/admins/hooks/useRoles'
import RoleStatusAccessFormUi from './roleStatusAccessFormUi'
import { toRoleStatusAccessPayload } from '../utils/toRoleStatusAccessPayload'

type RoleStatusAccessFormProps_ = TFormContainerProps<RoleStatusAccessFormProps> & {
  statusItemLabels?: Record<string, string>
}

export function RoleStatusAccessForm({
  onSubmit,
  onCancel,
  onSuccess,
  defaultValues,
  statusItemLabels,
  editId,
  isPending = false,
}: RoleStatusAccessFormProps_) {
  const isEditMode = Boolean(editId)

  const initialValues = useMemo<RoleStatusAccessFormProps>(
    () => ({
      roleId: defaultValues?.roleId ?? '',
      fullAccess: defaultValues?.fullAccess ?? false,
      statusId: defaultValues?.statusId ?? [],
      fromStatus: defaultValues?.fromStatus ?? '',
    }),
    [defaultValues]
  )

  const form = useForm<RoleStatusAccessFormProps>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(roleStatusAccessFormSchema) as any,
    mode: 'all',
    defaultValues: initialValues,
  })

  useEffect(() => {
    form.reset(initialValues)
  }, [initialValues, form])

  const handleSuccess = async () => {onSuccess?.()}

  const { roles, isPending: isLoadingRoles } = useRoles()
  const { orderStatuses, isPending: isLoadingOrderStatuses } = useOrderStatuses()
  const { mutate: createRole, isPending: isCreating } = useCreateRoleStatusAccess()
  const { mutate: editRole, isPending: isUpdating } = useEditRoleStatusAccess()

  const handleSubmit = async (data: RoleStatusAccessFormProps) => {
    const payload = toRoleStatusAccessPayload(data)

    if (onSubmit) {
      await onSubmit(payload as unknown as RoleStatusAccessFormProps)
      onSuccess?.()
      return
    }

    if (isEditMode && editId) {
      editRole({ ...payload, id: editId }, { onSuccess: handleSuccess })
      return
    }

    createRole(payload, {
      onSuccess: handleSuccess,
    })
  }

  return (
    <RoleStatusAccessFormUi
      form={form}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      isPending={isPending || isCreating || isUpdating}
      submitLabel={isEditMode ? 'Edit Role Status Access' : 'Create Role Status Access'}
      roles={roles}
      orderStatuses={orderStatuses}
      isLoadingRoles={isLoadingRoles}
      isLoadingOrderStatuses={isLoadingOrderStatuses}
      statusItemLabels={statusItemLabels}
    />
  )
}
