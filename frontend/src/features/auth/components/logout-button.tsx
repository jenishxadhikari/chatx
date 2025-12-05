import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { LoaderCircle, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { logoutMutation } from '@/lib/api'

import { Button } from '@/components/ui/button'

export function Logout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: logoutMutation,
    onSuccess: (response) => {
      toast.success(response.data.message)
      localStorage.removeItem('accessToken')
      queryClient.resetQueries({ queryKey: ['auth'] })
      navigate('/')
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message)
      } else {
        toast.error('Something went wrong')
      }
    }
  })

  async function handleLogout() {
    mutate()
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      className="w-fit"
      disabled={isPending}
      onClick={handleLogout}
    >
      <LogOut />
      {isPending && <LoaderCircle className="size-4 animate-spin" />} Logout
    </Button>
  )
}
