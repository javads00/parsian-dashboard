import { z } from 'zod'

export const roleStatusAccessFormSchema = z
  .object({
    roleId: z.string().min(1, 'Please select a role'),
    fullAccess: z.boolean().default(false),
    fromStatus: z.string().default(''),
    statusId: z.array(z.string()).default([]),
  })
  .superRefine((data, ctx) => {
    if (data.fullAccess) return

    if (!data.fromStatus) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please select a from status',
        path: ['fromStatus'],
      })
    }

    if (data.statusId.length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please select at least one allowed status',
        path: ['statusId'],
      })
    }
  })

export const roleStatusAccessSchema = z
  .object({
    roleId: z.string().min(1, 'Please select a role'),
    fullAccess: z.boolean().optional().default(false),
    fromStatus: z.string().optional(),
    statusId: z.array(z.string()).optional().default([]),
  })
  .refine((data) => data.fullAccess || Boolean(data.fromStatus?.trim()), {
    path: ['fromStatus'],
    message: 'Please select a from status',
  })
  .refine((data) => data.fullAccess || (Array.isArray(data.statusId) && data.statusId.length > 0), {
    path: ['statusId'],
    message: 'Please select at least one allowed status',
  })

const columnSchema = z.object({
  key: z.string().min(1, 'Column key is required'),
  canSort: z.boolean(),
})

const filterItemSchema = z.object({
  key: z.string().min(1, 'Filter key is required'),
  canUse: z.boolean(),
})

const permissionSchema = z.object({
  resource: z.enum(['Admin', 'Role']),
  page: z.object({
    canView: z.boolean(),
  }),
  components: z.object({
    table: z.object({
      canView: z.boolean(),
      columns: z.array(columnSchema),
    }),
    filters: z.object({
      canView: z.boolean(),
      items: z.array(filterItemSchema),
    }),
  }),
  actions: z.object({
    canCreate: z.boolean(),
    canEdit: z.boolean(),
    canDelete: z.boolean(),
    canRead: z.boolean(),
  }),
})

export const roleFormSchema = z.object({
  name: z.string().min(2, 'Please enter a valid role name'),
  fullAccess: z.boolean(),
  permissions: z.array(permissionSchema),
})

export const roleStatusMappingFormSchema = z.object({
  roleId: z.string().min(1, 'Please select a role'),
  visibleAs: z.string().min(1, 'Please select a visible as'),
  originals: z.array(z.string()).min(1, 'Please select at least one original'),
})



  

export type RoleStatusMappingFormProps = z.infer<typeof roleStatusMappingFormSchema>

export type RoleFormValues = z.infer<typeof roleFormSchema>

export type RoleStatusAccessSchema = z.infer<typeof roleStatusAccessSchema>

export type RoleStatusAccessFormProps = z.infer<typeof roleStatusAccessFormSchema>
