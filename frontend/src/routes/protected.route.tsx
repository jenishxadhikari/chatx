import { Loader } from 'lucide-react'
import { Navigate, Outlet } from 'react-router-dom'

import { socket } from '@/hooks/use-socket'
import { useAuthContext } from '@/context/auth-provider'

export default function ProtectedRoute() {
  const { isAuthenticated, session, isLoading } = useAuthContext()
  socket.connect()
  socket.auth = { userId: session?.user.id }

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[rgba(255,255,255,.2)] text-2xl backdrop-blur-sm">
        <Loader size="30px" className="animate-spin" />
        Loading...
      </div>
    )
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}
