import { Icon } from '@/assets/icon'
import { AppLink } from '@/components/ui/link'
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { useMenuSelectionStore } from '@/routes/dashboard/_components/sidebar/menuSelection.store'
import type { MenuItem, MenuItemChild, MenuSelection } from '@/typescript/types/menu'
import { isMenuPathActive } from '@/typescript/types/menu'
import { useLocation } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import { getNavLinkClass, sidebarNavActiveClass, sidebarSubNavActiveClass } from './sidebarNavStyles'
import { useMenuItemActive } from './useMenuItemActive'

type MenuGroupProps = {
  item: MenuItem
  isOpen: boolean
  onToggle: () => void
  onSelect?: (selection: MenuSelection) => void
}

function MenuGroupChild({
  parent,
  child,
  onSelect,
}: {
  parent: MenuItem
  child: MenuItemChild
  onSelect?: (selection: MenuSelection) => void
}) {
  const isChildActive = useMenuItemActive({
    key: child.key,
    url: child.path,
    parentKey: parent.key,
    childKey: child.key,
  })

  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton
        asChild
        isActive={isChildActive}
        className={sidebarSubNavActiveClass}
      >
        <AppLink
          to={child.path}
          className={getNavLinkClass(isChildActive, 'flex w-full items-center gap-2')}
          onClick={() =>
            onSelect?.({
              key: child.key,
              parentKey: parent.key,
              childKey: child.key,
            })
          }
        >


          <span
            className={cn(
              'size-1.5 shrink-0 rounded-full bg-sidebar-foreground/30 transition-colors',
              isChildActive && 'scale-125 bg-sidebar-accent-foreground'
            )}
            aria-hidden
          />
          <span className="truncate">{child.label}</span>
        </AppLink>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  )
}

export function MenuGroup({ item, isOpen, onToggle, onSelect }: MenuGroupProps) {
  const children = item.children ?? []
  const { pathname } = useLocation()
  const selectedParentKey = useMenuSelectionStore((state) => state.parentKey)
  const selectedChildKey = useMenuSelectionStore((state) => state.childKey)

  const hasActiveChild = children.some(
    (child) =>
      isMenuPathActive(pathname, child.path) ||
      (selectedParentKey === item.key && selectedChildKey === child.key)
  )

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        type="button"
        tooltip={item.title}
        isActive={hasActiveChild}
        data-state={isOpen ? 'open' : 'closed'}
        className={cn('group/menu-group', sidebarNavActiveClass, hasActiveChild && 'bg-[var(--sidebar-active-item)] text-sidebar-accent-foreground font-semibold shadow-sm')}
        onClick={onToggle}
      >
        <Icon iconType={item.icon} className="!h-4 !w-4 shrink-0" />
        <span className="flex-1 truncate text-left">{item.title}</span>
        <ChevronRight
          className={cn(
            'ml-auto size-4 shrink-0 text-sidebar-foreground/60 transition-transform duration-200 ease-out',
            isOpen && 'rotate-90'
          )}
          aria-hidden
        />
      </SidebarMenuButton>

      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-200 ease-out',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="overflow-hidden">
          <SidebarMenuSub className="gap-0.5">
            {children.map((child) => (
              <MenuGroupChild
                key={child.key}
                parent={item}
                child={child}
                onSelect={onSelect}
              />
            ))}
          </SidebarMenuSub>
        </div>
      </div>
    </SidebarMenuItem>
  )
}
