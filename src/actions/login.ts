'use server'

import { type z } from 'zod'
import { AuthError } from 'next-auth'

import { LoginSchema } from '@/schemas'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { signIn } from '@/auth'
import { getUserByEmail } from '@/data/user'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validation = LoginSchema.safeParse(values)

  if (!validation.success) return { error: 'Datos invalidos!' }

  const { email, password } = validation.data

  const existingUser = await getUserByEmail(email)

  if (existingUser?.email && !existingUser?.password) {
    return { error: 'Este correo ya esta registrado con otro metodo de autenticacion' }
  }

  if (!existingUser?.emailVerified) {
    const verificationToken = await generateVerificationToken(email)

    const verificationEmail = await sendVerificationEmail(verificationToken.email, verificationToken.token)

    if (verificationToken) {
      if (verificationEmail.error) return { error: 'Usuario no verificado. Error al enviar el correo de verificación.' }

      return { success: 'Usuario no verificado, se ha enviado un correo de verificación.' }
    }
  }

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
