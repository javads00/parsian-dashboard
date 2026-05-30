// hooks/useFilteredMenuItems.ts
import { EnumResourceType, MENU_ITEMS } from '@/data'
import { useAuthStore } from '@/features'

export function useFilteredMenuItems() {
  const { user } = useAuthStore()
  const role = user?.roleId
  if (!role) return []
  if (role.fullAccess) return MENU_ITEMS
  return MENU_ITEMS.filter((item) => {
    if (item.key === EnumResourceType.Dashboard) return true
    const resourceName = EnumResourceType[item.key]
    if (!resourceName) return false
    const permission = role.permissions.find((p: any) => p.resource === resourceName)
    if (!permission) return false
    return true
  })
}
