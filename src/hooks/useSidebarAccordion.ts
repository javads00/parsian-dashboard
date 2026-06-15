import { findActiveParentKey } from '@/typescript/types/menu'
import type { MenuItem } from '@/typescript/types/menu'
import { useLocation } from '@tanstack/react-router'
import { useCallback, useEffect, useMemo, useState } from 'react'

export function useSidebarAccordion(menuItems: MenuItem[]) {
  const { pathname } = useLocation()

  const activeParentKey = useMemo(
    () => findActiveParentKey(pathname, menuItems),
    [menuItems, pathname]
  )

  const [openGroupKey, setOpenGroupKey] = useState<string | null>(null)

  useEffect(() => {
    if (activeParentKey) {
      setOpenGroupKey(activeParentKey)
    }
  }, [activeParentKey])

  const toggleGroup = useCallback((key: string) => {
    setOpenGroupKey((previous) => (previous === key ? null : key))
  }, [])

  const isGroupOpen = useCallback((key: string) => openGroupKey === key, [openGroupKey])

  return {
    activeParentKey,
    isGroupOpen,
    openGroupKey,
    toggleGroup,
  }
}
