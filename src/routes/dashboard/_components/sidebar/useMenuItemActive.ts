import { isMenuPathActive } from '@/typescript/types/menu'
import { useMenuSelectionStore } from '@/routes/dashboard/_components/sidebar/menuSelection.store'
import { useLocation } from '@tanstack/react-router'

type UseMenuItemActiveOptions = {
  key: string
  url?: string
  parentKey?: string | null
  childKey?: string | null
}

export function useMenuItemActive({
  key,
  url,
  parentKey = null,
  childKey = null,
}: UseMenuItemActiveOptions) {
  const { pathname } = useLocation()
  const selectedKey = useMenuSelectionStore((state) => state.key)
  const selectedParentKey = useMenuSelectionStore((state) => state.parentKey)
  const selectedChildKey = useMenuSelectionStore((state) => state.childKey)

  const isActiveByPath = url ? isMenuPathActive(pathname, url) : false

  const isActiveBySelection = childKey
    ? selectedChildKey === childKey && selectedParentKey === parentKey
    : selectedKey === key && selectedParentKey === null && selectedChildKey === null

  return isActiveByPath || isActiveBySelection
}
