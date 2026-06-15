import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { useCreateSmtp, useEditSmtp } from '../hooks'
import { mapSmtpPayload, mapSmtpToFormValues } from '../utils'
import type { TFormContainerProps } from '@/typescript/form'
import { SmtpFormSchema, type SmtpFormValues } from '@/lib/schema/smtp.schema'
import SmtpFormUi from './SmtpFormUi'

const emptySmtpFormValues: SmtpFormValues = {
  host: '',
  type: 'SMTP',
  OAUTH_Client_Secret: '',
  OAUTH_Client_ID: '',
  email: '',
  password: '',
  port: 465,
  isServerEmail: false,
  isDeleted: false,
  refresh_Token: '',
  access_Token: '',
  expiry_date: 0,
}

export function SmtpForm({
  onSubmit,
  onCancel,
  onSuccess,
  defaultValues,
  editId,
  isPending = false,
}: TFormContainerProps<SmtpFormValues>) {
  const isEditMode = Boolean(editId)

  const initialValues = useMemo<SmtpFormValues>(
    () => (defaultValues ? mapSmtpToFormValues(defaultValues) : emptySmtpFormValues),
    [defaultValues]
  )

  const form = useForm<SmtpFormValues>({
    resolver: zodResolver(SmtpFormSchema),
    mode: 'all',
    defaultValues: initialValues,
  })

  useEffect(() => {
    form.reset(initialValues)
  }, [initialValues, form])

  const handleSuccess = async () => {
    onSuccess?.()
  }

  const { mutate: createSmtp, isPending: isCreating } = useCreateSmtp()
  const { mutate: editSmtp, isPending: isUpdating } = useEditSmtp()

  const handleSubmit = async (data: SmtpFormValues) => {
    const payload = mapSmtpPayload(data)

    if (onSubmit) {
      await onSubmit(data)
      onSuccess?.()
      return
    }

    if (isEditMode && editId) {
      editSmtp({ ...payload, id: editId }, { onSuccess: handleSuccess })
      return
    }

    createSmtp(payload, {
      onSuccess: handleSuccess,
    })
  }

  return (
    <SmtpFormUi
      form={form}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      isPending={isPending || isCreating || isUpdating}
      submitLabel={isEditMode ? 'Edit SMTP Settings' : 'Create SMTP Settings'}
    />
  )
}
