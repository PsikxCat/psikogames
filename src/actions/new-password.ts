'use server'

import { type z } from 'zod'
import { NewPasswordSchema } from '@/schemas'
import { getUserByEmail } from '@/data/user'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { getPassworResetTokenByToken } from '@/data/password-reset-token'

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  email: string,
  token: string
) => {
  if (!email || !token) return { error: 'Token o correo invalido!' }

  const validateFields = NewPasswordSchema.safeParse(values)
  if (!validateFields.success) return { error: validateFields.error.message }

  const { password, confirmPassword } = values
  if (password !== confirmPassword) return { error: 'Las contraseñas no coinciden' }

  const exisitingToken = await getPassworResetTokenByToken(email, token)
  if (!exisitingToken) return { error: 'Token invalido!' }

  const hasExpired = new Date(exisitingToken.expires) < new Date()
  if (hasExpired) return { error: 'Token expirado!' }

  const existingUser = await getUserByEmail(exisitingToken.email)
  if (!existingUser) return { error: 'Usuario no encontrado!' }

  const hashedPassword = await bcrypt.hash(password, 10)

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword }
  })

  await db.passwordResetToken.delete({ where: { id: exisitingToken.id } })

  return { success: 'Contraseña actualizada!' }
}
