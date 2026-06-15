import type { LinkProps } from '@tanstack/react-router'
import type { MouseEventHandler, ReactNode } from 'react'

export type AppLinkProps = Omit<LinkProps, 'to'> & {
  to: LinkProps['to'] | string
  children: ReactNode
  className?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}
