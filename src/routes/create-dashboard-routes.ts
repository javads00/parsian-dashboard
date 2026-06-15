import { lazyNamed } from '@/lib/lazyRoute'
import type { DashboardPageConfig } from '@/typescript'
import { createRoute, type AnyRoute } from '@tanstack/react-router'
import { dashboardPages } from './dashboard-pages'

export function createDashboardChildRoute(
  getParentRoute: () => AnyRoute,
  page: DashboardPageConfig
) {
  return createRoute({
    getParentRoute,
    path: page.path,
    component: lazyNamed(page.loader, page.exportName),
  })
}

export function createDashboardChildRoutes(getParentRoute: () => AnyRoute) {
  return dashboardPages.map((page) => createDashboardChildRoute(getParentRoute, page))
}
