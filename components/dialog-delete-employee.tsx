import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'

import { Button } from './ui/button'
import { useEmployeeContext } from '@/app/context/employee-context'
import { Employee } from '@/app/hooks/useEmployees'
import useDeleteEmployee from '@/app/hooks/useDeleteEmployee'

interface props {
  employee: Employee
}

export default function DialogDeleteEmployee({ employee }: props) {
  const { clearContext } = useEmployeeContext()
  const { deleteEmployeeData } = useDeleteEmployee(employee.id)

  function handleAddEmployeeOnContext() {
    deleteEmployeeData()
    clearContext()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Deletar</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-8">
        <DialogHeader className="flex flex-col gap-1">
          <DialogTitle className="text-center">
            Tem certeza que deseja excluir esse funcionario ?
          </DialogTitle>
          <DialogDescription className="text-center">
            Todos os dados serão ecluidos sem prossibilidade de resgate
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center gap-7">
          <DialogClose asChild>
            <Button variant="outline" className="w-20">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            onClick={handleAddEmployeeOnContext}
            variant="destructive"
            className="w-20"
          >
            Excluir
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
