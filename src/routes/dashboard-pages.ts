import type { DashboardPageConfig } from '@/typescript'

export const dashboardPages = [
  {
    path: '/admins',
    exportName: 'AdminsPage',
    loader: () => import('@/routes/dashboard/admins/AdminsPage'),
  },
  {
    path: '/country',
    exportName: 'CountryPage',
    loader: () => import('@/routes/dashboard/country/CountryPage'),
  },
  {
    path: '/label',
    exportName: 'LabelPage',
    loader: () => import('@/routes/dashboard/label/LabelPage'),
  },
  {
    path: '/orderStatus',
    exportName: 'OrderStatusPage',
    loader: () => import('@/routes/dashboard/orderStatus/OrderStatusPage'),
  },
  {
    path: '/releaseApp',
    exportName: 'ReleaseAppPage',
    loader: () => import('@/routes/dashboard/releaseApp/ReleaseAppPage'),
  },
  {
    path: '/role',
    exportName: 'RolesPage',
    loader: () => import('@/routes/dashboard/role/RolesPage'),
  },
  {
    path: '/roleStatusAccess',
    exportName: 'RoleStatusAccessPage',
    loader: () => import('@/routes/dashboard/roleStatusAccess/RoleStatusAccessPage'),
  },
  {
    path: '/roleStatusMapping',
    exportName: 'RoleStatusMappingPage',
    loader: () => import('@/routes/dashboard/roleStatusMapping/RoleStatusMappingPage'),
  },
  {
    path: '/emailSetting/smtp',
    exportName: 'SmtpPage',
    loader: () => import('@/routes/dashboard/emailSetting/smtp/SmtpPage'),
  },
  {
    path: '/emailSetting/emailTemplates',
    exportName: 'EmailTemplatesPage',
    loader: () => import('@/routes/dashboard/emailSetting/emailTemplates/EmailTemplatesPage'),
  },
  {
    path: '/emailSetting/emailEjs',
    exportName: 'EmailEjsPage',
    loader: () => import('@/routes/dashboard/emailSetting/emailEjs/EmailEjsPage'),
  },
] as const satisfies readonly DashboardPageConfig[]
