import { z } from 'zod'


export const labelFormSchema = z.object({
  name: z.string().min(2, 'Please enter a valid label name'),
})

export type LabelFormValues = z.infer<typeof labelFormSchema>
