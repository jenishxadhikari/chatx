import type React from 'react'

import { cn } from '@/lib/utils'

interface MaxWidthWrapperProps {
  className?: string
  children: React.ReactNode
}

export function MaxWidthWrapper({ className, children }: MaxWidthWrapperProps) {
  return (
    <div className={cn('container mx-auto h-full w-full max-w-5xl px-2.5', className)}>
      {children}
    </div>
  )
}
