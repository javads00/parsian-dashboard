import { cn } from '@/lib/utils'

export const sidebarNavActiveClass =
  'data-[active=true]:bg-[var(--sidebar-active-item)] data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-semibold data-[active=true]:shadow-sm'

export const sidebarNavActiveStateClass =
  'bg-[var(--sidebar-active-item)] text-sidebar-accent-foreground font-semibold shadow-sm'

export const sidebarSubNavActiveClass =
  'data-[active=true]:bg-[var(--sidebar-active-item)] data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-semibold data-[active=true]:shadow-sm data-[active=true]:border-sidebar-ring/40 border border-transparent'

export function getNavLinkClass(isActive: boolean, base?: string) {
  return cn(base, isActive && sidebarNavActiveStateClass)
}
