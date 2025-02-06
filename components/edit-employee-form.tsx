'use client'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useEmployeeContext } from '@/app/context/employee-context'
import useUpdateEmployee from '@/app/hooks/useUpdateEmployee'
import { Loader2 } from 'lucide-react'
import { DialogClose } from '@radix-ui/react-dialog'
import * as select from '@/components/ui/select'
import { Label } from './ui/label'
import { useToast } from '@/hooks/use-toast'
import { useRef } from 'react'

const updateSchema = z.object({
  name: z.string().min(1, { message: 'Deve ter ao menos 1 nome' }),
  cpf: z.string().min(12, { message: 'CPF deve conter 12 caracteres' }).max(12),
  rg: z.string().min(9, { message: 'RG deve conter 9 caracteres' }).max(9),
  email: z.string().email({ message: 'Insira um e-mail válido' }),
  password: z.string().optional(),
  phoneNumber: z
    .string()
    .min(12, { message: 'Deve conter 12 caracteres' })
    .max(12),
  isActive: z.boolean(),
})

type UpdateSchema = z.infer<typeof updateSchema>

export default function EditEmployeeForm() {
  const { toast } = useToast()
  const { employee, addToContext, updateEmployee } = useEmployeeContext()
  const { isLoading, updateEmployeeData } = useUpdateEmployee(employee.id)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateSchema>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      ...employee,
      password: '',
      isActive: employee.isActive,
    },
  })

  const dialogCloseRef = useRef<HTMLButtonElement>(null)

  async function submitFunction(data: UpdateSchema) {
    const result = await updateEmployeeData(data)

    if (result.success) {
      addToContext({
        ...data,
        id: employee.id,
      })

      updateEmployee(employee)

      toast({
        duration: 3000,
        variant: 'success',
        title: 'Sucesso!',
        description: 'Funcionário atualizado com sucesso.',
      })

      dialogCloseRef.current?.click()
    } else {
      // Exibe o toast de erro (opcional)
      toast({
        duration: 3000,
        variant: 'destructive',
        title: 'Erro!',
        description: 'Não foi possível atualizar o funcionário.',
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submitFunction)}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-2">
        <Label>Id do funcionário</Label>
        <Input {...register('name')} placeholder="Nome" />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          {...register('email')}
          type="email"
          placeholder="Email"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="cpf">CPF</Label>
        <Input id="cpf" {...register('cpf')} placeholder="CPF" />
        {errors.cpf && (
          <span className="text-red-500 text-sm">{errors.cpf.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="rg">RG</Label>
        <Input
          id="rg"
          {...register('rg')}
          placeholder="RG"
          defaultValue={employee.rg}
        />
        {errors.rg && (
          <span className="text-red-500 text-sm">{errors.rg.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          {...register('password')}
          placeholder="Insira a nova senha"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="phoneNumber">Número de telefone</Label>
        <Input
          id="phoneNumber"
          {...register('phoneNumber')}
          placeholder="Telefone"
          defaultValue={employee.phoneNumber}
        />
        {errors.phoneNumber && (
          <span className="text-red-500 text-sm">
            {errors.phoneNumber.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label>Contrato</Label>
        <Controller
          name="isActive"
          control={control}
          defaultValue={employee.isActive}
          render={({ field }) => (
            <select.Select
              value={field.value ? 'true' : 'false'}
              onValueChange={(value) => field.onChange(value === 'true')}
            >
              <select.SelectTrigger className="w-full">
                <select.SelectValue />
              </select.SelectTrigger>
              <select.SelectContent>
                <select.SelectGroup>
                  <select.SelectLabel>Situação</select.SelectLabel>
                  <select.SelectItem value="true">Ativo</select.SelectItem>
                  <select.SelectItem value="false">Inativo</select.SelectItem>
                </select.SelectGroup>
              </select.SelectContent>
            </select.Select>
          )}
        />
      </div>

      <div className="flex justify-between">
        <DialogClose asChild>
          <Button ref={dialogCloseRef} type="button" variant="outline">
            Close
          </Button>
        </DialogClose>
        {isLoading ? (
          <Button disabled>
            <Loader2 className="animate-spin" />
            Aguarde...
          </Button>
        ) : (
          <Button type="submit">Enviar</Button>
        )}
      </div>
    </form>
  )
}
