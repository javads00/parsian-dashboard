import { useAuthStore } from '@/features'
import type { PermissionProps, PermissionRole } from '@/typescript/types/components'

export default function Permission({
  allowedRoles,
  children,
  fallback = null,
  ...roles
}: PermissionProps) {
  const { user } = useAuthStore()
  const role = user?.roleId?.name?.toLowerCase() as PermissionRole | undefined

  const activeRoles: PermissionRole[] =
    allowedRoles ?? (Object.keys(roles).filter((k) => roles[k as keyof typeof roles]) as PermissionRole[])

  const hasPermission = !!role && activeRoles.includes(role)

  return hasPermission ? children : fallback
}
