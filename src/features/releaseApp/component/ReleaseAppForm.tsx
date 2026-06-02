import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { useCreateReleaseApp, useEditReleaseApp } from '../hooks'
import type { TFormContainerProps } from '@/typescript/form'
import { ReleaseAppSchema, type ReleaseAppFormValues } from '@/lib/schema/releaseApp.schema'
import ReleaseAppFormUi from './ReleaseAppFormUi'

export function ReleaseAppForm({
  onSubmit,
  onCancel,
  onSuccess,
  defaultValues,
  editId,
  isPending = false,
}: TFormContainerProps<ReleaseAppFormValues>) {
  const isEditMode = Boolean(editId)

  const initialValues = useMemo<ReleaseAppFormValues>(
    () => ({
      appName: defaultValues?.appName ?? '',
      platform: defaultValues?.platform ?? '',
      version: defaultValues?.version ?? '',
      previousVersion: defaultValues?.previousVersion ?? '',
      downloadUrl: defaultValues?.downloadUrl ?? '',
    }),
    [
      defaultValues?.appName,
      defaultValues?.platform,
      defaultValues?.version,
      defaultValues?.previousVersion,
      defaultValues?.downloadUrl,
    ]
  )

  const form = useForm<ReleaseAppFormValues>({
    resolver: zodResolver(ReleaseAppSchema),
    mode: 'all',
    defaultValues: initialValues,
  })

  useEffect(() => {
    form.reset(initialValues)
  }, [initialValues, form])

  const handleSuccess = async () => {
    onSuccess?.()
  }

  const { mutate: createReleaseApp, isPending: isCreating } = useCreateReleaseApp()
  const { mutate: editReleaseApp, isPending: isUpdating } = useEditReleaseApp()

  const handleSubmit = async (data: ReleaseAppFormValues) => {
    // custom handler
    if (onSubmit) {
      await onSubmit(data)
      onSuccess?.()
      return
    }

    // edit mode
    if (isEditMode && editId) {
      editReleaseApp({ ...data, id: editId }, { onSuccess: handleSuccess })
      return
    }

    // create mode
    createReleaseApp(data, {
      onSuccess: handleSuccess,
    })
  }

  return (
    <ReleaseAppFormUi
      form={form}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      isPending={isPending || isCreating || isUpdating}
      submitLabel={isEditMode ? 'Edit Release App' : 'Create Release App'}
    />
  )
}
