import { createContext, PropsWithChildren, useContext, useState } from 'react'

interface Employee {
  id: string
  name: string
  email: string
  password?: string
  cpf: string
  rg: string
  phoneNumber: string
  isActive: boolean
  role?: string
}

interface employeeContextType {
  employee: Employee
  userLoged: Employee
  addToContext: (employee: Employee) => void
  addUserLogedToContext: (user: Employee) => void
  clearContext: () => void
}

const EmployeeContext = createContext({} as employeeContextType)

export function EmployeeProvider({ children }: PropsWithChildren) {
  const [employee, setEmployee] = useState<Employee>({} as Employee)
  const [userLoged, setUserLoged] = useState<Employee>({} as Employee)

  function addUserLogedToContext(user: Employee) {
    setUserLoged(user)
  }

  function addToContext(employee: Employee) {
    setEmployee((prevState) => {
      if (!prevState || prevState.id !== employee.id) {
        return employee
      }
      return prevState
    })
  }

  function clearContext() {
    setEmployee({} as Employee)
  }

  return (
    <EmployeeContext.Provider
      value={{
        employee,
        userLoged,
        addToContext,
        addUserLogedToContext,
        clearContext,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  )
}

export const useEmployeeContext = () => useContext(EmployeeContext)
