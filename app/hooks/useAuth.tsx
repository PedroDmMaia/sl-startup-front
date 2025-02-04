'use client'

import { useState } from 'react'
import { Authneticate } from '../actions/authenticate'

interface authcredentials {
  email: string
  password: string
}

interface useAuthResult {
  isLoading: boolean
  error: string | null
  login: (credentials: authcredentials) => Promise<boolean>
}

export function useAuth(): useAuthResult {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function login({ email, password }: authcredentials): Promise<boolean> {
    setIsLoading(true)
    setError(null)

    try {
      const { accessToken } = await Authneticate({ email, password })

      document.cookie = `jwt=${accessToken}; path=/`

      return true
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Erro ao autenticar')
      return false
    }
  }

  return { isLoading, error, login }
}
