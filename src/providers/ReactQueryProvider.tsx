import { getErrorMessage, getSuccessMessage } from '@/lib'
import type { ApiResponse } from '@/lib/services/type'
import {
  keepPreviousData,
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useState, type PropsWithChildren } from 'react'
import { toast } from 'sonner'

type AppMeta = {
  toast?: boolean
  suppressToast?: boolean
}

const shouldToastSuccess = (meta: unknown): boolean => (meta as AppMeta | undefined)?.toast === true

const shouldSuppressError = (meta: unknown): boolean =>
  (meta as AppMeta | undefined)?.suppressToast === true

export default function ReactQueryProvider(props: PropsWithChildren) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error, query) => {
            if (shouldSuppressError(query.meta)) return
            toast.error(getErrorMessage(error))
          },
        }),
        mutationCache: new MutationCache({
          onSuccess: (data, _vars, _ctx, mutation) => {
            if (!shouldToastSuccess(mutation.meta)) return
            const res = data as ApiResponse<unknown> | undefined
            if (!res?.message) return
            const ok = res.status === 200 || res.status === 201
            ;(ok ? toast.success : toast.error)(getSuccessMessage(res))
          },
          onError: (error, _vars, _ctx, mutation) => {
            if (shouldSuppressError(mutation.meta)) return
            toast.error(getErrorMessage(error))
          },
        }),
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 60 * 1000,
            placeholderData: keepPreviousData,
            retry: 0,
          },
          mutations: {
            retry: 0,
          },
        },
      })
  )

  return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
}
