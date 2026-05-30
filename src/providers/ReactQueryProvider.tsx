import { getSuccessMessage } from '@/lib'
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

export default function ReactQueryProvider(props: PropsWithChildren) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          // Keep query (GET) operations silent globally.
          // We only show toasts for mutations (create/update/delete).
        }),
        mutationCache: new MutationCache({
          onSuccess: (data, _variables, _context, mutation) => {
            const method = String(mutation.options.meta?.method ?? '').toLowerCase()
            if (method === 'get') return

            if (
              (data as ApiResponse<unknown>).status === 200 ||
              (data as ApiResponse<unknown>).status === 201
            ) {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              ; (data as ApiResponse<unknown>)?.message
                ? toast.success(getSuccessMessage(data as ApiResponse<unknown>))
                : null
            } else {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              ; (data as ApiResponse<unknown>)?.message
                ? toast.error(getSuccessMessage(data as ApiResponse<unknown>))
                : null
            }
          },

          onError: (error, _variables, _context, mutation) => {
            const method = String(mutation.options.meta?.method ?? '').toLowerCase()
            if (method === 'get') return
            toast.error(error.message)
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
