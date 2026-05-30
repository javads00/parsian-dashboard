import { z } from 'zod'

export const orderStatusSchema = z.object({
  name: z.string().min(2, 'Please enter a valid order status name'),
  label: z.string().min(2, 'Please enter a valid order status label'),
  description: z.string().min(2, 'Please enter a valid order status description'),
  isPad: z.boolean(),
})

export type OrderStatusFormValues = z.infer<typeof orderStatusSchema>
