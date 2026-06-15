import type { ComponentType } from 'react'

export type DashboardPageConfig = {
  path: `/${string}`
  exportName: string
  loader: () => Promise<Record<string, ComponentType<unknown>>>
}
