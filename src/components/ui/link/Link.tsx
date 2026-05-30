import { Link as RouterLink } from '@tanstack/react-router'
import type { ReactNode } from 'react'

type AppLinkProps = {
  to: string
  children: ReactNode
  className?: string
}

export function AppLink({ to, children, className }: AppLinkProps) {
  return (
    <RouterLink to={to} className={className}>
      {children}
    </RouterLink>
  )
}
