'use server'

import { type z } from 'zod'
import { AuthError } from 'next-auth'

import { signIn } from '@/auth'
import { LoginSchema } from '@/schemas'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validation = LoginSchema.safeParse(values)

  if (!validation.success) return { error: 'Datos invalidos!' }

  const { email, password } = validation.data

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    })

    return { success: 'Login exitoso!' }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin': {
          return { error: 'Credenciales invalidas!' }
        }
        default: {
          return { error: 'Error desconocido!' }
        }
      }
    }

    // se lanza este error para que redirija, de lo contrario no lo hace (bug?)
    throw error
  }
}
