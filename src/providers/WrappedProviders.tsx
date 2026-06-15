import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from 'next-themes'
import { type PropsWithChildren } from 'react'
import ReactQueryProvider from './ReactQueryProvider'

export default function WrappedProviders({ children }: PropsWithChildren) {
  return (
    <>
      <ReactQueryProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </ReactQueryProvider>

      <Toaster />
    </>
  )
}
