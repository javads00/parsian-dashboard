import type { router } from '@/routes/routers'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export {}
