import { Skeleton } from '@/components/ui/skeleton'
import { TableSkeleton } from '@/components/ui/skeleton'
import type { RoutePageFallbackProps } from '@/typescript/types/components'

export function RoutePageFallback({ variant = 'dashboard' }: RoutePageFallbackProps) {
  if (variant === 'login') {
    return (
      <main className="bg-layout-bg flex h-dvh items-center justify-center px-4">
        <div className="border-layout-border w-full max-w-[400px] space-y-4 rounded-xl border p-6">
          <Skeleton className="mx-auto h-12 w-12 rounded-full" />
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </main>
    )
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-9 w-28" />
      </div>
      <TableSkeleton columns={5} rows={8} />
    </div>
  )
}
