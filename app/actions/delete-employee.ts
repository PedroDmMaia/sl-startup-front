'use server'

export async function deleteEmployee(token: string, employeeId: string) {
  const response = await fetch(
    `http://localhost:3333/account/delete/${employeeId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  )

  if (!response.ok) {
    throw new Error('Erro ao deletar o funcionário')
  }
}
