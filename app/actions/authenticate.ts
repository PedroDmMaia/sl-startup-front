'use server'

export interface user {
  email: string
  password: string
}

interface accessTokenResponse {
  accessToken: string
}

export async function Authneticate(data: user): Promise<accessTokenResponse> {
  const response = await fetch(`http://localhost:3333/auth/session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  })

  if (!response.ok) {
    throw new Error('Usuário não encontrado ou não possui acesso')
  }

  const result = await response.json()
  return { accessToken: result.access_token }
}
