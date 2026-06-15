import {
  DateTimeInput,
  Input,
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Checkbox,
  Textarea,
} from '@/components'
import { FormController, FormWrapper } from '@/components/ui/forms/formWrapper'
import { SelectContent } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { formatExpiryTimestamp } from '../utils/expiryDate'
import type { SmtpFormValues } from '@/lib/schema/smtp.schema'
import type { TFormUi } from '@/typescript/form'

function SectionTitle({ title, description }: { title: string; description?: string }) {
  return (
    <div className="col-span-2 border-b pb-3">
      <p className="text-sm font-semibold">{title}</p>
      {description ? <p className="text-muted-foreground mt-0.5 text-xs">{description}</p> : null}
    </div>
  )
}

const visibleFieldClass = 'font-mono text-xs break-all'

export default function SmtpFormUi({
  form,
  onSubmit,
  onCancel,
  isPending,
  submitLabel = 'Create SMTP Settings',
}: TFormUi<SmtpFormValues>) {
  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      onCancel={onCancel}
      isPending={isPending}
      submitLabel={submitLabel}
      twoColumns
    >
      <div className="bg-muted/30 col-span-2 rounded-lg border px-4 py-3">
        <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
          SMTP Settings
        </p>
        <p className="text-muted-foreground mt-1 text-sm">
          Configure the SMTP server and authentication details.
        </p>
      </div>

      <SectionTitle title="Server" description="Host, port, and account email." />

      <FormController name="host" label="Host">
        {({ field }) => (
          <Input {...field} value={field.value ?? ''} placeholder="e.g. smtp.gmail.com" />
        )}
      </FormController>

      <FormController name="type" label="Authentication Type">
        {({ field }) => (
          <Select value={field.value ?? 'SMTP'} onValueChange={field.onChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select auth type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SMTP">SMTP (Basic Auth)</SelectItem>
              <SelectItem value="OAuth2">OAuth2</SelectItem>
            </SelectContent>
          </Select>
        )}
      </FormController>

      <FormController name="email" label="Email">
        {({ field }) => (
          <Input
            {...field}
            type="email"
            value={field.value ?? ''}
            placeholder="e.g. orders@usedconex.com"
          />
        )}
      </FormController>

      <FormController name="port" label="Port">
        {({ field }) => (
          <Input
            {...field}
            type="number"
            value={field.value ?? ''}
            onChange={(event) => field.onChange(event.target.valueAsNumber || 0)}
            placeholder="e.g. 465"
          />
        )}
      </FormController>

      <SectionTitle
        title="OAuth Credentials"
        description="Client ID and secret are shown side by side for easier review."
      />

      <div className="col-span-2 grid grid-cols-1 gap-4">
        <FormController name="OAUTH_Client_ID" label="OAuth Client ID">
          {({ field }) => (
            <Input
              {...field}
              type="text"
              value={field.value ?? ''}
              placeholder="Client ID"
              className={visibleFieldClass}
            />
          )}
        </FormController>

        <FormController name="OAUTH_Client_Secret" label="OAuth Client Secret">
          {({ field }) => (
            <Input
              {...field}
              type="text"
              value={field.value ?? ''}
              placeholder="Client secret"
              className={visibleFieldClass}
            />
          )}
        </FormController>
      </div>

      <FormController name="access_Token" label="Access Token" className="col-span-2">
        {({ field }) => (
          <Textarea
            {...field}
            value={field.value ?? ''}
            placeholder="OAuth access token"
            rows={4}
            className={cn(visibleFieldClass, 'min-h-24 resize-y')}
          />
        )}
      </FormController>

      <FormController name="refresh_Token" label="Refresh Token" className="col-span-2">
        {({ field }) => (
          <Textarea
            {...field}
            value={field.value ?? ''}
            placeholder="OAuth refresh token"
            rows={4}
            className={cn(visibleFieldClass, 'min-h-24 resize-y')}
          />
        )}
      </FormController>

      <FormController name="password" label="Password" className="col-span-2 sm:col-span-1">
        {({ field }) => (
          <Input
            {...field}
            type="text"
            value={field.value ?? ''}
            placeholder="SMTP password"
            className={visibleFieldClass}
          />
        )}
      </FormController>

      <SectionTitle title="Options" />

      <FormController name="expiry_date" label="Expiry Date">
        {({ field }) => {
          const timestamp = typeof field.value === 'number' ? field.value : 0

          return (
            <div className="space-y-2">
              <DateTimeInput
                id={field.id}
                value={timestamp}
                onChange={field.onChange}
                placeholder="Select expiry date and time"
              />
              <p className="text-muted-foreground text-xs">{formatExpiryTimestamp(timestamp)}</p>
            </div>
          )
        }}
      </FormController>

      <div className="col-span-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormController name="isServerEmail" label="Server Email">
          {({ field }) => (
            <div className="flex h-10 items-center gap-2 rounded-md border px-3">
              <Checkbox
                checked={field.value ?? false}
                onChange={(event) => field.onChange(event.target.checked)}
              />
              <span className="text-sm">Use as server email</span>
            </div>
          )}
        </FormController>
      </div>
    </FormWrapper>
  )
}
