import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useAuthStore } from '@/features'
import { useFilteredMenuItems } from '@/hooks/useFilteredMenuItems'
import { useSidebarAccordion } from '@/hooks/useSidebarAccordion'
import { MenuGroup, MenuItem } from '@/routes/dashboard/_components/sidebar'
import type { SideBarComponentProps } from '@/routes/dashboard/_components/type'
import { useMenuSelectionStore } from '@/routes/dashboard/_components/sidebar/menuSelection.store'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'

export function SideBarComponent() {
  const { signOut, isSigningOut } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const menuItems = useFilteredMenuItems()

  const handleSignOut = async () => {
    await signOut?.()
    navigate({ to: '/login' })
  }

  return (
    <SideBarUi
      menuItems={menuItems}
      isSigningOut={isSigningOut}
      handleSignOut={handleSignOut}
      location={location}
    />
  )
}

function SideBarUi({ isSigningOut, handleSignOut, menuItems }: SideBarComponentProps) {
  const setSelection = useMenuSelectionStore((state) => state.setSelection)
  const { isGroupOpen, toggleGroup } = useSidebarAccordion(menuItems)

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) =>
                item.children?.length ? (
                  <MenuGroup
                    key={item.key}
                    item={item}
                    isOpen={isGroupOpen(item.key)}
                    onToggle={() => toggleGroup(item.key)}
                    onSelect={setSelection}
                  />
                ) : (
                  <MenuItem
                    key={item.url ?? item.key}
                    item={item}
                    onSelect={setSelection}
                  />
                )
              )}
              <SidebarMenuItem key="logout">
                <SidebarMenuButton
                  loading={isSigningOut}
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                >
                  <LogOut className="size-4 shrink-0" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
