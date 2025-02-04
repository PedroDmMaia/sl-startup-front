'use server'

export async function fetchEmployees(page: number, token: string) {
  const response = await fetch(
    `http://localhost:3333/employee/list?page=${page}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  )

  if (!response.ok) {
    throw new Error('Erro ao carregar os funcionários')
  }

  const data = await response.json()
  return data.employees
}
