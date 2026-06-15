import { Input } from '@/components'
import { FormController, FormWrapper } from '@/components/ui/forms/formWrapper'
import type { CountryFormValues } from '@/lib/schema'
import type { TFormUi } from '@/typescript/form'
import { Globe } from 'lucide-react'

export default function CountryFormUi({
  form,
  onSubmit,
  onCancel,
  isPending,
  submitLabel = 'Create Country',
}: TFormUi<CountryFormValues>) {
  const isEdit = submitLabel.toLowerCase().includes('edit')

  return (
    <div className="bg-background flex h-full flex-col">
      <div className="border-b px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 flex h-9 w-9 items-center justify-center rounded-lg">
            <Globe className="text-primary h-5 w-5" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-foreground text-sm font-semibold">
              {isEdit ? 'Edit Country' : 'Create Country'}
            </h2>
            <p className="text-muted-foreground text-xs">
              {isEdit
                ? 'Update the country name in your catalog.'
                : 'Add a new country to use across the system.'}ّ
            </p>
          </div>
        </div>
      </div>

      <FormWrapper
        form={form}
        onSubmit={onSubmit}
        onCancel={onCancel}
        isPending={isPending}
        submitLabel={submitLabel}
        twoColumns
      >
        <div className="col-span-2">
          <p className="text-muted-foreground mb-3 text-[11px] font-semibold tracking-widest uppercase">
            Country Details
          </p>
        </div>

        <div className="col-span-2">
          <div className="bg-muted/30 space-y-1 rounded-lg border p-4">
            <FormController name="name" label="Country Name">
              {({ field, fieldState }) => (
                <Input
                  {...field}
                  value={field.value ?? ''}
                  placeholder="e.g. United States, Germany, Iran"
                  aria-invalid={fieldState.invalid}
                />
              )}
            </FormController>
            <p className="text-muted-foreground text-xs">
              Use the official country name as it should appear in lists and filters.
            </p>
          </div>
        </div>
      </FormWrapper>
    </div>
  )
}
