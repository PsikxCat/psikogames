'use server'

import { type SettingsSchema } from '@/schemas'
import { type z } from 'zod'
import bcrypt from 'bcryptjs'

import { db } from '../lib/db'
import { getCurrentUser } from '@/lib/auth'
import { getUserByEmail, getUserById } from '@/data/user'
import { generateChangeEmailToken } from '@/lib/tokens'
import { sendChangeEmailEmail } from '@/lib/mail'

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await getCurrentUser()
  if (!user) return { error: 'No estas autenticado!' }

  const dbUser = await getUserById(user.id!)
  if (!dbUser) return { error: 'Usuario no encontrado!' }

  if (user.isOAuth) {
    delete values.email
    delete values.password
    delete values.newPassword
    delete values.isTwoFactorEnabled
  }

  if (values.password && values.newPassword && dbUser.password) {
    const isValidPassword = await bcrypt.compare(values.password, dbUser.password)

    if (!isValidPassword) return { error: 'Contraseña incorrecta' }

    const hashedNewPassword = await bcrypt.hash(values.newPassword, 10)

    values.password = hashedNewPassword
    delete values.newPassword

    await db.user.update({
      where: { id: user.id },
      data: {
        password: hashedNewPassword
      }
    })
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      name: values.name,
      isTwoFactorEnabled: values.isTwoFactorEnabled
    }
  })

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email)

    if (existingUser && existingUser.id !== user.id) {
      return { error: 'Este correo ya esta registrado.' }
    }

    const changeEmailToken = await generateChangeEmailToken(values.email)

    await sendChangeEmailEmail(
      changeEmailToken.email as string,
      changeEmailToken.token as string
    )

    return { success: 'Sigue el link que enviamos al nuevo correo para validar el cambio.' }
  }

  return { success: 'Datos actualizados.' }
}
