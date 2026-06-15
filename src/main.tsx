import { RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './extentions'

import { WrappedProviders } from '@/providers'
import { router } from './routes/routers'

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <WrappedProviders>
        <RouterProvider router={router} />
      </WrappedProviders>
    </StrictMode>
  )
}
