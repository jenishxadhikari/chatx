import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Eye, EyeOff } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { loginMutation } from '@/lib/api'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { ErrorAlert } from '@/components/error-alert'
import { SubmitButton } from '@/components/submit-button'

import { loginSchema } from '@/features/auth/schema'

import { AuthWrapper } from './auth-wrapper'

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') ?? '/'

  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: loginMutation
  })

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    setError(null)
    setShowPassword(false)
    mutate(data, {
      onSuccess: (response) => {
        toast.success(response.data.message)
        localStorage.setItem('accessToken', response.data.accessToken)
        queryClient.resetQueries({ queryKey: ['auth'] })
        form.reset()
        navigate(redirectTo)
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          setError(error.response?.data?.message)
        } else {
          setError('Something went wrong')
        }
      }
    })
  }

  return (
    <div className={cn('mx-auto flex max-w-sm flex-col items-center gap-6', className)} {...props}>
      <AuthWrapper
        title="Welcome back"
        description="Enter your email below to login to your account."
      >
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-5">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="jenish@example.com"
                    type="email"
                    autoComplete="off"
                    disabled={isPending}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="********"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="off"
                      disabled={isPending}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                      disabled={isPending}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            {!!error && <ErrorAlert message={error} />}
            <Field>
              <SubmitButton label="Login" pending={isPending} />
              <FieldDescription className="text-center">
                Don&apos;t have an account? <Link to="/register">Create Account</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </AuthWrapper>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <Link to="#">Terms of Service</Link> and{' '}
        <Link to="#">Privacy Policy</Link>.
      </FieldDescription>
    </div>
  )
}
