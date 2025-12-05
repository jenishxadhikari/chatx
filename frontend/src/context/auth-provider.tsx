import type React from 'react'
import { createContext, useContext } from 'react'

import { useAuth } from '@/hooks/use-auth'

type Session = {
  ip: string
  browser: string
  user: {
    id: string
    name: string
    email: string
    isVerified: boolean
    is2FAEnabled: boolean
    createdAt: Date
    expiredAt: Date
  }
}

type TAuthContext = {
  session: Session | undefined
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<TAuthContext | undefined>(undefined)

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { data, isLoading } = useAuth()

  const sessionData = data?.data?.data
  const isAuthenticated = !!sessionData

  return (
    <AuthContext.Provider value={{ session: sessionData!, isLoading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be inside AuthProvider')
  }
  return context
}
