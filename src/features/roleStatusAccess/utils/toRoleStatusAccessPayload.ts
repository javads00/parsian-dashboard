import type { RoleStatusAccessFormProps } from '@/lib/schema'

export type RoleStatusAccessApiPayload = Omit<RoleStatusAccessFormProps, 'fromStatus'> & {
  fromStatus: string | null
}

export function toRoleStatusAccessPayload(
  data: RoleStatusAccessFormProps
): RoleStatusAccessApiPayload {
  const fromStatus = data.fromStatus?.trim() ? data.fromStatus : null

  return {
    ...data,
    fromStatus,
  }
}
