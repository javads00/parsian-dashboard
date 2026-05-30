import type { LoginFormProps } from '@/lib'
import type { ApiResponse } from '@/lib/services/type'
import type { TPermission } from './role'
import { EnumResourceType, type TResource } from '@/data'

export const KEY_TO_RESOURCE: Record<string, TResource> = {
  Admin: EnumResourceType.Admin,
  Role: EnumResourceType.Role,
  Dashboard: EnumResourceType.Dashboard,
}

export type TRoleID = {
  id: string
  name: string
  fullAccess: boolean
  permissions: TPermission[]
}

export type AuthorizedUser = {
  id: string
  firstName: string
  lastName: string
  email: string
  username: string
  mobile: string | null
  roleId: TRoleID
  accessToken: string
}

export type TAuthStore = {
  user: AuthorizedUser | null
  authorized: boolean
  isSigningOut: boolean
  signIn: (
    data: LoginFormProps & { recaptchaToken?: string }
  ) => Promise<ApiResponse<AuthorizedUser>>
  signOut: () => Promise<void>
}
