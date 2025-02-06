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
  allemployees: Employee[]
  addToContext: (employee: Employee) => void
  addUserLogedToContext: (user: Employee) => void
  addEmployeeToAllEmployees: (employees: Employee[]) => void
  removeEmployeeFromArray: (employee: Employee) => void
  updateEmployee: (employee: Employee) => void
  clearContext: () => void
}

const EmployeeContext = createContext({} as employeeContextType)

export function EmployeeProvider({ children }: PropsWithChildren) {
  const [employee, setEmployee] = useState<Employee>({} as Employee)
  const [userLoged, setUserLoged] = useState<Employee>({} as Employee)
  const [allemployees, setAllemployees] = useState<Employee[]>([] as Employee[])

  function addUserLogedToContext(user: Employee) {
    setUserLoged(user)
  }

  function addEmployeeToAllEmployees(employees: Employee[]) {
    setAllemployees((prevState) => [...prevState, ...employees])
  }

  function removeEmployeeFromArray(employee: Employee) {
    setAllemployees((prevState) =>
      prevState.filter((e) => e.id !== employee.id),
    )
  }

  function updateEmployee(employee: Employee) {
    setAllemployees((prevState) => {
      const itemIndex = prevState.findIndex((item) => item.id === employee.id)
      prevState[itemIndex] = employee
      return prevState
    })
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
        allemployees,
        addToContext,
        addUserLogedToContext,
        addEmployeeToAllEmployees,
        updateEmployee,
        removeEmployeeFromArray,
        clearContext,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  )
}

export const useEmployeeContext = () => useContext(EmployeeContext)
