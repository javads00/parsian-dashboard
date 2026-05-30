import { Input } from '@/components'
import { FormController, FormWrapper } from '@/components/ui/forms/formWrapper'
import type { CountryFormValues } from '@/lib/schema'
import type { TFormUi } from '@/typescript/form'

export default function CountryFormUi({
  form,
  onSubmit,
  onCancel,
  isPending,
  submitLabel = 'Create Country',
}: TFormUi<CountryFormValues>) {
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
        <p className="text-muted-foreground text-xs font-bold uppercase">Country Info</p>
      </div>

      <FormController name="name" label="Country Name">
        {({ field }) => <Input {...field} value={field.value ?? ''} />}
      </FormController>
    </FormWrapper>
  )
}
