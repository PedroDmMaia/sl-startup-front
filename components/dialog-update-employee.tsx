'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'

import EditEmployeeForm from './edit-employee-form'
import { Button } from './ui/button'
import { useEmployeeContext } from '@/app/context/employee-context'
import { Employee } from '@/app/hooks/useEmployees'

interface props {
  employee: Employee
}

export default function DialogUpdate({ employee }: props) {
  const { addToContext } = useEmployeeContext()

  function handleAddEmployeeOnContext(employee: Employee) {
    addToContext(employee)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={() => handleAddEmployeeOnContext(employee)}
          variant="outline"
        >
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informacoes do funcionário</DialogTitle>
          <DialogDescription>
            Edite as informacoes do funcionario
          </DialogDescription>
        </DialogHeader>
        <EditEmployeeForm />
      </DialogContent>
    </Dialog>
  )
}
