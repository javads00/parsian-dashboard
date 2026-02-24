import { createContext, useContext } from 'react'
import { Controller, type FieldValues, type FieldError, type UseFormReturn } from 'react-hook-form'
import { Button } from '../button'
import type { FormWrapperProps, FormControllerProps } from '@/typescript/form'


const FormContext = createContext<UseFormReturn<any> | null>(null)

function useFormContext<T extends FieldValues>() {
    const ctx = useContext(FormContext)
    if (!ctx) throw new Error('FormController must be used within FormWrapper')
    return ctx as UseFormReturn<T>
}


function ErrorMessage({ error }: { error?: FieldError }) {
    if (!error?.message) return null
    return (
        <p className="text-destructive flex items-center gap-1 text-xs">
            <span>⚠</span>
            {error.message}
        </p>
    )
}


export function FormController<T extends FieldValues>({
    name,
    label,
    className,
    children,
}: Omit<FormControllerProps<T>, 'form'>) {
    const form = useFormContext<T>()

    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field, fieldState }) => (
                <div
                    className={`flex flex-col gap-1.5 ${className ?? ''}`}
                    data-invalid={fieldState.invalid}
                >
                    {label && (
                        <label
                            htmlFor={String(name)}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {label}
                        </label>
                    )}

                    {children({ field: { ...field, id: String(name) }, fieldState })}

                    <ErrorMessage error={fieldState.error} />
                </div>
            )}
        />
    )
}


export function FormWrapper<T extends FieldValues>({
    form,
    onSubmit,
    onCancel,
    isPending,
    submitLabel = 'Submit',
    cancelLabel = 'Cancel',
    children,
    twoColumns = false,
}: FormWrapperProps<T>) {
    return (
        <FormContext.Provider value={form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-full flex-col">
                <div className="flex-1 overflow-y-auto p-4">
                    <div className={`grid gap-4 ${twoColumns ? 'grid-cols-2' : 'grid-cols-1'}`}>
                        {children}
                    </div>
                </div>

                <div className="border-t bg-background p-4">
                    <div className="flex gap-2">
                        {onCancel && (
                            <Button
                                variant="outline"
                                onClick={onCancel}
                                disabled={isPending}
                                className="border-input bg-background hover:bg-accent hover:text-accent-foreground flex-1 rounded-lg border px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {cancelLabel}
                            </Button>
                        )}
                        <Button
                            type="submit"
                            variant="default"
                            disabled={isPending}
                            loading={isPending}
                            className="bg-primary text-primary-foreground hover:bg-primary/90 flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isPending && (
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            )}
                            {isPending ? 'Loading...' : submitLabel}
                        </Button>
                    </div>
                </div>
            </form>
        </FormContext.Provider>
    )
}