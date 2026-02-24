import { User, Package, Home } from 'lucide-react'
export const MENU_ITEMS = [
  {
    title: 'dashboard',
    url: '/dashboard',
    breadCrumb: ['Dashboard'],
    icon: Home,
  },

  {
    title: 'Admin',
    url: '/dashboard/admins',
    breadCrumb: ['Dashboard', 'Admin'],
    icon: User,
  },

  {
    title: 'Role',
    url: '/dashboard/role',
    breadCrumb: ['Dashboard', 'Role'],
    icon: Package,
  },


]
