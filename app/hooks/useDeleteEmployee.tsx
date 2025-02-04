'use client'

import { useState } from 'react'
import Cookies from 'js-cookie'
import { deleteEmployee } from '../actions/delete-employee'

interface UseEmployeeResult {
  isLoading: boolean
  error: string | null
  success: boolean
  deleteEmployeeData: () => Promise<void>
}

export default function useDeleteEmployee(
  employeeId: string,
): UseEmployeeResult {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const deleteEmployeeData = async () => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const token = Cookies.get('jwt')
      if (!token) {
        throw new Error('Token não encontrado')
      }

      await deleteEmployee(token, employeeId)
      setSuccess(true)
      setIsLoading(false)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar o funcionário')
      setIsLoading(false)
      setSuccess(false)
    }
  }

  return { isLoading, error, success, deleteEmployeeData }
}
