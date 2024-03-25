'use server'

import { type z } from 'zod'

import { LoginSchema } from '@/schemas'

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validation = LoginSchema.safeParse(values)

  if (!validation.success) return { error: 'Datos invalidos!' }

  return { success: 'Login exitoso!' }
}
