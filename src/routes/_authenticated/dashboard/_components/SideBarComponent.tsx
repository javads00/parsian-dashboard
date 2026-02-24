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
import { MENU_ITEMS } from '@/data'
import { useAuthStore } from '@/features'
import type { SideBarComponentProps } from '@/routes/_authenticated/dashboard/_components/type'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'

export function SideBarComponent() {
  const { signOut, isSigningOut } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSignOut = async () => {
    await signOut?.()
    navigate({ to: '/login' })
  }
  return <SideBarUi isSigningOut={isSigningOut} handleSignOut={handleSignOut} location={location} />
}

function SideBarUi({ isSigningOut, handleSignOut, location }: SideBarComponentProps) {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MENU_ITEMS.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
