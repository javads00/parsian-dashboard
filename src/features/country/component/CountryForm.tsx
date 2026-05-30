import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

import CountryFormUi from './CountryFormUi'
import { useCreateCountry, useEditCountry } from '../hooks'
import { CountryFormSchema, type CountryFormValues } from '@/lib/schema'
import type { TFormContainerProps } from '@/typescript/form'

export function CountryForm({
  onSubmit,
  onCancel,
  onSuccess,
  defaultValues,
  editId,
  isPending = false,
}: TFormContainerProps<CountryFormValues>) {
  const isEditMode = Boolean(editId)

  const initialValues = useMemo<CountryFormValues>(
    () => ({ name: defaultValues?.name ?? '' }),
    [defaultValues]
  )

  const form = useForm<CountryFormValues>({
    resolver: zodResolver(CountryFormSchema),
    mode: 'all',
    defaultValues: initialValues,
  })

  useEffect(() => {
    form.reset(initialValues)
  }, [initialValues, form])

  const { mutate: createCountry, isPending: isCreating } = useCreateCountry()
  const { mutate: editCountry, isPending: isUpdating } = useEditCountry()

  const handleSubmit = async (data: CountryFormValues) => {
    if (onSubmit) {
      await onSubmit(data)
      onSuccess?.()
      return
    }

    if (isEditMode && editId) {
      editCountry({ ...data, id: editId }, { onSuccess: onSuccess })
      return
    }
    createCountry(data, {
      onSuccess: onSuccess,
    })
  }

  return (
    <CountryFormUi
      form={form}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      isPending={isPending || isCreating || isUpdating}
      submitLabel={isEditMode ? 'Edit Country' : 'Create Country'}
    />
  )
}
