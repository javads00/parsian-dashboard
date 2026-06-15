import { MENU_ITEMS } from '@/data'
import { useAuthStore } from '@/features'
import { filterMenuItemsByPermission } from '@/lib/menuPermissions'
import { useMemo } from 'react'

export function useFilteredMenuItems() {
  const { user } = useAuthStore()

  return useMemo(() => {
    const role = user?.roleId
    return filterMenuItemsByPermission(role, MENU_ITEMS)
  }, [user?.roleId])
}
