import { Icon } from '@/assets/icon'
import { AppLink } from '@/components/ui/link'
import { SidebarMenuButton, SidebarMenuItem as SidebarMenuItemRoot } from '@/components/ui/sidebar'
import type {
  MenuItem as MenuItemType,
  MenuItemChild,
  MenuSelection,
} from '@/typescript/types/menu'
import { getNavLinkClass, sidebarNavActiveClass } from './sidebarNavStyles'
import { useMenuItemActive } from './useMenuItemActive'

type MenuLinkProps = {
  item: MenuItemType
  onSelect?: (selection: MenuSelection) => void
}



type MenuChildLinkProps = {
  parent: MenuItemType
  child: MenuItemChild
  onSelect?: (selection: MenuSelection) => void
}

export function MenuItem({ item, onSelect }: MenuLinkProps) {
  if (!item.url) {
    return null
  }

  const isActive = useMenuItemActive({ key: item.key, url: item.url })

  return (
    <SidebarMenuItemRoot>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip={item.title}
        className={sidebarNavActiveClass}
      >
        <AppLink
          to={item.url}
          className={getNavLinkClass(isActive, 'flex w-full items-center gap-2')}
          onClick={() =>
            onSelect?.({
              key: item.key,
              parentKey: null,
              childKey: null,
            })
          }
        >
          <Icon iconType={item.icon} className="!h-4 !w-4 shrink-0" />
          <span className="truncate">{item.title}</span>
        </AppLink>
      </SidebarMenuButton>
    </SidebarMenuItemRoot>
  )
}

export function MenuChildItem({ parent, child, onSelect }: MenuChildLinkProps) {
  const isActive = useMenuItemActive({
    key: child.key,
    url: child.path,
    parentKey: parent.key,
    childKey: child.key,
  })

  return (
    <SidebarMenuItemRoot>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip={`${parent.title} · ${child.label}`}
        className={sidebarNavActiveClass}
      >
        <AppLink
          to={child.path}
          className={getNavLinkClass(isActive, 'flex w-full items-center gap-2')}
          onClick={() =>
            onSelect?.({
              key: child.key,
              parentKey: parent.key,
              childKey: child.key,
            })
          }
        >
          <Icon iconType={parent.icon} className="!h-4 !w-4 shrink-0" />
          <span className="truncate">{child.label}</span>
        </AppLink>
      </SidebarMenuButton>
    </SidebarMenuItemRoot>
  )
}
