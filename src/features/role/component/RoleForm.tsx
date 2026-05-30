import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

import RoleFormUi from './RoleFormUi'
import { useCreateRole, useEditRole } from '../hooks'
import type { TFormContainerProps } from '@/typescript/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { roleFormSchema, type RoleFormValues } from '@/lib'

function normalizePermissions(
  permissions: Partial<RoleFormValues['permissions'][number]>[] | undefined
): RoleFormValues['permissions'] {
  return (permissions ?? []).map((permission) => ({
    resource: permission.resource === 'Role' ? 'Role' : 'Admin',
    page: {
      canView: permission.page?.canView ?? false,
    },
    components: {
      table: {
        canView: permission.components?.table?.canView ?? false,
        columns: permission.components?.table?.columns ?? [],
      },
      filters: {
        canView: permission.components?.filters?.canView ?? false,
        items: permission.components?.filters?.items ?? [],
      },
    },
    actions: {
      canCreate: permission.actions?.canCreate ?? false,
      canEdit: permission.actions?.canEdit ?? false,
      canDelete: permission.actions?.canDelete ?? false,
      canRead: permission.actions?.canRead ?? false,
    },
  }))
}

export function RoleForm({
  onSubmit,
  onCancel,
  onSuccess,
  defaultValues,
  editId,
  isPending = false,
}: TFormContainerProps<RoleFormValues>) {
  const isEditMode = Boolean(editId)

  const initialValues = useMemo<RoleFormValues>(
    () => ({
      name: defaultValues?.name ?? '',
      fullAccess: defaultValues?.fullAccess ?? false,
      permissions: normalizePermissions(defaultValues?.permissions),
    }),
    [defaultValues]
  )

  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleFormSchema),
    mode: 'all',
    defaultValues: initialValues,
  })

  useEffect(() => {
    form.reset(initialValues)
  }, [initialValues, form])

  const handleSuccess = async () => {
    onSuccess?.()
  }

  const { mutate: createRole, isPending: isCreating } = useCreateRole()
  const { mutate: editRole, isPending: isUpdating } = useEditRole()

  const handleSubmit = async (data: RoleFormValues) => {
    // custom handler
    if (onSubmit) {
      await onSubmit(data)
      onSuccess?.()
      return
    }

    // edit mode
    if (isEditMode && editId) {
      editRole({ ...data, id: editId }, { onSuccess: handleSuccess })
      return
    }

    // create mode
    createRole(data, {
      onSuccess: handleSuccess,
    })
  }

  return (
    <RoleFormUi
      form={form}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      isPending={isPending || isCreating || isUpdating}
      submitLabel={isEditMode ? 'Edit Role' : 'Create Role'}
    />
  )
}
