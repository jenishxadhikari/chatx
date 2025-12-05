import { Outlet } from 'react-router-dom'

import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'

export function Main() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
