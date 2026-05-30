import { z } from 'zod'

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

export type RoleFormValues = z.infer<typeof roleFormSchema>
