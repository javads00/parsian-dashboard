import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MailIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from './Sidebar'

const meta: Meta<typeof Sidebar> = {
  title: 'UI/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <SidebarProvider>
        <Story />
      </SidebarProvider>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof Sidebar>

const BasicMenu = () => (
  <>
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" asChild>
            <a href="#">
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <HomeIcon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Acme Inc</span>
                <span className="truncate text-xs">Enterprise</span>
              </div>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Home" isActive>
                <HomeIcon />
                <span>Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Inbox">
                <InboxIcon />
                <span>Inbox</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Search">
                <SearchIcon />
                <span>Search</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarSeparator />
      <SidebarGroup>
        <SidebarGroupLabel>Account</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings">
                <SettingsIcon />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Profile">
                <UserIcon />
                <span>Profile</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Help">
            <FileTextIcon />
            <span>Help</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </>
)

export const Default: Story = {
  render: () => (
    <div className="flex min-h-screen w-full">
      <Sidebar>
        <BasicMenu />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-max gap-4 md:grid-cols-3">
            <div className="bg-muted aspect-video rounded-lg" />
            <div className="bg-muted aspect-video rounded-lg" />
            <div className="bg-muted aspect-video rounded-lg" />
          </div>
          <div className="bg-muted min-h-[100vh] flex-1 rounded-lg" />
        </div>
      </SidebarInset>
      <SidebarRail />
    </div>
  ),
}


export const WithSearch: Story = {
  render: () => (
    <div className="flex min-h-screen w-full">
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <HomeIcon className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Acme Inc</span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Search</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarInput placeholder="Search..." />
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Home" isActive>
                    <HomeIcon />
                    <span>Home</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Inbox">
                    <InboxIcon />
                    <span>Inbox</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Search">
                    <SearchIcon />
                    <span>Search</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="bg-muted min-h-[100vh] flex-1 rounded-lg" />
        </div>
      </SidebarInset>
      <SidebarRail />
    </div>
  ),
}

export const WithSubMenu: Story = {
  render: () => (
    <div className="flex min-h-screen w-full">
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <HomeIcon className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Acme Inc</span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Home" isActive>
                    <HomeIcon />
                    <span>Home</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Inbox">
                    <InboxIcon />
                    <span>Inbox</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Documents">
                    <FileTextIcon />
                    <span>Documents</span>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a href="#">
                          <span>All Documents</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild isActive>
                        <a href="#">
                          <span>Recent</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a href="#">
                          <span>Archived</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Settings">
                    <SettingsIcon />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="bg-muted min-h-[100vh] flex-1 rounded-lg" />
        </div>
      </SidebarInset>
      <SidebarRail />
    </div>
  ),
}

export const Floating: Story = {
  render: () => (
    <div className="flex min-h-screen w-full">
      <Sidebar variant="floating">
        <BasicMenu />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="bg-muted min-h-[100vh] flex-1 rounded-lg" />
        </div>
      </SidebarInset>
      <SidebarRail />
    </div>
  ),
}

export const Inset: Story = {
  render: () => (
    <div className="flex min-h-screen w-full">
      <Sidebar variant="inset">
        <BasicMenu />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="bg-muted min-h-[100vh] flex-1 rounded-lg" />
        </div>
      </SidebarInset>
      <SidebarRail />
    </div>
  ),
}

export const RightSide: Story = {
  render: () => (
    <div className="flex min-h-screen w-full">
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
          <SidebarTrigger />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="bg-muted min-h-[100vh] flex-1 rounded-lg" />
        </div>
      </SidebarInset>
      <Sidebar side="right">
        <BasicMenu />
      </Sidebar>
      <SidebarRail />
    </div>
  ),
}

export const IconCollapsible: Story = {
  render: () => (
    <div className="flex min-h-screen w-full">
      <Sidebar collapsible="icon">
        <BasicMenu />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="bg-muted min-h-[100vh] flex-1 rounded-lg" />
        </div>
      </SidebarInset>
      <SidebarRail />
    </div>
  ),
}

export const NonCollapsible: Story = {
  render: () => (
    <div className="flex min-h-screen w-full">
      <Sidebar collapsible="none">
        <BasicMenu />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="bg-muted min-h-[100vh] flex-1 rounded-lg" />
        </div>
      </SidebarInset>
    </div>
  ),
}

export const ComplexMenu: Story = {
  render: () => (
    <div className="flex min-h-screen w-full">
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <HomeIcon className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Acme Inc</span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Home" isActive>
                    <HomeIcon />
                    <span>Home</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Inbox">
                    <InboxIcon />
                    <span>Inbox</span>
                    <div className="bg-sidebar-primary text-sidebar-primary-foreground ml-auto flex h-5 min-w-5 items-center justify-center rounded text-xs font-medium tabular-nums">
                      12 
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Calendar">
                    <CalendarIcon />
                    <span>Calendar</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Notifications">
                    <BellIcon />
                    <span>Notifications</span>
                    <div className="bg-sidebar-primary text-sidebar-primary-foreground ml-auto flex h-5 min-w-5 items-center justify-center rounded text-xs font-medium tabular-nums">
                      3
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Project Alpha">
                    <FolderIcon />
                    <span>Project Alpha</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Project Beta">
                    <FolderIcon />
                    <span>Project Beta</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Project Gamma">
                    <FolderIcon />
                    <span>Project Gamma</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Settings">
                    <SettingsIcon />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Profile">
                    <UserIcon />
                    <span>Profile</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Mail">
                    <MailIcon />
                    <span>Mail</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Help">
                <FileTextIcon />
                <span>Help</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-max gap-4 md:grid-cols-3">
            <div className="bg-muted aspect-video rounded-lg" />
            <div className="bg-muted aspect-video rounded-lg" />
            <div className="bg-muted aspect-video rounded-lg" />
          </div>
          <div className="bg-muted min-h-[100vh] flex-1 rounded-lg" />
        </div>
      </SidebarInset>
      <SidebarRail />
    </div>
  ),
}
