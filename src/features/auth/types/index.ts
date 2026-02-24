import type { LoginFormProps } from '@/lib'
import type { ApiResponse } from '@/lib/services/type'

export type CountryId = {
  _id: string
  name: string
  isDeleted: boolean
  deletedBy: string | null
  createdAt: string
  updatedAt: string
  __v: number
}

export type ParentId = {
  id: string
  _id: string
  bankAccountType: string
  UCUserId: string | null
  appliedAgent: string | null
  hideCommission: boolean
}


export const EnumResourceType = {
  Users: 'Users' as const,
  Roles: 'Roles' as const,
  Permissions: 'Permissions' as const,
  Orders: 'Orders' as const,
} as const


export type Permission = {
  resource: typeof EnumResourceType[keyof typeof EnumResourceType]
  page: {
    canView: boolean
  },
  components: {
    table: {
      canView: boolean,
      columns: string[]
    },
    filters: {
      canView: boolean,
      items: string[]
    }
  },
  actions: {
    canCreate: boolean,
    canEdit: boolean,
    canDelete: boolean,
    canRead: boolean,
  }
}

export type RoleID = {
  id: string
  name: string
  fullAccess: boolean
  permissions: Permission[]
}

export type AuthorizedUser = {
  id: string
  firstName: string
  lastName: string
  email: string
  username: string
  mobile: string
  roleId: RoleID
  accessToken: string
}

export type AuthStore = {
  user: AuthorizedUser | null
  authorized: boolean
  isSigningOut: boolean
  signIn: (data: LoginFormProps & { recaptchaToken?: string }) => Promise<ApiResponse<AuthorizedUser>>
  signOut: () => Promise<void>
}
