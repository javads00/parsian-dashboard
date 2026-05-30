import { Input, Textarea, Checkbox } from '@/components'
import { FormController, FormWrapper } from '@/components/ui/forms/formWrapper'

import type { OrderStatusFormValues } from '@/lib/schema'
import type { TFormUi } from '@/typescript/form'

export default function OrderStatusFormUi({
  form,
  onSubmit,
  onCancel,
  isPending,
  submitLabel = 'Create Label',
}: TFormUi<OrderStatusFormValues>) {
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

      <FormController name="label" label="Label">
        {({ field }) => <Input {...field} value={field.value ?? ''} placeholder="Enter label" />}
      </FormController>

      <FormController name="name" label="Name">
        {({ field }) => <Input {...field} value={field.value ?? ''} placeholder="Enter name" />}
      </FormController>

      <FormController name="description" label="Description" className="col-span-2">
        {({ field }) => (
          <Textarea {...field} value={field.value ?? ''} placeholder="Enter description" />
        )}
      </FormController>

      <FormController name="isPad" label="Is Pad">
        {({ field }) => (
          <div className="flex items-center gap-2">
            <Checkbox
              checked={field.value ?? false}
              onChange={(e) => field.onChange(e.target.checked)}
            />
            <span className="text-muted-foreground text-sm">Enable Pad mode</span>
          </div>
        )}
      </FormController>
    </FormWrapper>
  )
}
