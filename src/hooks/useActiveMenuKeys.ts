import { MENU_ITEMS } from '@/data'
import { resolveMenuSelection, type MenuSelection } from '@/typescript/types/menu'
import { useLocation } from '@tanstack/react-router'
import { useMemo } from 'react'

export function useActiveMenuKeys(items = MENU_ITEMS): MenuSelection | null {
  const { pathname } = useLocation()

  return useMemo(() => resolveMenuSelection(pathname, items), [pathname, items])
}
