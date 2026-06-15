// types/menu.ts
import type { IconsType } from '@/assets'

export type MenuItemChild = {
  key: string
  label: string
  path: string
}

export type MenuItem = {
  title: string
  url?: string
  key: string
  breadCrumb: string[]
  icon: IconsType
  /** Resource key stored in role.permissions for grouped items */
  permissionResource?: string
  children?: MenuItemChild[]
}

export type MenuSelection = {
  key: string
  parentKey: string | null
  childKey: string | null
}

export type ResolvedMenuItem = MenuItem & {
  parentKey?: string
  childKey?: string
}

export type SidebarNavEntry =
  | { kind: 'link'; item: MenuItem }
  | { kind: 'child'; parent: MenuItem; child: MenuItemChild }

export function flattenMenuForSidebar(items: MenuItem[]): SidebarNavEntry[] {
  const entries: SidebarNavEntry[] = []

  for (const item of items) {
    if (item.children?.length) {
      for (const child of item.children) {
        entries.push({ kind: 'child', parent: item, child })
      }
      continue
    }

    entries.push({ kind: 'link', item })
  }

  return entries
}

export function normalizeMenuPath(path: string): string {
  return path.replace(/\/+$/, '') || '/'
}

export function isMenuPathActive(pathname: string, path: string): boolean {
  return normalizeMenuPath(pathname) === normalizeMenuPath(path)
}

export function findActiveParentKey(pathname: string, items: MenuItem[]): string | null {
  for (const item of items) {
    if (item.children?.some((child) => isMenuPathActive(pathname, child.path))) {
      return item.key
    }
  }

  return null
}

export function findActiveChildKey(pathname: string, items: MenuItem[]): string | null {
  for (const item of items) {
    const child = item.children?.find((entry) => isMenuPathActive(pathname, entry.path))
    if (child) {
      return child.key
    }
  }

  return null
}

export function resolveMenuSelection(pathname: string, items: MenuItem[]): MenuSelection | null {
  const resolved = findMenuItemByPath(pathname, items)
  if (!resolved) {
    return null
  }

  return {
    key: resolved.childKey ?? resolved.key,
    parentKey: resolved.parentKey ?? null,
    childKey: resolved.childKey ?? null,
  }
}

export function findMenuItemByPath(pathname: string, items: MenuItem[]): ResolvedMenuItem | undefined {
  for (const item of items) {
    if (item.url === pathname) {
      return item
    }

    const child = item.children?.find((entry) => entry.path === pathname)

    if (child) {
      return {
        ...item,
        title: child.label,
        url: child.path,
        parentKey: item.key,
        childKey: child.key,
        breadCrumb: [...item.breadCrumb, child.label],
      }
    }
  }

  return undefined
}
