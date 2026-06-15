import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarProvider,
  SidebarTrigger,
} from '@/components'
import { EnvSwitcher } from '@/components/EnvSwitcher'
import { MENU_ITEMS, findMenuItemByPath } from '@/data'
import { useActiveMenuKeys } from '@/hooks/useActiveMenuKeys'
import { useMenuSelectionStore } from '@/stores/menuSelection.store'
import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router'
import { Fragment, useEffect } from 'react'
import { SideBarComponent } from './_components/SideBarComponent'
import type { SideBarUiProps } from './_components/type'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
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
        <Outlet />
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
