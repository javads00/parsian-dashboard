import type { TPermission } from '@/typescript/role.types'
import type { MenuItem, MenuItemChild } from '@/typescript/types/menu'

export type RoleForMenuFilter = {
  fullAccess: boolean
  permissions: TPermission[]
}

export function getSubMenuCanView(
  role: RoleForMenuFilter,
  parentResource: string,
  subMenuKey: string
): boolean {
  if (role.fullAccess) return true

  const permission = role.permissions.find((entry) => entry.resource === parentResource)
  const subMenu = permission?.subMenus?.find((entry) => entry.key === subMenuKey)

  return subMenu?.page?.canView ?? false
}

export function filterVisibleMenuChildren(
  role: RoleForMenuFilter,
  parentResource: string,
  children: MenuItemChild[]
): MenuItemChild[] {
  if (role.fullAccess) return children

  return children.filter((child) => getSubMenuCanView(role, parentResource, child.key))
}

export function filterMenuItemsByPermission(
  role: RoleForMenuFilter | undefined,
  items: MenuItem[]
): MenuItem[] {
  if (!role) return []

  if (role.fullAccess) return items

  return items.reduce<MenuItem[]>((visibleItems, item) => {
    if (item.key === 'Dashboard') {
      visibleItems.push(item)
      return visibleItems
    }

    if (item.children?.length) {
      const parentResource = item.permissionResource ?? item.key
      const visibleChildren = filterVisibleMenuChildren(role, parentResource, item.children)

      if (visibleChildren.length === 0) {
        return visibleItems
      }

      visibleItems.push({ ...item, children: visibleChildren })
      return visibleItems
    }

    const permission = role.permissions.find((entry) => entry.resource === item.key)

    if (!permission) {
      return visibleItems
    }

    visibleItems.push(item)
    return visibleItems
  }, [])
}
