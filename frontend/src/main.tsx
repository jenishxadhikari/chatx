import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'

import { Toaster } from '@/components/ui/sonner.tsx'

import './index.css'

import { AuthProvider } from '@/context/auth-provider.tsx'
import QueryProvider from '@/context/query-provider.tsx'
import { ThemeProvider } from '@/context/theme-provider.tsx'

import App from './app.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryProvider>
        <AuthProvider>
          <App />
          <Toaster position="top-center" />
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  </StrictMode>
)
