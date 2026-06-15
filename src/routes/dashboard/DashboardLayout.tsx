import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar/Avatar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb/Breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdownMenu/DropdownMenu'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { EnvSwitcher } from '@/components/EnvSwitcher'
import { MENU_ITEMS, findMenuItemByPath } from '@/data'
import { useActiveMenuKeys } from '@/hooks/useActiveMenuKeys'
import { useMenuSelectionStore } from '@/routes/dashboard/_components/sidebar/menuSelection.store'
import { RoutePageFallback } from '@/components/common/RoutePageFallback'
import { Outlet, useLocation } from '@tanstack/react-router'
import { Fragment, Suspense, useEffect } from 'react'
import { SideBarComponent } from './_components/SideBarComponent'
import type { SideBarUiProps } from './_components/type'

export function DashboardLayout() {
  const location = useLocation()
  const currentItem = findMenuItemByPath(location.pathname, MENU_ITEMS)
  const activeMenuKeys = useActiveMenuKeys()
  const setSelection = useMenuSelectionStore((state) => state.setSelection)

  useEffect(() => {
    if (activeMenuKeys) {
      setSelection(activeMenuKeys)
    }
  }, [activeMenuKeys, setSelection])

  return <SideBarUi currentItem={currentItem} />
}

function SideBarUi({ currentItem }: SideBarUiProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <SideBarComponent />
      <main className="bg-layout-bg mx-auto min-h-screen w-full max-w-7xl px-4 py-2">
        {' '}
        <HeaderComponent currentItem={currentItem} />
        <Suspense fallback={<RoutePageFallback />}>
          <Outlet />
        </Suspense>
      </main>
    </SidebarProvider>
  )
}

function HeaderComponent({ currentItem }: SideBarUiProps) {
  return (
    <div className="xs:flex-col mb-10 flex items-center justify-between gap-2 border-b px-4 pb-2 sm:flex-row">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h1 className="text-2xl font-bold">
          <Breadcrumb>
            <BreadcrumbList>
              {currentItem?.breadCrumb.map((crumb, index) => (
                <Fragment key={crumb}>
                  <BreadcrumbItem key={crumb}>
                    <BreadcrumbLink href={currentItem?.url ?? '#'}>{crumb}</BreadcrumbLink>
                  </BreadcrumbItem>
                  {index < (currentItem?.breadCrumb.length ?? 0) - 1 && <BreadcrumbSeparator />}
                </Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <EnvSwitcher />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48" align="center">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
