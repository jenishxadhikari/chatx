import { StrictMode } from 'react'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRoot } from 'react-dom/client'

import { Toaster } from '@/components/ui/sonner.tsx'

import './index.css'

import { AuthProvider } from '@/context/auth-provider.tsx'
import QueryProvider from '@/context/query-provider.tsx'

import App from './app.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <AuthProvider>
        <App />
        <Toaster />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryProvider>
  </StrictMode>
)
