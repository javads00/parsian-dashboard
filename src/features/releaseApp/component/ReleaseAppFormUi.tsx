import { Input, Select, SelectItem, SelectTrigger, SelectValue } from '@/components'
import { FormController, FormWrapper } from '@/components/ui/forms/formWrapper'
import { SelectContent } from '@/components/ui/select'
import type { ReleaseAppFormValues } from '@/lib/schema/releaseApp.schema'
import { ReleaseAppPlatform } from '@/typescript/requests/releaseApp'
import type { TFormUi } from '@/typescript/form'

export default function ReleaseAppFormUi({
  form,
  onSubmit,
  onCancel,
  isPending,
  submitLabel = 'Create Release App',
}: TFormUi<ReleaseAppFormValues>) {
  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      onCancel={onCancel}
      isPending={isPending}
      submitLabel={submitLabel}
      twoColumns
    >
      {/* HEADER */}
      <div className="col-span-2">
        <p className="text-muted-foreground text-xs font-bold uppercase tracking-wider">
          Release App Info
        </p>
        <p className="text-muted-foreground mt-1 text-sm">
          Enter the details for the new app release.
        </p>
      </div>

      <FormController name="appName" label="App Name">
        {({ field }) => (
          <Input
            {...field}
            value={field.value ?? ''}
            placeholder="e.g. Conex Dashboard"
          />
        )}
      </FormController>

      <FormController name="platform" label="Platform">
        {({ field }) => (
          <Select value={field.value ?? ''} onValueChange={field.onChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ReleaseAppPlatform.ios}>iOS</SelectItem>
              <SelectItem value={ReleaseAppPlatform.android}>Android</SelectItem>
            </SelectContent>
          </Select>
        )}
      </FormController>
      <FormController name="version" label="Version">
        {({ field }) => (
          <Input
            {...field}
            value={field.value ?? ''}
            placeholder="e.g. 1.4.2"
            inputMode="numeric"
            pattern="^[0-9.]+$"
          />
        )}
      </FormController>
      <FormController name="previousVersion" label="Previous Version">
        {({ field }) => (
          <Input
            {...field}
            value={field.value ?? ''}
            placeholder="e.g. 1.4.1"
            inputMode="numeric"
            pattern="^[0-9.]+$"
          />
        )}
      </FormController>

      <FormController name="downloadUrl" label="Download URL (optional)">
        {({ field }) => (
          <Input
            {...field}
            value={field.value ?? ''}
            placeholder="e.g. https://example.com/app.apk"
          />
        )}
      </FormController>
    </FormWrapper>
  )
}
