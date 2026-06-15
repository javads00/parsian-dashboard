import { type MenuItem, findMenuItemByPath } from '@/typescript/types/menu'

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
  EmailSetting: 'EmailSetting',
  EmailSMTP: 'EmailSMTP',
  EmailTemplates: 'EmailTemplates',
  EmailEjs: 'EmailEjs',
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
    icon: 'ListChecks',
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
    icon: 'ShieldCheck',
  },
  {
    title: 'RoleMapping',
    url: '/dashboard/roleStatusMapping',
    key: EnumResourceType.RoleMapping,
    breadCrumb: ['Dashboard', 'RoleMapping'],
    icon: 'ArrowLeftRight',
  },
  {
    title: 'ReleaseApp',
    url: '/dashboard/releaseApp',
    key: EnumResourceType.ReleaseApp,
    breadCrumb: ['Dashboard', 'ReleaseApp'],
    icon: 'Rocket',
  },
  {
    title: 'Email Settings',
    key: EnumResourceType.EmailSetting,
    breadCrumb: ['Dashboard', 'Email Settings'],
    icon: 'Mail',
    children: [
      {
        key: EnumResourceType.EmailSMTP,
        label: 'SMTP',
        path: '/dashboard/emailSetting/smtp',
      },
      {
        key: EnumResourceType.EmailTemplates,
        label: 'Email Templates',
        path: '/dashboard/emailSetting/emailTemplates',
      },
      {
        key: EnumResourceType.EmailEjs,
        label: 'Email EJS',
        path: '/dashboard/emailSetting/emailEjs',
      },
    ],
  },
]

export { findMenuItemByPath }
