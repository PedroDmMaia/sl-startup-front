import { env } from '@/env'
import axios from 'axios'
import Cookies from 'js-cookie'

export const api = axios.create({
  baseURL: env.BASE_URL,
})

api.interceptors.request.use((config) => {
  const token = Cookies.get('jwt')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
