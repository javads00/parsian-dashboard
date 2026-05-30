// typescript/form.ts
import type {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormReturn,
} from 'react-hook-form'

export type FormControllerProps<T extends FieldValues> = {
  form?: UseFormReturn<T> // دیگه optional هست
  name: Path<T>
  label?: string
  className?: string
  children: (props: {
    field: ControllerRenderProps<T, Path<T>> & { id: string }
    fieldState: ControllerFieldState
  }) => React.ReactNode
}

export type FormWrapperProps<T extends FieldValues> = {
  form: UseFormReturn<T>
  onSubmit: (data: T) => void
  onCancel?: () => void
  isPending?: boolean
  submitLabel?: string
  cancelLabel?: string
  children: React.ReactNode
  twoColumns?: boolean
}

export type TFormContainerProps<T extends FieldValues> = {
  onCancel: () => void
  onSubmit?: (data: T) => void | Promise<void>
  isPending?: boolean
  submitLabel?: string
  defaultValues?: Partial<T>
  onSuccess?: () => void
  editId?: string
}

export type TFormUi<T extends FieldValues> = {
  form: UseFormReturn<T>
  onSubmit: (data: T) => void
  onCancel: () => void
  isPending: boolean
  submitLabel?: string
  defaultValues?: Partial<T>
  onSuccess?: () => void
  editId?: string
}
