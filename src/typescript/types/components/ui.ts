import type { Button, buttonVariants } from '@/components/ui/forms/button/Button'
import type { fieldVariants } from '@/components/ui/field/Field'
import type { ColumnDef } from '@tanstack/react-table'
import type { VariantProps } from 'class-variance-authority'
import * as LabelPrimitive from '@radix-ui/react-label'
import * as SeparatorPrimitive from '@radix-ui/react-separator'
import type { ToasterProps } from 'sonner'
import type { ComponentProps, ReactNode } from 'react'

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  loading?: boolean
  skeletonRows?: number
  pagination?: ReactNode
  meta?: Record<string, unknown>
  getRowId?: (row: TData) => string
}

export interface TableSkeletonProps {
  columns: number
  rows?: number
}

export type CardProps = ComponentProps<'div'>

export type LabelProps = ComponentProps<typeof LabelPrimitive.Root>

export type SeparatorProps = ComponentProps<typeof SeparatorPrimitive.Root>

export type ToasterPropsExtended = ToasterProps

export interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

export interface FieldProps
  extends ComponentProps<'div'>,
    VariantProps<typeof fieldVariants> {}

export type DateTimeInputProps = {
  value?: number
  onChange: (value: number) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  id?: string
}

export interface PasswordInputProps extends ComponentProps<'input'> {
  className?: string
}

export type MultiSelectContextValue = {
  value: string[]
  toggleValue: (itemValue: string) => void
  removeValue: (itemValue: string) => void
  disabled?: boolean
  registerItem: (itemValue: string, label: ReactNode) => void
  unregisterItem: (itemValue: string) => void
  getItemLabel: (itemValue: string) => ReactNode | undefined
}

export type MultiSelectProps = {
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  disabled?: boolean
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  itemLabels?: Record<string, ReactNode>
  children: ReactNode
}

export type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ComponentProps<typeof Button>, 'size'> &
  ComponentProps<'a'>

export type SidebarContextProps = {
  state: 'expanded' | 'collapsed'
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}
