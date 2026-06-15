import { Input } from '@/components'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdownMenu/DropdownMenu'
import { FormController, FormWrapper } from '@/components/ui/forms/formWrapper'
import { cn } from '@/lib/utils'
import { type RoleFormValues } from '@/lib'
import {
  buildPermissionFromOption,
  getAvailableAddPermissionOptions,
  getPermissionLabel,
  permissionHasSubMenus,
  type AddPermissionOption,
} from '../config/permissionGroups'
import type { Resource } from '@/typescript/role.types'
import { type UseFormReturn, useFieldArray, useWatch } from 'react-hook-form'
import { ChevronDown, Mail, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/forms/button'
import { useMemo, useState } from 'react'

const ACTION_KEYS = ['canCreate', 'canEdit', 'canDelete', 'canRead'] as const

const isFullAccessEnabled = (value: unknown) => value === true || value === 1 || value === 'true'

const emptyPermission = (resource: Resource = 'Admin'): RoleFormValues['permissions'][0] => ({
  resource,
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
  subMenus: [],
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

  const existingResources = useMemo(
    () =>
      new Set(
        permissions
          .filter((permission): permission is RoleFormValues['permissions'][number] =>
            Boolean(permission?.resource)
          )
          .map((permission) => permission.resource)
      ),
    [permissions]
  )

  const availableOptions = useMemo(
    () => getAvailableAddPermissionOptions(existingResources),
    [existingResources]
  )

  const handleAddPermission = (option: AddPermissionOption) => {
    const permission = buildPermissionFromOption(option)
    append({
      ...permission,
      subMenus: permission.subMenus ?? [],
    })
  }

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

      <div className="col-span-2 mt-4 max-h-[55vh] space-y-4 overflow-y-auto pr-1">
        <div className="bg-background sticky top-0 z-10 flex items-center justify-between py-1">
          <p className="text-xs font-bold uppercase">
            Permissions ({fields.length})
          </p>

          <AddPermissionMenu
            disabled={permissionsDisabled || availableOptions.length === 0}
            options={availableOptions}
            onSelect={handleAddPermission}
          />
        </div>

        {fields.length === 0 ? (
          <div className="text-muted-foreground rounded border p-6 text-center text-sm">
            No permissions added yet. Use Add to select a resource.
          </div>
        ) : null}

        {fields.map((field, index) => {
          const permission =
            permissions[index] ?? form.getValues(`permissions.${index}` as const)

          if (!permission?.resource) {
            return null
          }

          if (permissionHasSubMenus(permission)) {
            return (
              <PermissionGroupBlock
                key={field.id}
                groupLabel={getPermissionLabel(permission.resource)}
                permissionIndex={index}
                permission={permission}
                disabled={permissionsDisabled}
                onRemove={() => remove(index)}
              />
            )
          }

          return (
            <PermissionBlock
              key={field.id}
              index={index}
              label={getPermissionLabel(permission.resource)}
              form={form}
              permission={permission}
              disabled={permissionsDisabled}
              onRemove={() => remove(index)}
            />
          )
        })}
      </div>
    </FormWrapper>
  )
}

function AddPermissionMenu({
  disabled,
  options,
  onSelect,
}: {
  disabled?: boolean
  options: AddPermissionOption[]
  onSelect: (option: AddPermissionOption) => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" size="sm" variant="outline" disabled={disabled}>
          <Plus className="mr-1 h-3 w-3" />
          Add
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="max-h-72 w-56 overflow-y-auto">
        {options.map((option) => (
          <DropdownMenuItem key={option.resource} onClick={() => onSelect(option)}>
            <div className="flex w-full flex-col">
              <span>{option.label}</span>
              {option.hasSubMenus ? (
                <span className="text-muted-foreground text-xs">Includes sub menus</span>
              ) : null}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function PermissionGroupBlock({
  groupLabel,
  permissionIndex,
  permission,
  disabled,
  onRemove,
}: {
  groupLabel: string
  permissionIndex: number
  permission: RoleFormValues['permissions'][number]
  disabled?: boolean
  onRemove: () => void
}) {
  const [isOpen, setIsOpen] = useState(true)
  const isDisabled = !!disabled
  const canView = permission?.page?.canView ?? false

  return (
    <div className="overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <button
          type="button"
          className="flex min-w-0 flex-1 items-center justify-between gap-3 text-left transition-colors hover:opacity-80"
          onClick={() => setIsOpen((prev) => !prev)}
          disabled={isDisabled}
        >
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Mail className="size-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{groupLabel}</p>
              <p className="text-xs text-gray-500">
                {permission?.subMenus?.length ?? 0} sub menus inside this group
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={cn(
                'rounded-full px-2 py-0.5 text-[11px] font-medium',
                canView ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
              )}
            >
              {canView ? 'Can View' : 'Hidden'}
            </span>
            <ChevronDown
              className={cn('size-4 text-gray-400 transition-transform', isOpen && 'rotate-180')}
            />
          </div>
        </button>

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={onRemove}
          className="text-red-500"
          disabled={isDisabled}
        >
          <Trash2 className="size-4" />
        </Button>
      </div>

      {isOpen && (
        <div className="space-y-3 border-t border-gray-100 p-4">
          <FormController name={`permissions.${permissionIndex}.page.canView`} label="Page Access">
            {({ field }) => (
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={field.value ?? false}
                  onChange={(e) => field.onChange(e.target.checked)}
                  disabled={isDisabled}
                />
                Allow page view
              </label>
            )}
          </FormController>

          <div className="grid gap-3">
            {(permission?.subMenus ?? []).map((subMenu, subIndex) => (
              <SubMenuPermissionCard
                key={subMenu.key}
                permissionIndex={permissionIndex}
                subIndex={subIndex}
                subMenu={subMenu}
                disabled={isDisabled}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function SubMenuPermissionCard({
  permissionIndex,
  subIndex,
  subMenu,
  disabled,
}: {
  permissionIndex: number
  subIndex: number
  subMenu: NonNullable<RoleFormValues['permissions'][number]['subMenus']>[number]
  disabled?: boolean
}) {
  const isDisabled = !!disabled
  const canView = subMenu.page?.canView ?? false
  const basePath = `permissions.${permissionIndex}.subMenus.${subIndex}` as const

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50/60 p-3">
      <div className="mb-3 flex items-center gap-2">
        <span className={cn('size-2 rounded-full', canView ? 'bg-green-500' : 'bg-gray-300')} />
        <p className="text-sm font-semibold text-gray-900">{subMenu.label}</p>
      </div>

      <FormController name={`${basePath}.page.canView`}>
        {({ field }) => (
          <label className="mb-3 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={field.value ?? false}
              onChange={(e) => field.onChange(e.target.checked)}
              disabled={isDisabled}
            />
            Allow page view
          </label>
        )}
      </FormController>

      <div className="space-y-2">
        <p className="text-xs font-bold text-gray-600">Actions</p>
        <div className="grid grid-cols-2 gap-2">
          {ACTION_KEYS.map((key) => (
            <FormController key={key} name={`${basePath}.actions.${key}`}>
              {({ field }) => (
                <label className="flex items-center gap-2 rounded-md border border-white bg-white px-2 py-1.5 text-sm">
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

function PermissionBlock({
  index,
  label,
  disabled,
  onRemove,
}: {
  index: number
  label: string
  form: UseFormReturn<RoleFormValues>
  permission: RoleFormValues['permissions'][number]
  disabled?: boolean
  onRemove: () => void
}) {
  const isDisabled = !!disabled

  return (
    <div className="bg-muted/20 space-y-4 rounded border p-4">
      <div className="flex items-center justify-between border-b pb-2">
        <span className="text-sm font-semibold text-gray-900">{label}</span>

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

      <FormController name={`permissions.${index}.page.canView`} label="Page Access">
        {({ field }) => (
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={field.value ?? false}
              onChange={(e) => field.onChange(e.target.checked)}
              disabled={isDisabled}
            />
            Allow page view
          </label>
        )}
      </FormController>

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
