import { useQuery } from '@tanstack/react-query'
import { Input, Select, SelectItem, SelectTrigger, SelectValue } from '@/components'
import { FormController, FormWrapper } from '@/components/ui/forms/formWrapper'
import { SelectContent } from '@/components/ui/select'
import { apiClient } from '@/lib/services/api'
import { endpoints } from '@/lib/services/endpoints'
import { fetchData } from '@/lib/services/request'
import { normalizeEntityId } from '@/lib/utils/normalizeEntityId'
import type { EmailEjsFormValues } from '@/lib/schema/emailEjs.schema'
import type { TFormUi } from '@/typescript/form'
import type { TSmtp } from '@/typescript'

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

export default function EmailEjsFormUi({
  form,
  onSubmit,
  onCancel,
  isPending,
  submitLabel = 'Create Email EJS',
}: TFormUi<EmailEjsFormValues>) {
  const { data: smtpOptions = [], isPending: isLoadingSmtp } = useSmtpAccountOptions()

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
          Email EJS
        </p>
        <p className="text-muted-foreground mt-1 text-sm">
          Configure EJS template metadata and link it to an SMTP account.
        </p>
      </div>

      <SectionTitle title="Template Info" description="Subject, EJS name, and display name." />

      <FormController name="subject" label="Subject">
        {({ field }) => (
          <Input {...field} value={field.value ?? ''} placeholder="e.g. CreateUser" />
        )}
      </FormController>

      <FormController name="name" label="Name">
        {({ field }) => <Input {...field} value={field.value ?? ''} placeholder="e.g. User" />}
      </FormController>

      <FormController name="EJSName" label="EJS Name" className="col-span-2">
        {({ field }) => <Input {...field} value={field.value ?? ''} placeholder="e.g. User" />}
      </FormController>

      <FormController name="emailId" label="SMTP Account" className="col-span-2">
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
    </FormWrapper>
  )
}
