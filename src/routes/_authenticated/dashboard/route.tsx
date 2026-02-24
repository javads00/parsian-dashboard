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
import { MENU_ITEMS } from '@/data'
import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router'
import { Fragment } from 'react/jsx-runtime'
import { SideBarComponent } from './_components/SideBarComponent'
import type { SideBarUiProps } from './_components/type'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const location = useLocation()
  const currentItem = MENU_ITEMS.find(
    (item) => item.url === location.pathname
  ) as (typeof MENU_ITEMS)[number]

  return <SideBarUi currentItem={currentItem} />
}

function SideBarUi({ currentItem }: SideBarUiProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <SideBarComponent />
      <main className="mx-auto w-full max-w-7xl px-4 py-2">
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
                    <BreadcrumbLink href={currentItem.url}>{crumb}</BreadcrumbLink>
                  </BreadcrumbItem>
                  {index < currentItem.breadCrumb.length - 1 && <BreadcrumbSeparator />}
                </Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </h1>
      </div>
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
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
