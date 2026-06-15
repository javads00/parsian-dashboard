import { Link as RouterLink, type LinkProps } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import type { MouseEventHandler, ReactNode } from 'react'

const navLinkActiveClass =
  'bg-[var(--sidebar-active-item)] text-sidebar-accent-foreground font-semibold shadow-sm'

type AppLinkProps = Omit<LinkProps, 'to'> & {
  to: LinkProps['to'] | string
  children: ReactNode
  className?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

export function AppLink({ to, children, className, activeOptions, ...props }: AppLinkProps) {
  return (
    <RouterLink
      to={to as LinkProps['to']}
      className={className}
      activeOptions={activeOptions ?? { exact: true }}
      activeProps={{
        'data-active': true,
        'aria-current': 'page',
        className: cn(className, navLinkActiveClass),
      }}
      inactiveProps={{
        'data-active': false,
        'aria-current': undefined,
      }}
      {...props}
    >
      {children}
    </RouterLink>
  )
}
