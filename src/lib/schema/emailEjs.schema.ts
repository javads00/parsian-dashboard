import { z } from 'zod'

export const EmailEjsFormSchema = z.object({
  subject: z.string().trim().min(1, 'Subject is required'),
  EJSName: z.string().trim().min(1, 'EJS name is required'),
  name: z.string().trim().min(1, 'Name is required'),
  emailId: z.string().trim().min(1, 'SMTP account is required'),
  isDeleted: z.boolean(),
})

export type EmailEjsFormValues = z.infer<typeof EmailEjsFormSchema>
