import { CheckIcon, ChevronDownIcon, XIcon } from 'lucide-react'
import * as React from 'react'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

type MultiSelectContextValue = {
  value: string[]
  toggleValue: (itemValue: string) => void
  removeValue: (itemValue: string) => void
  disabled?: boolean
  registerItem: (itemValue: string, label: React.ReactNode) => void
  unregisterItem: (itemValue: string) => void
  getItemLabel: (itemValue: string) => React.ReactNode | undefined
}

const MultiSelectContext = React.createContext<MultiSelectContextValue | null>(null)

function useMultiSelectContext() {
  const context = React.useContext(MultiSelectContext)
  if (!context) {
    throw new Error('MultiSelect components must be used within <MultiSelect>')
  }
  return context
}

type MultiSelectProps = {
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  disabled?: boolean
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** Pre-register labels for values (e.g. edit mode before options load) */
  itemLabels?: Record<string, React.ReactNode>
  children: React.ReactNode
}

function MultiSelect({
  value,
  defaultValue,
  onValueChange,
  disabled,
  open: openProp,
  defaultOpen,
  onOpenChange,
  itemLabels,
  children,
}: MultiSelectProps) {
  const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue ?? [])
  const [open, setOpen] = React.useState(defaultOpen ?? false)
  const [itemsVersion, setItemsVersion] = React.useState(0)
  const itemsRef = React.useRef<Map<string, React.ReactNode>>(new Map())
  const persistentLabelsRef = React.useRef<Map<string, React.ReactNode>>(new Map())

  React.useEffect(() => {
    if (!itemLabels) return
    Object.entries(itemLabels).forEach(([id, label]) => {
      persistentLabelsRef.current.set(id, label)
      itemsRef.current.set(id, label)
    })
    setItemsVersion((v) => v + 1)
  }, [itemLabels])

  const isValueControlled = value !== undefined
  const isOpenControlled = openProp !== undefined
  const currentValue = isValueControlled ? value : internalValue
  const currentOpen = isOpenControlled ? openProp : open

  const setValue = React.useCallback(
    (nextValue: string[]) => {
      if (!isValueControlled) setInternalValue(nextValue)
      onValueChange?.(nextValue)
    },
    [isValueControlled, onValueChange]
  )

  const setOpenState = React.useCallback(
    (nextOpen: boolean) => {
      if (!isOpenControlled) setOpen(nextOpen)
      onOpenChange?.(nextOpen)
    },
    [isOpenControlled, onOpenChange]
  )

  const toggleValue = React.useCallback(
    (itemValue: string) => {
      setValue(
        currentValue.includes(itemValue)
          ? currentValue.filter((v) => v !== itemValue)
          : [...currentValue, itemValue]
      )
    },
    [currentValue, setValue]
  )

  const removeValue = React.useCallback(
    (itemValue: string) => {
      setValue(currentValue.filter((v) => v !== itemValue))
    },
    [currentValue, setValue]
  )

  const registerItem = React.useCallback((itemValue: string, label: React.ReactNode) => {
    itemsRef.current.set(itemValue, label)
    setItemsVersion((v) => v + 1)
  }, [])

  const unregisterItem = React.useCallback((itemValue: string) => {
    if (persistentLabelsRef.current.has(itemValue)) return
    itemsRef.current.delete(itemValue)
    setItemsVersion((v) => v + 1)
  }, [])

  const getItemLabel = React.useCallback(
    (itemValue: string) =>
      itemsRef.current.get(itemValue) ?? persistentLabelsRef.current.get(itemValue),
    []
  )

  const contextValue = React.useMemo<MultiSelectContextValue>(
    () => ({
      value: currentValue,
      toggleValue,
      removeValue,
      disabled,
      registerItem,
      unregisterItem,
      getItemLabel,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      currentValue,
      toggleValue,
      removeValue,
      disabled,
      registerItem,
      unregisterItem,
      getItemLabel,
      itemsVersion,
    ]
  )

  return (
    <MultiSelectContext.Provider value={contextValue}>
      <Popover open={currentOpen} onOpenChange={setOpenState} modal={false}>
        {children}
      </Popover>
    </MultiSelectContext.Provider>
  )
}

