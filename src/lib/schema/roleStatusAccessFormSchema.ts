import { z } from 'zod'

export const roleStatusAccessFormSchema = z.object({
  roleId: z.string().min(1, 'Please select a role'),
  fullAccess: z.boolean().optional().default(false),
  fromStatus: z.string().optional(),
  toStatus: z.array(z.string()).optional().default([]),
}).refine((data) => data.fullAccess || Boolean(data.fromStatus?.trim()), {
  path: ['fromStatus'],
  message: 'Please select a from status',
}).refine((data) => data.fullAccess || (Array.isArray(data.toStatus) && data.toStatus.length > 0), {
  path: ['toStatus'],
  message: 'Please select at least one target status',
})

export type RoleStatusAccessFormProps = z.infer<typeof roleStatusAccessFormSchema>
