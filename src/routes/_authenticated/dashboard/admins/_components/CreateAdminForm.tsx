import { Button, Field, FieldError, FieldGroup, FieldLabel, Input } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const createAdminSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    username: z.string().min(5, 'Username must be at least 5 characters'),
    phone: z.string().min(10, 'Phone number must be at least 10 characters'),
    roleId: z.string().min(1, 'Please select a role')
})

export type CreateAdminFormData = z.infer<typeof createAdminSchema>

interface CreateAdminFormProps {
    onSubmit: (data: CreateAdminFormData) => void
    onCancel: () => void
    isPending?: boolean
}

export function CreateAdminForm({ onSubmit, onCancel, isPending }: CreateAdminFormProps) {
    const form = useForm<CreateAdminFormData>({
        resolver: zodResolver(createAdminSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            phone: '',
            roleId: '',
        },
    })

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-full flex-col">
            <div className="flex-1 overflow-y-auto p-4">
                <FieldGroup className="space-y-4">
                    <Controller
                        name="firstName"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                                <Input
                                    {...field}
                                    id="firstName"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter first name"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name="lastName"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                                <Input
                                    {...field}
                                    id="lastName"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter last name"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    {...field}
                                    id="email"
                                    type="email"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter email address"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name="username"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="username">Username</FieldLabel>
                                <Input
                                    {...field}
                                    id="username"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter username"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name="phone"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="phone">Phone</FieldLabel>
                                <Input
                                    {...field}
                                    id="phone"
                                    type="tel"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter phone number"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name="roleId"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="roleId">Role</FieldLabel>
                                <select
                                    {...field}
                                    id="roleId"
                                    aria-invalid={fieldState.invalid}
                                    className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-8 w-full rounded-lg border px-2.5 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="">Select a role</option>
                                    {/* TODO: Fetch roles from API */}
                                    <option value="1">Admin</option>
                                    <option value="2">Editor</option>
                                    <option value="3">Viewer</option>
                                </select>
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </FieldGroup>
            </div>

            <div className="border-t p-4">
                <div className="flex gap-2">
                    <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isPending} loading={isPending} className="flex-1">
                        Create Admin
                    </Button>
                </div>
            </div>
        </form>
    )
}
