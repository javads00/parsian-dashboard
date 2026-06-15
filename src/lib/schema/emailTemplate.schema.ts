import { z } from 'zod'

export const EmailTemplateFormSchema = z.object({
  subject: z.string().trim().min(1, 'Subject is required'),
  emailId: z.string().trim().min(1, 'SMTP account is required'),
  emailStaticId: z.string().trim().min(1, 'Static email template is required'),
  discretion: z.string().trim().min(1, 'Description is required'),
  firstParagraph: z.string(),
  secondParagraph: z.string(),
  thirdParagraph: z.string(),
  isDeleted: z.boolean(),
  deletedBy: z.string().nullable(),
})

export type EmailTemplateFormValues = z.infer<typeof EmailTemplateFormSchema>
