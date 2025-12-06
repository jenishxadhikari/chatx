import React, { useState } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { updateProfileMutation } from '@/lib/api'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { ErrorAlert } from '@/components/error-alert'
import { SubmitButton } from '@/components/submit-button'

interface AccountCardProps {
  name: string
  email: string
  avatar: string
}

export function AccountInfoCard({ name, email, avatar }: AccountCardProps) {
  const [error, setError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [displayAvatar, setDisplayAvatar] = useState<string>(avatar)

  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfileMutation
  })

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    if (!selectedFile) {
      setError('Please select a file to upload.')
      return
    }

    const formData = new FormData()
    formData.append('avatar', selectedFile)

    mutate(formData, {
      onSuccess: (response) => {
        setSelectedFile(null)
        toast.success(response.data.message)
        queryClient.resetQueries({ queryKey: ['auth'] })
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

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setSelectedFile(file)

    if (displayAvatar && displayAvatar.startsWith('blob:')) {
      URL.revokeObjectURL(displayAvatar)
    }

    const previewUrl = URL.createObjectURL(file)
    setDisplayAvatar(previewUrl)
  }

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
        <CardDescription>Your account details and profile information</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-5">
          <Avatar className="h-20 w-20">
            <AvatarImage src={displayAvatar || '/placeholder.svg'} alt="Profile Picture" />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>

          <form onSubmit={onSubmit} encType="multipart/form-data" className="space-y-2">
            <Field>
              <FieldLabel htmlFor="avatar">Profile Picture</FieldLabel>
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                disabled={isPending}
                onChange={onFileChange}
                className="cursor-pointer"
              />
            </Field>
            <SubmitButton label="Upload" className="w-fit" pending={isPending} />
          </form>

          {error && <ErrorAlert message={error} />}

          <FieldGroup className="gap-5">
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                value={name}
                className="disabled:opacity-100"
                autoComplete="off"
                disabled
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                value={email}
                className="disabled:opacity-100"
                autoComplete="off"
                disabled
              />
            </Field>
          </FieldGroup>
        </div>
      </CardContent>
    </Card>
  )
}
