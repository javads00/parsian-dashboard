import { useAuthStore } from '@/features'

type Role = 'admin' | 'editor' | 'owner'

type PermissionProps = {
  allowedRoles?: Role[]
  fallback?: React.ReactNode
  children: React.ReactNode
} & {
  [key in Role]?: boolean
}

export default function Permission({
  allowedRoles,
  children,
  fallback = null,
  ...roles
}: PermissionProps) {
  const { user } = useAuthStore()
  const role = user?.roleId?.name?.toLowerCase() as Role | undefined

  const activeRoles: Role[] =
    allowedRoles ?? (Object.keys(roles).filter((k) => roles[k as keyof typeof roles]) as Role[])

  const hasPermission = !!role && activeRoles.includes(role)

  return hasPermission ? children : fallback
}
