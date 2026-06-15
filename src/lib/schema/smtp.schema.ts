import { z } from 'zod'

export const SmtpFormSchema = z
  .object({
    host: z.string().trim().min(1, 'Host is required'),
    type: z.enum(['OAuth2', 'SMTP']),
    OAUTH_Client_Secret: z.string(),
    OAUTH_Client_ID: z.string(),
    email: z.string().trim().email('A valid email is required'),
    password: z.string(),
    port: z.coerce.number().int().positive('Port must be a positive number'),
    isServerEmail: z.boolean(),
    isDeleted: z.boolean(),
    refresh_Token: z.string(),
    access_Token: z.string(),
    expiry_date: z.coerce.number().nonnegative(),
  })
  .superRefine((values, ctx) => {
    if (values.type === 'OAuth2') {
      if (!values.OAUTH_Client_Secret.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['OAUTH_Client_Secret'],
          message: 'OAuth client secret is required',
        })
      }
      if (!values.OAUTH_Client_ID.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['OAUTH_Client_ID'],
          message: 'OAuth client ID is required',
        })
      }
      return
    }

    if (!values.password.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['password'],
        message: 'Password is required',
      })
    }
  })

export type SmtpFormValues = z.infer<typeof SmtpFormSchema>
