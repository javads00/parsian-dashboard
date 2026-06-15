import { lazy, type ComponentType } from 'react'

export function lazyNamed<T extends Record<string, ComponentType<unknown>>>(
  factory: () => Promise<T>,
  exportName: keyof T | string
) {
  return lazy(() =>
    factory().then((module) => ({
      default: module[exportName as keyof T] as ComponentType<unknown>,
    }))
  )
}
