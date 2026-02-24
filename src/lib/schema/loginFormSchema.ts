import * as z from 'zod'

export const loginFormSchema = z.object({
  username: z.string().min(5, 'Username must be at least 5 characters'),
  password: z.string().min(6, 'Password must be at least 8 characters'),
})

export type LoginFormProps = z.infer<typeof loginFormSchema>
