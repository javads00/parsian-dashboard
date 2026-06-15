import type { AuthorizedUser } from '@/typescript'
import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  PasswordInput,
} from '@/components'
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
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1.5">
              <FieldLabel htmlFor="username" className="text-sm font-medium">
                Username
              </FieldLabel>
              <Input
                {...field}
                id="username"
                aria-invalid={fieldState.invalid}
                placeholder="Enter your username"
                autoComplete="username"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1.5">
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="password" className="text-sm font-medium">
                  Password
                </FieldLabel>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-xs underline-offset-4 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <PasswordInput
                {...field}
                id="password"
                aria-invalid={fieldState.invalid}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field className="pt-1">
          <Button
            type="submit"
            size="default"
            disabled={isPending || !!user}
            loading={isPending}
            className="h-9 w-full font-medium"
          >
            {user ? (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Signed in
              </>
            ) : (
              'Sign in'
            )}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
