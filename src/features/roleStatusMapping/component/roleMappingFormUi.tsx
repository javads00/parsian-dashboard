import {
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

import type { RoleStatusMappingFormProps } from '@/lib/schema'

import type { TOrderStatus, TRoleClient } from '@/typescript'

import type { TFormUi } from '@/typescript/form'

import { useMemo } from 'react'

type StatusOption = { id: string; label: string }

type RoleStatusMappingFormUiProps = TFormUi<RoleStatusMappingFormProps> & {
  roles: TRoleClient[]
  orderStatuses: TOrderStatus[]
  isLoadingRoles?: boolean
  isLoadingOrderStatuses?: boolean
  statusItemLabels?: Record<string, string>
}

export default function RoleMappingFormUi({
  form,
  onSubmit,
  onCancel,
  isPending,
  submitLabel = 'Create Role Status Mapping',
  roles,
  orderStatuses,
  isLoadingRoles,
  isLoadingOrderStatuses,
  statusItemLabels,
}: RoleStatusMappingFormUiProps) {
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
      <div className="col-span-2">
        <p className="text-muted-foreground mb-3 text-[11px] font-semibold tracking-widest uppercase">
          Role Status Mapping
        </p>
        <p className="text-muted-foreground text-sm">
          Map original order statuses to a single visible status for a role.
        </p>
      </div>

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

      <FormController name="visibleAs" label="Visible As">
        {({ field, fieldState }) => (
          <Select
            value={field.value ?? ''}
            onValueChange={field.onChange}
            disabled={isLoadingOrderStatuses}
          >
            <SelectTrigger
              aria-invalid={fieldState.invalid}
              className="focus:ring-ring/20 w-full transition-shadow focus:ring-[3px]"
            >
              <SelectValue
                placeholder={isLoadingOrderStatuses ? 'Loading statuses…' : 'Select visible as'}
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

      <FormController name="originals" label="Original Statuses" className="col-span-2">
        {({ field, fieldState }) => {
          const selectedValues: string[] = field.value ?? []

          return (
            <MultiSelect
              value={selectedValues}
              onValueChange={field.onChange}
              disabled={isLoadingOrderStatuses}
              itemLabels={statusLabelById}
            >
              <MultiSelectTrigger aria-invalid={fieldState.invalid} className="w-full">
                {selectedValues.length > 0 ? (
                  selectedValues.map((val) => (
                    <MultiSelectChip key={val} value={val}>
                      {statusLabelById[val] ?? val}
                    </MultiSelectChip>
                  ))
                ) : (
                  <MultiSelectValue placeholder="Select original statuses" />
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
