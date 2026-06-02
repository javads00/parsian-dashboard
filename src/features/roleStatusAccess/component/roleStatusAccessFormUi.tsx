import {

  Checkbox,

  MultiSelect,

  MultiSelectChip,

  MultiSelectContent,

  MultiSelectItem,

  MultiSelectTrigger,

  MultiSelectValue,

  Select,

  SelectContent,

  SelectItem,

  SelectTrigger,

  SelectValue,

} from '@/components'

import { FormController, FormWrapper } from '@/components/ui/forms/formWrapper'

import type { RoleStatusAccessFormProps } from '@/lib/schema'

import type { TOrderStatus, TRole } from '@/typescript'

import type { TFormUi } from '@/typescript/form'

import { useMemo } from 'react'

import { useWatch } from 'react-hook-form'



type StatusOption = { id: string; label: string }



type RoleStatusAccessFormUiProps = TFormUi<RoleStatusAccessFormProps> & {

  roles: TRole[]

  orderStatuses: TOrderStatus[]

  isLoadingRoles?: boolean

  isLoadingOrderStatuses?: boolean

  statusItemLabels?: Record<string, string>

}



export default function RoleStatusAccessFormUi({

  form,

  onSubmit,

  onCancel,

  isPending,

  submitLabel = 'Create Role Status Access',

  roles,

  orderStatuses,

  isLoadingRoles,

  isLoadingOrderStatuses,

  statusItemLabels,

}: RoleStatusAccessFormUiProps) {

  const fullAccess = useWatch({ control: form.control, name: 'fullAccess' }) ?? false



  const statusOptions = useMemo<StatusOption[]>(() => {
    const map = new Map<string, StatusOption>()

    orderStatuses.forEach((status) => {
      map.set(status.id, { id: status.id, label: status.label || status.name })
    })

    Object.entries(statusItemLabels ?? {}).forEach(([id, label]) => {
      if (!map.has(id)) {
        map.set(id, { id, label })
      }
    })

    return Array.from(map.values())
  }, [orderStatuses, statusItemLabels])

  const statusLabelById = useMemo<Record<string, string>>(() => {
    const labels: Record<string, string> = { ...(statusItemLabels ?? {}) }
    statusOptions.forEach((status) => {
      labels[status.id] = status.label
    })
    return labels
  }, [statusOptions, statusItemLabels])



  return (

    <FormWrapper

      form={form}

      onSubmit={onSubmit}

      onCancel={onCancel}

      isPending={isPending}

      submitLabel={submitLabel}

      twoColumns

    >

      {/* Section heading */}

      <div className="col-span-2">

        <p className="text-muted-foreground mb-3 text-[11px] font-semibold tracking-widest uppercase">

          Role Status Access Information

        </p>

      </div>



      {/* Role */}

      <FormController name="roleId" label="Role">

        {({ field, fieldState }) => (

          <Select

            value={field.value ?? ''}

            onValueChange={field.onChange}

            disabled={isLoadingRoles}

          >

            <SelectTrigger

              aria-invalid={fieldState.invalid}

              className="focus:ring-ring/20 w-full transition-shadow focus:ring-[3px]"

            >

              <SelectValue placeholder={isLoadingRoles ? 'Loading roles…' : 'Select a role'} />

            </SelectTrigger>

            <SelectContent>

              {roles.map((role) => (

                <SelectItem key={role.id} value={role.id}>

                  {role.name}

                </SelectItem>

              ))}

            </SelectContent>

          </Select>

        )}

      </FormController>



      {/* Full Access checkbox */}

      <FormController name="fullAccess" label="Full Access">

        {({ field }) => (

          <div className="flex h-9 items-center gap-2.5">

            <Checkbox

              id="fullAccess"

              checked={field.value ?? false}

              onChange={(e) => {

                const checked = e.target.checked

                field.onChange(checked)

                if (checked) {

                  form.setValue('fromStatus', '')

                  form.setValue('statusId', [])

                  form.clearErrors(['fromStatus', 'statusId'])

                }

              }}

              className="data-[state=checked]:border-primary data-[state=checked]:bg-primary rounded-[4px] transition-colors"

            />

            <label

              htmlFor="fullAccess"

              className="text-muted-foreground cursor-pointer text-sm select-none"

            >

              Grant access to all statuses

            </label>

          </div>

        )}

      </FormController>



      {/* From Status */}

      <FormController name="fromStatus" label="From Status">

        {({ field, fieldState }) => (

          <Select

            value={field.value ?? ''}

            onValueChange={field.onChange}

            disabled={fullAccess || isLoadingOrderStatuses}

          >

            <SelectTrigger

              aria-invalid={fieldState.invalid}

              className="focus:ring-ring/20 w-full transition-shadow focus:ring-[3px]"

            >

              <SelectValue

                placeholder={

                  fullAccess

                    ? 'Not required with full access'

                    : isLoadingOrderStatuses

                      ? 'Loading statuses…'

                      : 'Select from status'

                }

              />

            </SelectTrigger>

            <SelectContent>

              {statusOptions.map((status) => (

                <SelectItem key={status.id} value={status.id}>

                  {status.label}

                </SelectItem>

              ))}

            </SelectContent>

          </Select>

        )}

      </FormController>



      {/* Allowed Statuses — full width */}

      <FormController name="statusId" label="Allowed Statuses" className="col-span-2">

        {({ field, fieldState }) => {

          const selectedValues: string[] = field.value ?? []



          return (

            <MultiSelect

              value={selectedValues}

              onValueChange={field.onChange}

              disabled={fullAccess || isLoadingOrderStatuses}

              itemLabels={statusLabelById}

            >

              <MultiSelectTrigger aria-invalid={fieldState.invalid} className="w-full">

                {!fullAccess && selectedValues.length > 0 ? (

                  selectedValues.map((val) => (
                    <MultiSelectChip key={val} value={val}>
                      {statusLabelById[val] ?? val}
                    </MultiSelectChip>
                  ))

                ) : (

                  <MultiSelectValue

                    placeholder={

                      fullAccess

                        ? 'All statuses granted'

                        : isLoadingOrderStatuses

                          ? 'Loading statuses…'

                          : 'Select allowed statuses…'

                    }

                  />

                )}

              </MultiSelectTrigger>



              <MultiSelectContent>

                {statusOptions.map((status) => (

                  <MultiSelectItem key={status.id} value={status.id}>

                    {status.label}

                  </MultiSelectItem>

                ))}

              </MultiSelectContent>

            </MultiSelect>

          )

        }}

      </FormController>

    </FormWrapper>

  )

}


