import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { sendMessageMutation } from '@/lib/api'

import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { ErrorAlert } from '@/components/error-alert'
import { SubmitButton } from '@/components/submit-button'

import { sendMessageSchema } from '@/features/chat/schema'

export function SendMessageForm({ id }: { id: string }) {
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof sendMessageSchema>>({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: {
      text: ''
    }
  })

  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: sendMessageMutation
  })

  async function onSubmit(data: z.infer<typeof sendMessageSchema>) {
    setError(null)
    const payload = {
      id,
      data
    }
    mutate(payload, {
      onSuccess: () => {
        queryClient.refetchQueries({ queryKey: ['messages', id] })
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
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="flex flex-row gap-2">
        <Controller
          name="text"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="flex-1">
              <FieldLabel htmlFor={field.name} className="sr-only">
                Message
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Type Message"
                disabled={isPending}
                className="w-full"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <SubmitButton label="Send" pending={isPending} className="w-fit!" />
      </FieldGroup>
      {!!error && <ErrorAlert message={error} />}
    </form>
  )
}
