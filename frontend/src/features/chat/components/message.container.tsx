import { useEffect, useRef } from 'react'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'

import { messagesQuery } from '@/lib/api'

import { socket } from '@/hooks/use-socket'
import { useAuthContext } from '@/context/auth-provider'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'

interface Message {
  _id: string
  senderId: string
  receiverId: string
  text?: string
  image?: string
  createdAt: string
  updatedAt: string
  __v: number
}

export function MessageContainer({ id }: { id: string }) {
  const { session } = useAuthContext()
  const sender = session?.user
  if (!sender) {
    return null
  }
  socket.auth = { userId: session.user.id }

  const queryClient = useQueryClient()

  const scrollRef = useRef<HTMLElement>(null)

  const { data, isLoading, error } = useQuery({
    queryKey: ['messages', id],
    queryFn: () => messagesQuery(id)
  })

  useEffect(() => {
    socket.auth = { userId: session.user.id }

    const handleNewMessage = () => queryClient.refetchQueries({ queryKey: ['messages', id] })
    socket.on('newMessage', handleNewMessage)
  }, [id, queryClient])

  const messagesObject = data?.data?.data
  const messages: Message[] = messagesObject ? Object.values(messagesObject) : []

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading messages...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-destructive">Error loading messages</p>
      </div>
    )
  }

  return (
    // 3. Attach the ref to the scrollable section element
    <section ref={scrollRef} className="flex-1 space-y-4 overflow-y-scroll p-4">
      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-muted-foreground">No messages yet</p>
        </div>
      ) : (
        <>
          {messages.map((message: Message) => {
            const isCurrentUser = message.senderId === sender.id
            return (
              <div
                key={message._id}
                className={`animate-in fade-in flex gap-3 ${isCurrentUser ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <Avatar className="mt-1 h-8 w-8">
                  <AvatarFallback className="text-xs">
                    {message.senderId.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {/* Message Content */}
                <div
                  className={`flex flex-1 flex-col ${isCurrentUser ? 'items-end' : 'items-start'} max-w-xs`}
                >
                  <div className="flex items-baseline gap-2">
                    <span className="text-foreground text-sm font-semibold">
                      {message.senderId.slice(-8)}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {formatDistanceToNow(new Date(message.createdAt), {
                        addSuffix: true
                      })}
                    </span>
                  </div>

                  {message.text && (
                    <Card
                      className={`mt-1 rounded-lg p-3 ${
                        isCurrentUser
                          ? 'bg-muted text-foreground'
                          : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      <p className="text-sm wrap-break-word">{message.text}</p>
                    </Card>
                  )}

                  {message.image && (
                    <div className="border-border mt-2 max-w-sm overflow-hidden rounded-lg border">
                      <img
                        src={message.image || '/placeholder.svg'}
                        alt="Message image"
                        className="aspect-square h-40 w-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </>
      )}
    </section>
  )
}
