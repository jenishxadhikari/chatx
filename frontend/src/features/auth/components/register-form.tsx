import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Eye, EyeOff } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { registerMutation } from '@/lib/api'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { ErrorAlert } from '@/components/error-alert'
import { SubmitButton } from '@/components/submit-button'
import { SuccessAlert } from '@/components/success-alert'

import { registerSchema } from '@/features/auth/schema'

import { AuthWrapper } from './auth-wrapper'

export function RegisterForm({ className, ...props }: React.ComponentProps<'div'>) {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const { mutate, isPending } = useMutation({
    mutationFn: registerMutation
  })

  async function onSubmit(data: z.infer<typeof registerSchema>) {
    setError(null)
    setSuccess(null)
    setShowPassword(false)
    setShowConfirmPassword(false)
    mutate(data, {
      onSuccess: (response) => {
        setSuccess(response.data.message)
        form.reset()
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
        title="Create an account"
        description="Enter your information below to create your account."
      >
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-5">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Eg. Jenish Adhikari"
                    autoComplete="off"
                    disabled={isPending}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
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
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="********"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="off"
                      disabled={isPending}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                      disabled={isPending}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            {!!success && <SuccessAlert message={success} />}
            {!!error && <ErrorAlert message={error} />}
            <Field>
              <SubmitButton label="Register" pending={isPending} />
              <FieldDescription className="text-center">
                Already have an account? <Link to="/login">Login</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </AuthWrapper>
    </div>
  )
}
