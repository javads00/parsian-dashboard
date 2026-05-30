import { Input } from '@/components'
import { FormController, FormWrapper } from '@/components/ui/forms/formWrapper'
import type { LabelFormValues } from '@/lib/schema'
import type { TFormUi } from '@/typescript/form'

export default function LabelFormUi({
  form,
  onSubmit,
  onCancel,
  isPending,
  submitLabel = 'Create Label',
}: TFormUi<LabelFormValues>) {
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
        <p className="text-muted-foreground text-xs font-bold uppercase">Label Info</p>
      </div>

      <FormController name="name" label="Label Name">
        {({ field }) => <Input {...field} value={field.value ?? ''} />}
      </FormController>
    </FormWrapper>
  )
}
