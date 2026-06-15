import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

import RoleFormUi from './RoleFormUi'
import { useCreateRole, useEditRole } from '../hooks'
import { mergePermissionGroups, normalizeGroupedPermissionResources } from '../config/permissionGroups'
import type { TFormContainerProps } from '@/typescript/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { roleFormSchema, type RoleFormValues } from '@/lib'

export { PERMISSION_GROUP_CONFIG, buildPermissionFromGroupConfig, mergePermissionGroups } from '../config/permissionGroups'

function normalizePermissions(
  permissions: Partial<RoleFormValues['permissions'][number]>[] | undefined
): RoleFormValues['permissions'] {
  return (permissions ?? []).map((permission) => ({
    resource: permission.resource ?? 'Admin',
    page: {
      canView: permission.page?.canView ?? false,
    },
    actions: {
      canCreate: permission.actions?.canCreate ?? false,
      canEdit: permission.actions?.canEdit ?? false,
      canDelete: permission.actions?.canDelete ?? false,
      canRead: permission.actions?.canRead ?? false,
    },
    subMenus: (permission.subMenus ?? []).map((sub) => ({
      key: sub.key ?? '',
      label: sub.label ?? '',
      page: { canView: sub.page?.canView ?? false },
      actions: {
        canCreate: sub.actions?.canCreate ?? false,
        canEdit: sub.actions?.canEdit ?? false,
        canDelete: sub.actions?.canDelete ?? false,
        canRead: sub.actions?.canRead ?? false,
      },
      components: {
        table: {
          canView: sub.components?.table?.canView ?? false,
          columns: sub.components?.table?.columns ?? [],
        },
        filters: {
          canView: sub.components?.filters?.canView ?? false,
          items: sub.components?.filters?.items ?? [],
        },
      },
    })),
    components: permission.components
      ? {
          table: {
            canView: permission.components.table?.canView ?? false,
            columns: permission.components.table?.columns ?? [],
          },
          filters: {
            canView: permission.components.filters?.canView ?? false,
            items: permission.components.filters?.items ?? [],
          },
        }
      : undefined,
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
      permissions: mergePermissionGroups(normalizePermissions(defaultValues?.permissions)),
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
    const payload: RoleFormValues = {
      ...data,
      permissions: normalizeGroupedPermissionResources(data.permissions),
    }

    if (onSubmit) {
      await onSubmit(payload)
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
    <RoleFormUi
      form={form}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      isPending={isPending || isCreating || isUpdating}
      submitLabel={isEditMode ? 'Edit Role' : 'Create Role'}
    />
  )
}
