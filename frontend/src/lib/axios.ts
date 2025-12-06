import axios from 'axios'

import { env } from '@/config/env'

const options = {
  baseURL: env.API_URL,
  withCredentials: true
}

const API = axios.create(options)

API.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`
  }
  return config
})

const APIRefresh = axios.create(options)
APIRefresh.interceptors.response.use((response) => response)

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const refreshResponse = await APIRefresh.get('/api/v1/auth/refresh')
        const accessToken = refreshResponse.data.accessToken
        localStorage.setItem('accessToken', accessToken)

        return API(originalRequest)
      } catch (err) {
        console.error('Refresh failed', err)
      }
    }
    return Promise.reject(error)
  }
)

export { API }
