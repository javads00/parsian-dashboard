import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { useCreateEmailTemplate, useEditEmailTemplate } from '../hooks'
import { mapEmailTemplatePayload, mapEmailTemplateToFormValues } from '../utils'
import type { TFormContainerProps } from '@/typescript/form'
import {
  EmailTemplateFormSchema,
  type EmailTemplateFormValues,
} from '@/lib/schema/emailTemplate.schema'
import EmailTemplatesFormUi from './EmailTemplatesFormUi'

const emptyEmailTemplateFormValues: EmailTemplateFormValues = {
  subject: '',
  emailId: '',
  emailStaticId: '',
  discretion: '',
  firstParagraph: '',
  secondParagraph: '',
  thirdParagraph: '',
  isDeleted: false,
  deletedBy: null,
}

export function EmailTemplatesForm({
  onSubmit,
  onCancel,
  onSuccess,
  defaultValues,
  editId,
  isPending = false,
}: TFormContainerProps<EmailTemplateFormValues>) {
  const isEditMode = Boolean(editId)

  const initialValues = useMemo<EmailTemplateFormValues>(
    () =>
      defaultValues ? mapEmailTemplateToFormValues(defaultValues) : emptyEmailTemplateFormValues,
    [defaultValues]
  )

  const form = useForm<EmailTemplateFormValues>({
    resolver: zodResolver(EmailTemplateFormSchema),
    mode: 'all',
    defaultValues: initialValues,
  })

  useEffect(() => {
    form.reset(initialValues)
  }, [initialValues, form])

  const handleSuccess = async () => {
    onSuccess?.()
  }

  const { mutate: createEmailTemplate, isPending: isCreating } = useCreateEmailTemplate()
  const { mutate: editEmailTemplate, isPending: isUpdating } = useEditEmailTemplate()

  const handleSubmit = async (data: EmailTemplateFormValues) => {
    const payload = mapEmailTemplatePayload(data, isEditMode ? editId : undefined)

    if (onSubmit) {
      await onSubmit(data)
      onSuccess?.()
      return
    }

    if (isEditMode && editId) {
      editEmailTemplate(payload, { onSuccess: handleSuccess })
      return
    }

    createEmailTemplate(payload, {
      onSuccess: handleSuccess,
    })
  }

  return (
    <EmailTemplatesFormUi
      form={form}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      isPending={isPending || isCreating || isUpdating}
      submitLabel={isEditMode ? 'Edit Email Template' : 'Create Email Template'}
    />
  )
}
