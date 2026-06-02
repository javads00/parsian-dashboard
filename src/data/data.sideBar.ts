import { type MenuItem } from '@/typescript'

export const EnumResourceType = {
  Dashboard: 'Dashboard',
  Admin: 'Admin',
  Role: 'Role',
  Label: 'Label',
  OrderStatus: 'OrderStatus',
  Country: 'Country',
  RoleStatusAccess: 'RoleStatusAccess',
  RoleMapping: 'RoleMapping',
  ReleaseApp: 'ReleaseApp',
} as const

export type TResource = (typeof EnumResourceType)[keyof typeof EnumResourceType]

export const MENU_ITEMS: MenuItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    key: EnumResourceType.Dashboard,
    breadCrumb: ['Dashboard'],
    icon: 'Home',
  },
  {
    title: 'Admin',
    url: '/dashboard/admins',
    key: EnumResourceType.Admin,
    breadCrumb: ['Dashboard', 'Admin'],
    icon: 'User',
  },
  {
    title: 'Role',
    url: '/dashboard/role',
    key: EnumResourceType.Role,
    breadCrumb: ['Dashboard', 'Role'],
    icon: 'Package',
  },

  {
    title: 'Label',
    url: '/dashboard/label',
    key: EnumResourceType.Label,
    breadCrumb: ['Dashboard', 'Label'],
    icon: 'MapPin',
  },

  {
    title: 'OrderStatus',
    url: '/dashboard/orderStatus',
    key: EnumResourceType.OrderStatus,
    breadCrumb: ['Dashboard', 'OrderStaus'],
    icon: 'ListOrdered',
  },
  {
    title: 'Country',
    url: '/dashboard/country',
    key: EnumResourceType.Country,
    breadCrumb: ['Dashboard', 'Country'],
    icon: 'Globe',
  },
  {
    title: 'RoleStatusAccess',
    url: '/dashboard/roleStatusAccess',
    key: EnumResourceType.RoleStatusAccess,
    breadCrumb: ['Dashboard', 'RoleStatusAccess'],
    icon: 'Package',
  },
  {
    title: 'RoleMapping',
    url: '/dashboard/roleMapping',
    key: EnumResourceType.RoleMapping,
    breadCrumb: ['Dashboard', 'RoleMapping'],
    icon: 'ListOrdered',
  },

  {
    title: 'ReleaseApp',
    url: '/dashboard/releaseApp',
    key: EnumResourceType.ReleaseApp,
    breadCrumb: ['Dashboard', 'ReleaseApp'],
    icon: 'ListOrdered',
  },
]
