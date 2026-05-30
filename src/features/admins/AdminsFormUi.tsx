import { Input, PasswordInput, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components'
import { FormController, FormWrapper } from '@/components/ui/forms/formWrapper'
import { type AdminFormProps } from '@/lib'
import { type UseFormReturn } from 'react-hook-form'
import type { TRole } from '@/typescript'

export default function AdminsFormUi({
    form,
    onSubmit,
    onCancel,
    isPending,
    roles,
    isLoadingRoles,
    showPassword = true,
    submitLabel = 'Create Admin',
}: {
    form: UseFormReturn<AdminFormProps>
    onSubmit: (data: AdminFormProps) => void
    onCancel: () => void
    isPending: boolean
    roles: TRole[]
    isLoadingRoles?: boolean
    showPassword?: boolean
    submitLabel?: string
}) {
    return (
        <div className="flex h-full flex-col bg-background">

            {/* Header */}
            <div className="border-b px-6 py-5">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                        <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold text-foreground">Create Admin</h2>
                        <p className="text-xs text-muted-foreground">Fill in the details to add a new administrator</p>
                    </div>
                </div>
            </div>

            <FormWrapper
                form={form}
                onSubmit={onSubmit}
                onCancel={onCancel}
                isPending={isPending}
                submitLabel={submitLabel}
                twoColumns
            >
                {/* Section: Personal Info */}
                <div className="col-span-2">
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                        Personal Information
                    </p>
                </div>

                <FormController name="firstName" label="First Name">
                    {({ field, fieldState }) => (
                        <Input
                            {...field}
                            value={field.value ?? ''}
                            placeholder="e.g. John"
                            aria-invalid={fieldState.invalid}
                        />
                    )}
                </FormController>

                <FormController name="lastName" label="Last Name">
                    {({ field, fieldState }) => (
                        <Input
                            {...field}
                            value={field.value ?? ''}
                            placeholder="e.g. Doe"
                            aria-invalid={fieldState.invalid}
                        />
                    )}
                </FormController>

                {/* Section: Account Info */}
                <div className="col-span-2 mt-2">
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                        Account Information
                    </p>
                </div>

                <FormController name="email" label="Email Address">
                    {({ field, fieldState }) => (
                        <Input
                            {...field}
                            value={field.value ?? ''}
                            type="email"
                            placeholder="john@example.com"
                            aria-invalid={fieldState.invalid}
                        />
                    )}
                </FormController>

                <FormController name="username" label="Username">
                    {({ field, fieldState }) => (
                        <Input
                            {...field}
                            value={field.value ?? ''}
                            placeholder="e.g. john_doe"
                            aria-invalid={fieldState.invalid}
                        />
                    )}
                </FormController>

                <FormController name="mobile" label="Mobile Number">
                    {({ field, fieldState }) => (
                        <Input
                            {...field}
                            value={field.value ?? ''}
                            placeholder="+1 (555) 000-0000"
                            aria-invalid={fieldState.invalid}
                        />
                    )}
                </FormController>

                {showPassword && (
                    <FormController name="password" label="Password">
                        {({ field, fieldState }) => (
                            <PasswordInput
                                {...field}
                                value={field.value ?? ''}
                                placeholder="Enter password"
                                autoComplete="new-password"
                                aria-invalid={fieldState.invalid}
                            />
                        )}
                    </FormController>
                )}

                <FormController name="roleId" className='col-span-2' label="Role">
                    {({ field, fieldState }) => (
                        <Select
                            value={field.value ?? ''}
                            onValueChange={field.onChange}
                            disabled={isLoadingRoles}
                        >
                            <SelectTrigger
                                aria-invalid={fieldState.invalid}
                                className="w-full"
                            >
                                <SelectValue
                                    placeholder={isLoadingRoles ? 'Loading roles...' : 'Select a role'}
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {roles?.map((role) => (
                                    <SelectItem key={role.id} value={role.id}>
                                        <span className="flex items-center gap-2">
                                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                            {role.name}
                                        </span>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                </FormController>
            </FormWrapper>
        </div>
    )
}