import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { userQuery } from '@/lib/api'

import { SidebarTrigger } from '@/components/ui/sidebar'

import { MessageContainer } from '@/features/chat/components/message.container'
import { SendMessageForm } from '@/features/chat/components/send-message-form'

export default function MessageChat() {
  const { id } = useParams()
  if (!id) {
    return null
  }

  const { data, isLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: () => userQuery(id)
  })
  if (!data) {
    return null
  }

  const reciever = data.data.data

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading messages...</p>
      </div>
    )
  }

  if (!data) {
    return null
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="border-border bg-card flex items-center gap-x-5 border-b p-2 md:p-4">
        <SidebarTrigger />
        <h1 className="text-2xl font-bold">{reciever.name}</h1>
      </header>

      {/* Messages Container */}
      <MessageContainer id={id} />

      {/* Input Area */}
      <section className="border-border bg-card border-t p-2">
        <SendMessageForm id={id} />
      </section>
    </div>
  )
}
