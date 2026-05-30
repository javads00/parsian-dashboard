import { Input } from '@/components'
import { FormController, FormWrapper } from '@/components/ui/forms/formWrapper'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { type RoleFormValues } from '@/lib'
import { type UseFormReturn, useFieldArray, useWatch } from 'react-hook-form'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/forms/button'

const RESOURCE_OPTIONS = ['Admin', 'Role'] as const

const isFullAccessEnabled = (value: unknown) => value === true || value === 1 || value === 'true'

const emptyPermission = (): RoleFormValues['permissions'][0] => ({
  resource: 'Admin',
  page: { canView: false },
  components: {
    table: { canView: false, columns: [] },
    filters: { canView: false, items: [] },
  },
  actions: {
    canCreate: false,
    canEdit: false,
    canDelete: false,
    canRead: false,
  },
})

type Props = {
  form: UseFormReturn<RoleFormValues>
  onSubmit: (data: RoleFormValues) => void
  onCancel: () => void
  isPending: boolean
  submitLabel?: string
}

export default function RoleFormUi({
  form,
  onSubmit,
  onCancel,
  isPending,
  submitLabel = 'Create Role',
}: Props) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'permissions',
  })

  const permissions =
    useWatch({
      control: form.control,
      name: 'permissions',
    }) ?? []
  const fullAccess = useWatch({
    control: form.control,
    name: 'fullAccess',
  })
  const permissionsDisabled = isFullAccessEnabled(fullAccess)

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
        <p className="text-muted-foreground text-xs font-bold uppercase">Role Info</p>
      </div>

      <FormController name="name" label="Role Name">
        {({ field }) => <Input {...field} value={field.value ?? ''} />}
      </FormController>

      <FormController name="fullAccess" label="Full Access">
        {({ field }) => (
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isFullAccessEnabled(field.value)}
              onChange={(e) => {
                const nextValue = e.target.checked
                field.onChange(nextValue)
                if (!nextValue && (form.getValues('permissions')?.length ?? 0) === 0) {
                  append(emptyPermission())
                }
              }}
            />
            Enable full access
          </label>
        )}
      </FormController>

      {permissionsDisabled && (
        <div className="col-span-2 rounded-md bg-yellow-50 p-2 text-xs text-yellow-700">
          Full access enabled → all permissions are ignored
        </div>
      )}

      {/* PERMISSIONS — اینجا overflow-y-auto و max-h اضافه شد */}
      <div className="col-span-2 mt-4 space-y-3 max-h-[55vh] overflow-y-auto pr-1">
        <div className="flex items-center justify-between sticky top-0 bg-background z-10 py-1">
          <p className="text-xs font-bold uppercase">Permissions ({fields.length})</p>

          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => append(emptyPermission())}
            disabled={permissionsDisabled}
          >
            <Plus className="mr-1 h-3 w-3" />
            Add
          </Button>
        </div>

        {fields.length === 0 ? (
          <div className="text-muted-foreground rounded border p-6 text-center text-sm">
            No permissions
          </div>
        ) : (
          fields.map((field, index) => (
            <PermissionBlock
              key={field.id}
              index={index}
              form={form}
              permission={permissions[index]}
              disabled={permissionsDisabled}
              onRemove={() => remove(index)}
            />
          ))
        )}
      </div>
    </FormWrapper>
  )
}

function PermissionBlock({
  index,
  disabled,
  onRemove,
}: {
  index: number
  form: UseFormReturn<RoleFormValues>
  permission: RoleFormValues['permissions'][0]
  disabled?: boolean
  onRemove: () => void
}) {
  const isDisabled = !!disabled

  const ACTION_KEYS = ['canCreate', 'canEdit', 'canDelete', 'canRead'] as const

  return (
    <div className="bg-muted/20 space-y-4 rounded border p-4">
      {/* HEADER */}
      <div className="flex justify-between border-b pb-2">
        <span className="text-xs font-bold">Permission {index + 1}</span>

        <Button
          type="button"
          variant="ghost"
          onClick={onRemove}
          className="text-red-500"
          disabled={isDisabled}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>

      {/* RESOURCE (ENUM SAFE) */}
      <FormController name={`permissions.${index}.resource`}>
        {({ field }) => (
          <Select value={field.value} onValueChange={field.onChange} disabled={isDisabled}>
            <SelectTrigger>
              <SelectValue placeholder="Resource" />
            </SelectTrigger>

            <SelectContent>
              {RESOURCE_OPTIONS.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </FormController>

      {/* ACTIONS (FROM MONGOOSE SCHEMA) */}
      <div className="space-y-2">
        <p className="text-xs font-bold">Actions</p>

        <div className="grid grid-cols-2 gap-2">
          {ACTION_KEYS.map((key) => (
            <FormController key={key} name={`permissions.${index}.actions.${key}`}>
              {({ field }) => (
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={field.value ?? false}
                    onChange={(e) => field.onChange(e.target.checked)}
                    disabled={isDisabled}
                  />
                  {key}
                </label>
              )}
            </FormController>
          ))}
        </div>
      </div>
    </div>
  )
}
