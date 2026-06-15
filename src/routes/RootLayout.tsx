import { RoutePageFallback } from '@/components/common/RoutePageFallback'
import { Outlet } from '@tanstack/react-router'
import { Fragment, lazy, Suspense } from 'react'

const RouterDevtools = import.meta.env.DEV
  ? lazy(() =>
      import('@tanstack/react-router-devtools').then((module) => ({
        default: module.TanStackRouterDevtools,
      }))
    )
  : null

export function RootLayout() {
  return (
    <Fragment>
      <Suspense fallback={<RoutePageFallback variant="login" />}>
        <Outlet />
      </Suspense>
      {RouterDevtools ? (
        <Suspense fallback={null}>
          <RouterDevtools />
        </Suspense>
      ) : null}
    </Fragment>
  )
}
