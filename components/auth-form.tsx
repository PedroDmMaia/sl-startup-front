'use client'

import { useAuth } from '@/app/hooks/useAuth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string().email({ message: 'Enviar um email válido' }),
  password: z.string(),
})

type FormSchema = z.infer<typeof formSchema>

export default function AuthForm() {
  const router = useRouter()
  const { login, error } = useAuth()
  const { register, handleSubmit } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  async function submitFunction(data: FormSchema) {
    const success = await login(data)
    if (success) {
      router.push('/dashboard')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submitFunction)}
      className="flex flex-col gap-4 w-full text-center"
    >
      <input
        {...register('email')}
        className="rounded-full px-4 py-2 w-full"
        type="text"
        placeholder="E-mail"
      />
      <input
        {...register('password')}
        className="rounded-full px-4 py-2 w-full"
        type="password"
        placeholder="Senha"
      />

      {error && <span className="text-red-400 mt-2">{error}</span>}

      <button type="submit"></button>
    </form>
  )
}
