'use client'

import { useEffect, useState } from 'react'
import { fetchEmployees } from '@/app/actions/get-employees'
import Cookies from 'js-cookie'

export interface Employee {
  id: string
  name: string
  email: string
  password: string
  cpf: string
  rg: string
  phoneNumber: string
  isActive: boolean
  role?: string
  createdAt: Date
}

interface UseEmployeeResult {
  isLoading: boolean
  error: string | null
  employees: Employee[]
}

export default function useEmployees(page: number): UseEmployeeResult {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadEmployees = async () => {
      setIsLoading(true)
      try {
        const token = Cookies.get('jwt')

        const employees = await fetchEmployees(page, token!)

        setEmployees(employees)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar os funcionários')
      }
    }

    loadEmployees()
  }, [page])

  return { isLoading, error, employees }
}
