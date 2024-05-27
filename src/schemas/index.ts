import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Ingresa un correo válido'
  }),
  password: z.string().min(1, {
    message: 'Ingresa una contraseña'
  }),
  twoFactorCode: z.optional(z.string())
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

export const ResetSchema = z.object({
  email: z.string().email({
    message: 'Ingresa un correo válido'
  })
})

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres'
  }),
  confirmPassword: z.string().min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres'
  })
}).refine(data => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword']
})

export const SettingsSchema = z.object({
  name: z.optional(z.string().min(3, {
    message: 'El nombre debe tener al menos 3 caracteres'
  })),
  email: z.optional(z.string().email({
    message: 'Ingresa un correo válido'
  })),
  isTwoFactorEnabled: z.optional(z.boolean()),
  password: z.optional(z.string()),
  newPassword: z.optional(z.string().min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres'
  }))
}).refine(data => {
  if ((data.password && !data.newPassword) ?? (!data.password && data.newPassword)) return false

  return true
}, {
  message: 'Ambos campos, contraseña y nueva contraseña, son requeridos',
  path: ['newPassword']
})

export const NewGameModelSchema = z.object({
  name: z.string().min(3, {
    message: 'El nombre debe tener al menos 3 caracteres'
  }),
  description: z.string().min(3, {
    message: 'La descripción debe tener al menos 3 caracteres'
  }),
  // instructions: z.string().min(3, {
  //   message: 'Las instrucciones deben tener al menos 3 caracteres'
  // }),
  // image: z.string().url({
  //   message: 'Ingresa una URL válida'
  // })
  imageUrl: z.string().min(3, {
    message: 'La URL de la imagen debe tener al menos 3 caracteres'
  })
})

export const ScoreSchema = z.object({
  gameId: z.string(),
  userId: z.string(),
  score: z.number().int()
})
