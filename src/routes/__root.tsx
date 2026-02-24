import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Fragment } from 'react/jsx-runtime'

const RootLayout = () => (
  <Fragment>
    <Outlet />
    <TanStackRouterDevtools />
  </Fragment>
)

export const Route = createRootRoute({
  component: RootLayout,
})
