import { MaxWidthWrapper } from '@/components/max-width-wrapper'

import { LoginForm } from '@/features/auth/components/login-form'

export default function Login() {
  return (
    <section className="py-4 md:py-8">
      <MaxWidthWrapper>
        <LoginForm />
      </MaxWidthWrapper>
    </section>
  )
}
