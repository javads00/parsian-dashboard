import type { ReactNode } from 'react'

export type PermissionRole = 'admin' | 'editor' | 'owner'

export type PermissionProps = {
  allowedRoles?: PermissionRole[]
  fallback?: ReactNode
  children: ReactNode
} & {
  [key in PermissionRole]?: boolean
}
