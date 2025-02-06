import { z } from 'zod'

const envSchema = z.object({
  BASE_URL: z.string().url(), // Adiciona uma validação que é uma URL válida
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error(
    'Erro na validação das variáveis de ambiente:',
    parsedEnv.error.format(),
  )
  throw new Error('Configuração inválida no ambiente')
}

export const env = parsedEnv.data
