import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Dashboard } from '@/components/layout/dashboard'
import { Main } from '@/components/layout/main'
import { NotFound } from '@/components/not-found'

import Login from '@/pages/auth/login'
import Register from '@/pages/auth/register'
import Home from '@/pages/home'
import Chat from '@/pages/protected/chat'
import Settings from '@/pages/protected/settings'
import WelcomeChat from '@/pages/protected/welcome-chat'
import ProtectedRoute from '@/routes/protected.route'
import PublicRoute from '@/routes/public.route'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Main />}>
          <Route element={<Home />} path="" />

          <Route element={<PublicRoute />}>
            <Route element={<Login />} path="login" />
            <Route element={<Register />} path="register" />
          </Route>

          <Route element={<NotFound />} path="*" />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<Dashboard />} path="">
            <Route element={<WelcomeChat />} path="chat" />
            <Route element={<Chat />} path="chat/:id" />
            <Route element={<Settings />} path="settings" />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
