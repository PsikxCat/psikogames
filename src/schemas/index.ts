import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Correo invalido'
  }),
  password: z.string().min(1, {
    message: 'Ingresa una contraseña'
  })
})
