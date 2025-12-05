import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { useAuthContext } from '@/context/auth-provider'

import { MaxWidthWrapper } from './max-width-wrapper'
import { buttonVariants } from './ui/button'

export function Navbar() {
  const { isAuthenticated } = useAuthContext()

  return (
    <nav className="h-15 border-b">
      <MaxWidthWrapper className="flex items-center justify-between">
        <Link
          to="/"
          className={buttonVariants({
            size: 'sm',
            variant: 'outline',
            className: 'font-mono font-semibold tracking-tight'
          })}
        >
          ChatX
        </Link>
        {isAuthenticated ? (
          <Link
            to="/chat"
            className={buttonVariants({
              size: 'sm',
              className: 'group gap-x-1'
            })}
          >
            Chat
            <ArrowRight className="transition-all duration-300 group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <Link
            to="/login"
            className={buttonVariants({
              size: 'sm'
            })}
          >
            Login
          </Link>
        )}
      </MaxWidthWrapper>
    </nav>
  )
}