// ─── Trigger ────────────────────────────────────────────────────────────────

function MultiSelectTrigger({
  className,
  size = 'default',
  children,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof PopoverTrigger> & {
  size?: 'sm' | 'default'
  variant?: 'default' | 'ghost'
}) {
  const { disabled } = useMultiSelectContext()

  return (
    <PopoverTrigger
      data-slot="multi-select-trigger"
      data-size={size}
      disabled={disabled}
      className={cn(
        // base layout
        'flex min-h-9 w-full items-center justify-between gap-2 rounded-md border px-3 py-1.5 text-sm',
        // colours & transitions
        'bg-transparent transition-[color,box-shadow,border-color] outline-none',
        // border
        variant === 'ghost' ? 'border-transparent' : 'border-input',
        // shadow & states
        'shadow-xs',
        'hover:border-ring/50',
        'focus-visible:border-ring focus-visible:ring-ring/20 focus-visible:ring-[3px]',
        'data-[state=open]:border-ring data-[state=open]:ring-ring/20 data-[state=open]:ring-[3px]',
        // invalid
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/30',
        // disabled
        'disabled:cursor-not-allowed disabled:opacity-50',
        // dark
        'dark:bg-input/30 dark:hover:bg-input/40',
        // size variants
        'data-[size=default]:min-h-9 data-[size=sm]:min-h-8 data-[size=sm]:text-xs',
        // svg
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "[&_svg:not([class*='text-'])]:text-muted-foreground",
        className
      )}
      {...props}
    >
      <span className="flex min-w-0 flex-1 flex-wrap items-center gap-1">{children}</span>
      <ChevronDownIcon
        className={cn(
          'text-muted-foreground size-4 shrink-0 opacity-60 transition-transform duration-150',
          'group-data-[state=open]:rotate-180'
        )}
      />
    </PopoverTrigger>
  )
}

// ─── Value (placeholder + chips summary) ────────────────────────────────────

function MultiSelectValue({
  placeholder,
  className,
  maxDisplay = 2,
}: {
  placeholder?: string
  className?: string
  maxDisplay?: number
}) {
  const { value, getItemLabel } = useMultiSelectContext()

  if (value.length === 0) {
    return (
      <span data-slot="multi-select-value" className={cn('text-muted-foreground', className)}>
        {placeholder}
      </span>
    )
  }

  const labels = value.map((v) => getItemLabel(v) ?? v)
  const visible = labels.slice(0, maxDisplay)
  const remaining = labels.length - maxDisplay

  return (
    <span
      data-slot="multi-select-value"
      className={cn('flex min-w-0 flex-wrap items-center gap-1', className)}
    >
      {visible.map((label, index) => (
        <span
          key={`${value[index]}-${index}`}
          className={cn(
            'inline-flex max-w-[10rem] items-center gap-0.5 rounded',
            'border-border/40 bg-muted border px-1.5 py-0.5',
            'text-foreground text-xs font-medium'
          )}
        >
          <span className="truncate">{label}</span>
        </span>
      ))}
      {remaining > 0 && <span className="text-muted-foreground text-xs">+{remaining} more</span>}
    </span>
  )
}

// ─── Viewport (scrollable list wrapper) ─────────────────────────────────────

function MultiSelectViewport({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="multi-select-viewport"
      className={cn('max-h-60 overflow-x-hidden overflow-y-auto overscroll-contain p-1', className)}
      onWheel={(e) => {
        if (e.currentTarget.scrollHeight > e.currentTarget.clientHeight) e.stopPropagation()
      }}
      onTouchMove={(e) => e.stopPropagation()}
      {...props}
    >
      {children}
    </div>
  )
}

// ─── Content (popover panel) ─────────────────────────────────────────────────

function MultiSelectContent({
  className,
  align = 'start',
  sideOffset = 4,
  children,
  ...props
}: React.ComponentProps<typeof PopoverContent>) {
  return (
    <PopoverContent
      data-slot="multi-select-content"
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-[100] w-[var(--radix-popover-trigger-width)] p-0 outline-hidden',
        'border-border/60 bg-popover text-popover-foreground rounded-md border shadow-md',
        'origin-(--radix-popover-content-transform-origin)',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',
        'data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2',
        'overflow-hidden',
        className
      )}
      {...props}
    >
      <MultiSelectViewport>{children}</MultiSelectViewport>
    </PopoverContent>
  )
}

