import { Link } from 'react-router-dom'

import { MaxWidthWrapper } from './max-width-wrapper'
import { buttonVariants } from './ui/button'

export function NotFound() {
  return (
    <section className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <MaxWidthWrapper className="text-center">
        <p className="text-primary text-base font-semibold">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
          Page not found
        </h1>
        <p className="text-muted-foreground mt-6 text-lg font-medium text-pretty sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10">
          <Link to="/" className={buttonVariants()}>
            Go back home
          </Link>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}
