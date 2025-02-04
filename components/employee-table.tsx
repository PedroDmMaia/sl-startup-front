'use client'

import UseEmployees from '@/app/hooks/useEmployees'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import DialogUpdate from './dialog-update-employee'
import DialogDeleteEmployee from './dialog-delete-employee'

interface Props {
  page: number
}

export default function EmployeeTable({ page }: Props) {
  const { employees } = UseEmployees(page)

  return (
    <Table className="w-[1200px] table-auto border">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[140px]">Id</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>E-mail</TableHead>
          <TableHead>Cargo</TableHead>
          <TableHead className="">Situação</TableHead>
          <TableHead colSpan={2} className="text-center">
            Ações
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map((employee) => {
          return (
            <TableRow key={employee.id}>
              <TableCell className="w-2">
                {employee.id.length > 8
                  ? `${employee.id.slice(0, 8)}...`
                  : employee.id}
              </TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.role}</TableCell>
              <TableCell>
                {employee.isActive === true ? 'ativo' : 'inativo'}
              </TableCell>
              <TableCell colSpan={2} className="flex gap-4 justify-center">
                <DialogUpdate employee={employee} />
                <DialogDeleteEmployee employee={employee} />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
