import { getAuthStore } from '@/features'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { Fragment } from 'react/jsx-runtime'

const AuthenticatedLayout = () => (
  <Fragment>
    <Outlet />
  </Fragment>
)

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: () => {
    const { user } = getAuthStore().getState()
    if (!user) {
      throw redirect({ to: '/login', replace: true })
    }
  },
  component: AuthenticatedLayout,
})
