import { LoaderCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface SubmitButtonProps {
  pending: boolean
  label: string
  className?: string
}

export function SubmitButton({ pending, label, className = 'w-full' }: SubmitButtonProps) {
  return (
    <Button type="submit" className={className} disabled={pending}>
      {pending && <LoaderCircle className="size-4 animate-spin" />} {label}
    </Button>
  )
}
