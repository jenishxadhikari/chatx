import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Main } from '@/components/layout/main'
import { NotFound } from '@/components/not-found'

import Login from '@/pages/auth/login'
import Register from '@/pages/auth/register'
import Home from '@/pages/home'
import ProtectedRoute from '@/routes/protected.route'
import PublicRoute from '@/routes/public.route'

import Chat from './pages/protected/chat'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<Chat />} path="chat" />
        </Route>

        <Route element={<Main />}>
          <Route element={<Home />} path="" />

          <Route element={<PublicRoute />}>
            <Route element={<Login />} path="login" />
            <Route element={<Register />} path="register" />
          </Route>

          <Route element={<NotFound />} path="*" />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
