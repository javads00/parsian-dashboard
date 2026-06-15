import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { useCreateEmailEjs, useEditEmailEjs } from '../hooks'
import { mapEmailEjsPayload, mapEmailEjsToFormValues } from '../utils'
import type { TFormContainerProps } from '@/typescript/form'
import { EmailEjsFormSchema, type EmailEjsFormValues } from '@/lib/schema/emailEjs.schema'
import EmailEjsFormUi from './EmailEjsFormUi'

const emptyEmailEjsFormValues: EmailEjsFormValues = {
  subject: '',
  EJSName: '',
  name: '',
  emailId: '',
  isDeleted: false,
}

export function EmailEjsForm({
  onSubmit,
  onCancel,
  onSuccess,
  defaultValues,
  editId,
  isPending = false,
}: TFormContainerProps<EmailEjsFormValues>) {
  const isEditMode = Boolean(editId)

  const initialValues = useMemo<EmailEjsFormValues>(
    () => (defaultValues ? mapEmailEjsToFormValues(defaultValues) : emptyEmailEjsFormValues),
    [defaultValues]
  )

  const form = useForm<EmailEjsFormValues>({
    resolver: zodResolver(EmailEjsFormSchema),
    mode: 'all',
    defaultValues: initialValues,
  })

  useEffect(() => {
    form.reset(initialValues)
  }, [initialValues, form])

  const handleSuccess = async () => {
    onSuccess?.()
  }

  const { mutate: createEmailEjs, isPending: isCreating } = useCreateEmailEjs()
  const { mutate: editEmailEjs, isPending: isUpdating } = useEditEmailEjs()

  const handleSubmit = async (data: EmailEjsFormValues) => {
    const payload = mapEmailEjsPayload(data, isEditMode ? editId : undefined)

    if (onSubmit) {
      await onSubmit(data)
      onSuccess?.()
      return
    }

    if (isEditMode && editId) {
      editEmailEjs(payload, { onSuccess: handleSuccess })
      return
    }

    createEmailEjs(payload, {
      onSuccess: handleSuccess,
    })
  }

  return (
    <EmailEjsFormUi
      form={form}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      isPending={isPending || isCreating || isUpdating}
      submitLabel={isEditMode ? 'Edit Email EJS' : 'Create Email EJS'}
    />
  )
}
