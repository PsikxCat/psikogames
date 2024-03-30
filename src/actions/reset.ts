'use server'

import { type z } from 'zod'

import { ResetSchema } from '@/schemas'
import { getUserByEmail } from '@/data/user'
import { generatePasswordResetToken } from '@/lib/tokens'
import { sendPasswordResetEmail } from '@/lib/mail'

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validateFields = ResetSchema.safeParse(values)
  if (!validateFields.success) return { error: 'Email invalido!' }

  const { email } = validateFields.data

  const existingUser = await getUserByEmail(email)
  if (!existingUser) return { error: 'Email no registrado!' }

  const passwordResetToken = await generatePasswordResetToken(email)

  // TODO: Enviar correo
  const resetPasswordEmail = await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token)
  if (resetPasswordEmail.error) return { error: 'Error al enviar correo de recuperación! Intenta de nuevo.' }

  return { success: 'Correo de recuperación enviado!' }
}
