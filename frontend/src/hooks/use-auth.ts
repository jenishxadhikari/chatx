import { useQuery } from '@tanstack/react-query'

import { sessionQuery } from '@/lib/api'

import { socket } from './use-socket'

export function useAuth() {
  const query = useQuery({
    queryKey: ['auth'],
    queryFn: sessionQuery,
    staleTime: Infinity,
    retry: 1
  })

  socket.auth = { userId: query.data?.data.data.user.id }

  return query
}
