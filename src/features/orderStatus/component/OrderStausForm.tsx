import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

import OrderStatusFormUi from './OrderStatusFormUi'
import { useCreateOrderStatus, useEditOrderStatus } from '../hooks'
import { orderStatusSchema, type OrderStatusFormValues } from '@/lib/schema'
import type { TFormContainerProps } from '@/typescript/form'

export function OrderStatusForm({
  onSubmit,
  onCancel,
  onSuccess,
  defaultValues,
  editId,
  isPending = false,
}: TFormContainerProps<OrderStatusFormValues>) {
  const isEditMode = Boolean(editId)

  const initialValues = useMemo<OrderStatusFormValues>(
    () => ({
      name: defaultValues?.name ?? '',
      label: defaultValues?.label ?? '',
      description: defaultValues?.description ?? '',
      isPad: defaultValues?.isPad ?? false,
    }),
    [defaultValues]
  )

  const form = useForm<OrderStatusFormValues>({
    resolver: zodResolver(orderStatusSchema),
    mode: 'all',
    defaultValues: initialValues,
  })

  useEffect(() => {
    form.reset(initialValues)
  }, [initialValues, form])

  const handleSuccess = async () => {
    onSuccess?.()
  }

  const { mutate: createRole, isPending: isCreating } = useCreateOrderStatus()
  const { mutate: editRole, isPending: isUpdating } = useEditOrderStatus()

  const handleSubmit = async (data: OrderStatusFormValues) => {
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
    <OrderStatusFormUi
      form={form}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      isPending={isPending || isCreating || isUpdating}
      submitLabel={isEditMode ? 'Edit Label' : 'Create Label'}
    />
  )
}
