import type { RoleFormValues } from '@/lib'
import type { IconsType } from '@/assets'
import type { Resource, TPermission } from '@/typescript/role.types'

export type PermissionSubMenuConfig = {
  key: string
  label: string
  defaultActions: {
    canCreate: boolean
    canEdit: boolean
    canDelete: boolean
    canRead: boolean
  }
}

export type PermissionGroupConfig = {
  resource: Resource
  groupLabel: string
  icon: IconsType
  subMenus: PermissionSubMenuConfig[]
}

export type AddPermissionOption = {
  resource: Resource
  label: string
  hasSubMenus: boolean
}

export const EMAIL_SETTING_PERMISSION_GROUP: PermissionGroupConfig = {
  resource: 'EmailSetting',
  groupLabel: 'Email Settings',
  icon: 'Mail',
  subMenus: [
    {
      key: 'EmailSMTP',
      label: 'SMTP',
      defaultActions: {
        canCreate: false,
        canEdit: false,
        canDelete: false,
        canRead: false,
      },
    },
    {
      key: 'EmailTemplates',
      label: 'Email Templates',
      defaultActions: {
        canCreate: false,
        canEdit: false,
        canDelete: false,
        canRead: false,
      },
    },
  ],
}

/** Legacy parent resource before grouped permissions used EmailSetting */
const LEGACY_GROUPED_PARENT_RESOURCE = 'EmailSMTP'

const LEGACY_SUB_MENU_KEY_MAP: Record<string, string> = {
  smtp: 'EmailSMTP',
  'email-templates': 'EmailTemplates',
}

export function normalizeGroupedPermissionResources(
  permissions: RoleFormValues['permissions']
): RoleFormValues['permissions'] {
  return permissions.map((permission) => {
    const hasSubMenus = (permission.subMenus?.length ?? 0) > 0
    const normalizedSubMenus = (permission.subMenus ?? []).map((sub) => ({
      ...sub,
      key: LEGACY_SUB_MENU_KEY_MAP[sub.key] ?? sub.key,
    }))

    if (permission.resource === LEGACY_GROUPED_PARENT_RESOURCE && hasSubMenus) {
      return {
        ...permission,
        resource: EMAIL_SETTING_PERMISSION_GROUP.resource,
        subMenus: normalizedSubMenus,
      }
    }

    if (hasSubMenus) {
      return { ...permission, subMenus: normalizedSubMenus }
    }

    return permission
  })
}

export const PERMISSION_GROUP_CONFIG: PermissionGroupConfig[] = [EMAIL_SETTING_PERMISSION_GROUP]

export const FLAT_PERMISSION_RESOURCES = [
  'Admin',
  'Role',
  'Label',
  'OrderStatus',
  'Country',
  'RoleStatusAccess',
  'RoleMapping',
  'Release',
] as const satisfies readonly Resource[]

export const ADD_PERMISSION_OPTIONS: AddPermissionOption[] = [
  ...FLAT_PERMISSION_RESOURCES.map((resource) => ({
    resource,
    label: resource,
    hasSubMenus: false,
  })),
  ...PERMISSION_GROUP_CONFIG.map((group) => ({
    resource: group.resource,
    label: group.groupLabel,
    hasSubMenus: true,
  })),
].sort((a, b) => a.label.localeCompare(b.label))

export function isGroupedPermissionResource(resource: string): boolean {
  return PERMISSION_GROUP_CONFIG.some((group) => group.resource === resource)
}

export function getGroupConfigByResource(resource: string): PermissionGroupConfig | undefined {
  return PERMISSION_GROUP_CONFIG.find((group) => group.resource === resource)
}

export function getPermissionLabel(resource: string): string {
  const option = ADD_PERMISSION_OPTIONS.find((entry) => entry.resource === resource)
  return option?.label ?? resource
}

export function getAvailableAddPermissionOptions(
  existingResources: Set<Resource>
): AddPermissionOption[] {
  return ADD_PERMISSION_OPTIONS.filter((option) => !existingResources.has(option.resource))
}

export function buildPermissionFromGroupConfig(group: PermissionGroupConfig): TPermission {
  return {
    resource: group.resource,
    page: { canView: false },
    actions: {
      canCreate: false,
      canEdit: false,
      canDelete: false,
      canRead: false,
    },
    subMenus: group.subMenus.map((sub) => ({
      key: sub.key,
      label: sub.label,
      page: { canView: false },
      actions: { ...sub.defaultActions },
      components: {
        table: { canView: false, columns: [] },
        filters: { canView: false, items: [] },
      },
    })),
  }
}

export function buildPermissionFromOption(option: AddPermissionOption): TPermission {
  const group = getGroupConfigByResource(option.resource)

  if (group) {
    return buildPermissionFromGroupConfig(group)
  }

  return {
    resource: option.resource,
    page: { canView: false },
    actions: {
      canCreate: false,
      canEdit: false,
      canDelete: false,
      canRead: false,
    },
    subMenus: [],
    components: {
      table: { canView: false, columns: [] },
      filters: { canView: false, items: [] },
    },
  }
}

function buildSubMenuFromConfig(sub: PermissionSubMenuConfig) {
  return {
    key: sub.key,
    label: sub.label,
    page: { canView: false },
    actions: { ...sub.defaultActions },
    components: {
      table: { canView: false, columns: [] },
      filters: { canView: false, items: [] },
    },
  }
}

export function mergePermissionGroups(
  permissions: RoleFormValues['permissions']
): RoleFormValues['permissions'] {
  const merged = normalizeGroupedPermissionResources(
    permissions.map((permission) => ({
      ...permission,
      subMenus: [...(permission.subMenus ?? [])],
    }))
  )

  PERMISSION_GROUP_CONFIG.forEach((group) => {
    const index = merged.findIndex((permission) => permission.resource === group.resource)

    if (index === -1) {
      return
    }

    const permission = merged[index]
    const existingKeys = new Set((permission.subMenus ?? []).map((sub) => sub.key))

    group.subMenus.forEach((subConfig) => {
      if (!existingKeys.has(subConfig.key)) {
        permission.subMenus = [...(permission.subMenus ?? []), buildSubMenuFromConfig(subConfig)]
      }
    })

    permission.subMenus = (permission.subMenus ?? []).map((sub) => {
      const configSub = group.subMenus.find((entry) => entry.key === sub.key)
      return configSub ? { ...sub, label: configSub.label } : sub
    })
  })

  return merged
}

export function permissionHasSubMenus(
  permission: RoleFormValues['permissions'][number] | undefined
): boolean {
  if (!permission?.resource) {
    return false
  }

  return (permission.subMenus?.length ?? 0) > 0 || isGroupedPermissionResource(permission.resource)
}