// ─── Group / Label ───────────────────────────────────────────────────────────

function MultiSelectGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="multi-select-group" className={cn(className)} {...props} />
}

function MultiSelectLabel({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="multi-select-label"
      className={cn('text-muted-foreground px-2 py-1.5 text-xs font-medium', className)}
      {...props}
    />
  )
}

// ─── Item ────────────────────────────────────────────────────────────────────

function MultiSelectItem({
  className,
  children,
  value,
  disabled: itemDisabled,
  ...props
}: React.ComponentProps<'div'> & {
  value: string
  disabled?: boolean
}) {
  const { value: selectedValues, toggleValue, disabled, registerItem } = useMultiSelectContext()
  const isSelected = selectedValues.includes(value)
  const isDisabled = disabled || itemDisabled

  React.useEffect(() => {
    registerItem(value, children)
  }, [value, children, registerItem])

  return (
    <div
      data-slot="multi-select-item"
      role="option"
      aria-selected={isSelected}
      data-disabled={isDisabled ? '' : undefined}
      className={cn(
        'relative flex w-full items-center gap-2 select-none',
        'rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden',
        'transition-colors duration-100',
        isDisabled
          ? 'pointer-events-none cursor-default opacity-50'
          : 'hover:bg-accent hover:text-accent-foreground cursor-pointer',
        isSelected && 'text-foreground',
        "[&_svg:not([class*='text-'])]:text-muted-foreground",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      onClick={() => {
        if (!isDisabled) toggleValue(value)
      }}
      onKeyDown={(e) => {
        if (isDisabled) return
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          toggleValue(value)
        }
      }}
      tabIndex={isDisabled ? -1 : 0}
      {...props}
    >
      {/* check indicator — right side */}
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        {isSelected && <CheckIcon className="text-foreground size-3.5" />}
      </span>
      <span className="flex items-center gap-2">{children}</span>
    </div>
  )
}

// ─── Separator ───────────────────────────────────────────────────────────────

function MultiSelectSeparator({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="multi-select-separator"
      className={cn('bg-border/60 pointer-events-none -mx-1 my-1 h-px', className)}
      {...props}
    />
  )
}

// ─── Chip (removable tag used outside the trigger) ───────────────────────────

function MultiSelectChip({
  value,
  className,
  children,
}: {
  value: string
  className?: string
  children?: React.ReactNode
}) {
  const { getItemLabel, removeValue, disabled } = useMultiSelectContext()
  const label = children ?? getItemLabel(value) ?? value

  return (
    <span
      data-slot="multi-select-chip"
      className={cn(
        'inline-flex max-w-full items-center gap-1 rounded',
        'border-border/40 bg-muted border px-1.5 py-0.5',
        'text-foreground text-xs font-medium',
        className
      )}
    >
      <span className="truncate">{label}</span>
      {!disabled && (
        <button
          type="button"
          className={cn(
            'rounded-sm p-0.5 opacity-50 transition-opacity',
            'hover:bg-background/70 hover:opacity-100'
          )}
          onClick={(e) => {
            e.stopPropagation()
            removeValue(value)
          }}
          aria-label={`Remove ${String(label)}`}
        >
          <XIcon className="size-3" />
        </button>
      )}
    </span>
  )
}

export {
  MultiSelect,
  MultiSelectChip,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectLabel,
  MultiSelectSeparator,
  MultiSelectTrigger,
  MultiSelectValue,
  MultiSelectViewport,
}
