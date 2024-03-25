import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Ingresa un correo válido'
  }),
  password: z.string().min(1, {
    message: 'Ingresa una contraseña'
  })
})

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: 'Ingresa un nombre'
  }),
  email: z.string().email({
    message: 'Ingresa un correo válido'
  }),
  password: z.string().min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres'
  })
})
