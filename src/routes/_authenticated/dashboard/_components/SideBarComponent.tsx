import { Icon } from '@/assets/icon'
import { AppLink } from '@/components/ui/link'
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
import type { SideBarComponentProps } from '@/routes/_authenticated/dashboard/_components/type'
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

function SideBarUi({ isSigningOut, handleSignOut, location, menuItems }: SideBarComponentProps) {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <AppLink to={item.url} className="flex items-center gap-2">
                      <Icon iconType={item.icon} />
                      <span>{item.title}</span>
                    </AppLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem key="logout">
                <SidebarMenuButton
                  loading={isSigningOut}
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                >
                  <LogOut />
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
