import type { AuthorizedUser } from '@/typescript'
import { Button, Field, FieldError, FieldGroup, FieldLabel, Input, PasswordInput } from '@/components'
import { type LoginFormProps } from '@/lib'
import { Controller, type UseFormReturn } from 'react-hook-form'

export default function LoginFormUi({
  form,
  onSubmit,
  isPending,
  user,
}: {
  form: UseFormReturn<LoginFormProps>
  onSubmit: (data: LoginFormProps) => void
  isPending: boolean
  user: AuthorizedUser | null
}) {
  return (
    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="p-6">
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
                placeholder="Enter your username"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                  Forgot your password?
                </a>
              </div>
              <PasswordInput
                {...field}
                id="password"
                aria-invalid={fieldState.invalid}
                placeholder="Enter your password"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field>
          <Button type="submit" disabled={isPending} loading={isPending}>
            {user ? 'You are logged in' : 'Login'}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
