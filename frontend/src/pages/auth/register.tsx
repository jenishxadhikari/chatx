import { MaxWidthWrapper } from '@/components/max-width-wrapper'

import { RegisterForm } from '@/features/auth/components/register-form'

export default function Register() {
  return (
    <section className="py-4 md:py-8">
      <MaxWidthWrapper>
        <RegisterForm />
      </MaxWidthWrapper>
    </section>
  )
}
