import { lazyNamed } from '@/lib/lazyRoute'
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router'

import { requireAuth, requireGuest, redirectToDashboard } from './auth-guards'
import { createDashboardChildRoutes } from './create-dashboard-routes'
import { RootLayout } from './RootLayout'

const rootRoute = createRootRoute({
  component: RootLayout,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: redirectToDashboard,
  component: () => null,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  beforeLoad: requireGuest,
  component: lazyNamed(() => import('@/routes/login/LoginPage'), 'LoginPage'),
})

const authenticatedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: '_authenticated',
  beforeLoad: requireAuth,
  component: AuthenticatedOutlet,
})

const dashboardRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/dashboard',
  component: lazyNamed(
    () => import('@/routes/dashboard/DashboardLayout'),
    'DashboardLayout'
  ),
})

const dashboardIndexRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/',
  component: lazyNamed(
    () => import('@/routes/dashboard/DashboardHomePage'),
    'DashboardHomePage'
  ),
})

const dashboardPageRoutes = createDashboardChildRoutes(() => dashboardRoute)

export const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  authenticatedRoute.addChildren([
    dashboardRoute.addChildren([dashboardIndexRoute, ...dashboardPageRoutes]),
  ]),
])

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 30_000,
})

function AuthenticatedOutlet() {
  return <Outlet />
}
