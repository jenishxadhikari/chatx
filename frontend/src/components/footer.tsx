import { MaxWidthWrapper } from './max-width-wrapper'

export function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="py-4">
      <MaxWidthWrapper>
        <p className="text-muted-foreground text-center text-sm">
          &copy; {currentYear} Jenish Adhikari
        </p>
      </MaxWidthWrapper>
    </footer>
  )
}
