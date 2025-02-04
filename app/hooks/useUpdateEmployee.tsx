'use client'

import { useState } from 'react'
import Cookies from 'js-cookie'
import { updateEmployee, Employee } from '../actions/edit-employee'

interface UseEmployeeResult {
  isLoading: boolean
  error: string | null
  success: boolean
  updateEmployeeData: (
    data: Employee,
  ) => Promise<{ success: boolean; error?: string }> // Retorna o resultado da operação
}

export default function useUpdateEmployee(
  employeeId: string,
): UseEmployeeResult {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const updateEmployeeData = async (data: Employee) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const token = Cookies.get('jwt')
      if (!token) {
        throw new Error('Token não encontrado')
      }

      await updateEmployee(token, employeeId, data)
      setSuccess(true)
      setIsLoading(false)
      return { success: true } // Retorna sucesso
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar o funcionário')
      setIsLoading(false)
      setSuccess(false)
      return { success: false, error: err.message } // Retorna erro
    }
  }

  return { isLoading, error, success, updateEmployeeData }
}
