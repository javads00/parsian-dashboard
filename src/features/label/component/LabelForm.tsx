import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

import LabelFormUi from './LabelFormUi'
import { useCreateLabel, useEditLabel } from '../hooks'
import { labelFormSchema, type LabelFormValues } from '@/lib/schema'
import type { TFormContainerProps } from '@/typescript/form'

export function LabelForm({
  onSubmit,
  onCancel,
  onSuccess,
  defaultValues,
  editId,
  isPending = false,
}: TFormContainerProps<LabelFormValues>) {
  const isEditMode = Boolean(editId)

  const initialValues = useMemo<LabelFormValues>(
    () => ({ name: defaultValues?.name ?? '' }),
    [defaultValues]
  )

  const form = useForm<LabelFormValues>({
    resolver: zodResolver(labelFormSchema),
    mode: 'all',
    defaultValues: initialValues,
  })

  useEffect(() => {
    form.reset(initialValues)
  }, [initialValues, form])

  const handleSuccess = async () => {
    onSuccess?.()
  }

  const { mutate: createRole, isPending: isCreating } = useCreateLabel()
  const { mutate: editRole, isPending: isUpdating } = useEditLabel()

  const handleSubmit = async (data: LabelFormValues) => {
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
    <LabelFormUi
      form={form}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      isPending={isPending || isCreating || isUpdating}
      submitLabel={isEditMode ? 'Edit Label' : 'Create Label'}
    />
  )
}
