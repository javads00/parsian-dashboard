import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { Toaster as SonnerToaster, type ToasterProps } from 'sonner'
import type { ToasterPropsExtended } from '@/typescript/types/components'

export function Toaster(props: ToasterPropsExtended) {
  const { theme = 'system' } = useTheme()

  return (
    <SonnerToaster
      theme={theme as ToasterProps['theme']}
      toastOptions={{
        classNames: {
          toast: '!border !border-border !bg-popover !text-popover-foreground',
          success: '!border !border-emerald-500 !bg-emerald-50 dark:!bg-emerald-500/10',
          error: '!border !border-red-500 !bg-red-50 dark:!bg-red-500/10',
          warning: '!border !border-amber-500/60 !bg-amber-50 dark:!bg-amber-500/10',
          info: '!border !border-sky-500/60 !bg-sky-50 dark:!bg-sky-500/10',
        },
      }}
      icons={{
        success: <CircleCheckIcon className="size-4 text-emerald-500" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4 text-amber-500" />,
        error: <OctagonXIcon className="size-4 text-red-500" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)',
        } as React.CSSProperties
      }
      {...props}
    />
  )
}
