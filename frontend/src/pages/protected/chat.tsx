import { useAuthContext } from '@/context/auth-provider'

import { Logout } from '@/features/auth/components/logout-button'

export default function Home() {
  const { session } = useAuthContext()
  return (
    <section className="space-y-4 p-10">
      <h1>ChatX</h1>
      <p>{JSON.stringify(session)}</p>
      <Logout />
    </section>
  )
}
