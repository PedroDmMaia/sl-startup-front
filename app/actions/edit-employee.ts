'use server'

export interface Employee {
  name: string
  email: string
  password?: string
  cpf: string
  rg: string
  phoneNumber: string
  isActive: boolean
  role?: string
}

export async function updateEmployee(
  token: string,
  employeeId: string,
  data: Employee,
) {
  const response = await fetch(`http://localhost:3333/employee/${employeeId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: data.name,
      cpf: data.cpf,
      rg: data.rg,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      isActive: data.isActive,
    }),
  })

  if (!response.ok) {
    throw new Error('Erro ao atualizar o funcionário')
  }
}
