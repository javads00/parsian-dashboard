import { useQuery } from '@tanstack/react-query'
import {
  Input,
  Textarea,
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components'
import { FormController, FormWrapper } from '@/components/ui/forms/formWrapper'
import { SelectContent } from '@/components/ui/select'
import { apiClient } from '@/lib/services/api'
import { endpoints } from '@/lib/services/endpoints'
import { keys } from '@/lib/services/keys'
import { fetchData } from '@/lib/services/request'
import { normalizeEntityId } from '@/lib/utils/normalizeEntityId'
import { cn } from '@/lib/utils'
import type { EmailTemplateFormValues } from '@/lib/schema/emailTemplate.schema'
import type { TFormUi } from '@/typescript/form'
import type { TEmailStatic, TSmtp } from '@/typescript'

function SectionTitle({ title, description }: { title: string; description?: string }) {
  return (
    <div className="col-span-2 border-b pb-3">
      <p className="text-sm font-semibold">{title}</p>
      {description ? <p className="text-muted-foreground mt-0.5 text-xs">{description}</p> : null}
    </div>
  )
}



function useSmtpAccountOptions() {
  return useQuery({
    queryKey: ['emailSmtp', 'options'],
    queryFn: ({ signal }) =>
      fetchData<TSmtp[]>(apiClient, endpoints.emailSmtp.list(1, 100), { signal }),
    staleTime: 60_000,
    select: (response) =>
      (response.data ?? []).map((smtp) => {
        const normalized = normalizeEntityId(smtp)
        return {
          value: normalized.id,
          label: `${normalized.email} (${normalized.host})`,
        }
      }),
  })
}

function useEmailStaticOptions() {
  return useQuery({
    queryKey: keys.emailStatic.options(),
    queryFn: ({ signal }) =>
      fetchData<TEmailStatic[]>(apiClient, endpoints.emailStatic.list(1, 100), { signal }),
    staleTime: 60_000,
    select: (response) =>
      (response.data ?? [])
        .map((item) => {
          const normalized = normalizeEntityId(item)
          return {
            value: normalized.id,
            label: normalized.name,
          }
        })
        .filter((option) => Boolean(option.value && option.label)),
  })
}

export default function EmailTemplatesFormUi({
  form,
  onSubmit,
  onCancel,
  isPending,
  submitLabel = 'Create Email Template',
}: TFormUi<EmailTemplateFormValues>) {
  const { data: smtpOptions = [], isPending: isLoadingSmtp } = useSmtpAccountOptions()
  const { data: emailStaticOptions = [], isPending: isLoadingEmailStatic } = useEmailStaticOptions()

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      onCancel={onCancel}
      isPending={isPending}
      submitLabel={submitLabel}
      twoColumns
    >
      <div className="col-span-2 rounded-lg border bg-muted/30 px-4 py-3">
        <p className="text-muted-foreground text-xs font-bold uppercase tracking-wider">
          Email Template
        </p>
        <p className="text-muted-foreground mt-1 text-sm">
          Define the template content and link it to an SMTP account.
        </p>
      </div>

      <SectionTitle title="Template Info" description="Subject, description, and linked accounts." />

      <FormController name="subject" label="Subject" className="col-span-2">
        {({ field }) => (
          <Input
            {...field}
            value={field.value ?? ''}
            placeholder="e.g. Password Reset Link"
          />
        )}
      </FormController>

      <FormController name="discretion" label="Description" className="col-span-2">
        {({ field }) => (
          <Textarea
            {...field}
            value={field.value ?? ''}
            placeholder="Short description of this template"
            rows={3}
            className={cn('min-h-20 resize-y text-sm leading-relaxed')}
          />
        )}
      </FormController>

      <FormController name="emailStaticId" label="Static Email Template">
        {({ field }) => (
          <Select
            value={field.value ?? ''}
            onValueChange={field.onChange}
            disabled={isLoadingEmailStatic}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={
                  isLoadingEmailStatic ? 'Loading static templates...' : 'Select static template'
                }
              />
            </SelectTrigger>
            <SelectContent>
              {emailStaticOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </FormController>

      <FormController name="emailId" label="SMTP Account">
        {({ field }) => (
          <Select
            value={field.value ?? ''}
            onValueChange={field.onChange}
            disabled={isLoadingSmtp}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={isLoadingSmtp ? 'Loading SMTP accounts...' : 'Select SMTP account'}
              />
            </SelectTrigger>
            <SelectContent>
              {smtpOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </FormController>

      <SectionTitle title="Email Body" description="Three paragraphs used in the template." />

      <FormController name="firstParagraph" label="First Paragraph" className="col-span-2">
        {({ field }) => (
          <Textarea
            {...field}
            value={field.value ?? ''}
            placeholder="Opening paragraph"
            rows={4}
            className={cn('min-h-24 resize-y text-sm leading-relaxed')}
          />
        )}
      </FormController>

      <FormController name="secondParagraph" label="Second Paragraph" className="col-span-2">
        {({ field }) => (
          <Textarea
            {...field}
            value={field.value ?? ''}
            placeholder="Middle paragraph"
            rows={4}
            className={cn('min-h-24 resize-y text-sm leading-relaxed')}
          />
        )}
      </FormController>

      <FormController name="thirdParagraph" label="Third Paragraph" className="col-span-2">
        {({ field }) => (
          <Textarea
            {...field}
            value={field.value ?? ''}
            placeholder="Closing paragraph"
            rows={4}
            className={cn('min-h-24 resize-y text-sm leading-relaxed')}
          />
        )}
      </FormController>
    </FormWrapper>
  )
}
