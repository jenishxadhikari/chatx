import { useQuery } from '@tanstack/react-query'
import { Ship } from 'lucide-react'
import { Link } from 'react-router-dom'

import { env } from '@/config/env'

import { usersQuery } from '@/lib/api'

import { useAuthContext } from '@/context/auth-provider'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'

import { NavUser } from './nav-user'

export function AppSidebar() {
  const { session } = useAuthContext()
  if (!session) {
    return null
  }
  const user = {
    name: session?.user.name,
    email: session?.user.email,
    avatar: session?.user.avatar
  }

  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: usersQuery
  })
  if (!data) {
    return null
  }

  const usersObject = data.data.data

  type User = {
    id: string
    name: string
    email: string
    avatar: string
    createdAt: Date
    expiredAt: Date
  }

  const users: User[] = Object.values(usersObject)

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
              <Link to="/chat">
                <Ship className="size-5!" />
                <span className="text-base font-semibold">ChatX</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Users</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {users.map((user) => (
                <SidebarMenu key={user.id} className="flex-row">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt="Profile Picture" />
                    <AvatarFallback className="rounded-lg">{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <SidebarMenuButton asChild>
                    <Link to={`${env.BASE_URL}/chat/${user.id}`}>
                      <span>{user.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenu>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
