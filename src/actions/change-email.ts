'use server'

import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'
import { getChangeEmailTokenByToken } from '@/data/change-email'

export const changeEmail = async (currentEmail: string, token: string, newEmail: string) => {
  const existingToken = await getChangeEmailTokenByToken(newEmail, token)
  if (!existingToken) return { error: 'Token invalido!' }

  const hasExpired = new Date(existingToken.expires as Date) < new Date()
  if (hasExpired) return { error: 'Token expirado!' }

  const existingUser = await getUserByEmail(currentEmail)
  if (!existingUser) return { error: 'Email no encontrado' }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email
    }
  })

  await db.changeEmailToken.delete({ where: { id: existingToken.id } })

  return { ok: true, success: 'Email verificado!' }
}
