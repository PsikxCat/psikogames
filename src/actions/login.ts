'use server'

import { type z } from 'zod'
import { AuthError } from 'next-auth'

import { db } from '@/lib/db'
import { LoginSchema } from '@/schemas'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { signIn } from '@/auth'
import { getUserByEmail } from '@/data/user'
import { generateTwoFactorToken, generateVerificationToken } from '@/lib/tokens'
import { sendTwoFactorEmail, sendVerificationEmail } from '@/lib/mail'
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token'

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values)
  if (!validateFields.success) return { error: 'Datos invalidos!' }

  const { email, password, twoFactorCode } = validateFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser?.password || !existingUser?.email) {
    return { error: 'Este correo no existe.' }
  }

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

  if (existingUser?.isTwoFactorEnabled && existingUser?.email) {
    if (twoFactorCode) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)
      if (!twoFactorToken) return { error: 'Error en el token de 2FA!' }

      if (twoFactorToken.token !== twoFactorCode) return { error: 'Código de 2FA incorrecto!' }

      const hasExpired = new Date(twoFactorToken.expires) < new Date()
      if (hasExpired) return { error: 'El token de 2FA ha expirado!' }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id }
      })

      const existingConfirmation = await db.twoFactorConfirmation.findFirst({
        where: { userId: existingUser.id }
      })

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id }
        })
      }

      await db.twoFactorConfirmation.create({
        data: { userId: existingUser.id }
      })
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email)

      await sendTwoFactorEmail(existingUser.email, twoFactorToken.token)

      return {
        success: 'Se ha enviado un correo con el código de autenticación de dos factores.',
        twoFactorToken: true
      }
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
