import { LoaderCircle } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'

interface SubmitButtonProps {
  pending: boolean
  label: string
  className?: string
}

export function SubmitButton({ pending, label, className }: SubmitButtonProps) {
  return (
    <Button type="submit" className={cn('w-full', className)} disabled={pending}>
      {pending && <LoaderCircle className="size-4 animate-spin" />} {label}
    </Button>
  )
}
