import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { useCreateRoleMapping, useEditRoleMapping, useOrderStatusMapping } from '../hooks'
import { roleStatusMappingFormSchema, type RoleStatusMappingFormProps } from '@/lib/schema'
import type { TFormContainerProps } from '@/typescript/form'
import { useRoles } from '@/features/admins/hooks/useRoles'
import RoleMappingFormUi from './roleMappingFormUi'
import { toRoleStatusMappingPayload } from '../utils/toRoleStatusAccessPayload'
import type { TRoleStatusMapping } from '@/typescript'

type RoleStatusMappingFormProps_ = TFormContainerProps<RoleStatusMappingFormProps> & {
  statusItemLabels?: Record<string, string>
}

export function RoleStatusMappingForm({
  onSubmit,
  onCancel,
  onSuccess,
  defaultValues,
  statusItemLabels,
  editId,
  isPending = false,
}: RoleStatusMappingFormProps_) {
  const isEditMode = Boolean(editId)

  const initialValues = useMemo<RoleStatusMappingFormProps>(
    () => ({
      roleId: defaultValues?.roleId ?? '',
      visibleAs: defaultValues?.visibleAs ?? '',
      originals: defaultValues?.originals ?? [],
    }),
    [defaultValues]
  )

  const form = useForm<RoleStatusMappingFormProps>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(roleStatusMappingFormSchema) as any,
    mode: 'all',
    defaultValues: initialValues,
  })

  useEffect(() => {
    form.reset(initialValues)
  }, [initialValues, form])

  const handleSuccess = async () => {
    onSuccess?.()
  }

  const { roles, isPending: isLoadingRoles } = useRoles()
  const { orderMappings, isPending: isLoadingOrderStatuses } = useOrderStatusMapping()
  const { mutate: createRole, isPending: isCreating } = useCreateRoleMapping()
  const { mutate: editRole, isPending: isUpdating } = useEditRoleMapping()

  const handleSubmit = async (data: RoleStatusMappingFormProps) => {
    const payload = toRoleStatusMappingPayload(data)

    if (onSubmit) {
      await onSubmit(payload as unknown as RoleStatusMappingFormProps)
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
    <RoleMappingFormUi
      form={form}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      isPending={isPending || isCreating || isUpdating}
      submitLabel={isEditMode ? 'Edit Role Status Mapping' : 'Create Role Status Mapping'}
      roles={roles}
      orderMappings={orderMappings}
      isLoadingRoles={isLoadingRoles}
      isLoadingOrderStatuses={isLoadingOrderStatuses}
      statusItemLabels={statusItemLabels}
    />
  )
}
