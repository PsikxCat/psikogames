'use server'

import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'
import { getVerificationTokenByToken } from '@/data/verification-token'

export const newVerification = async (token: string, email: string) => {
  const existingToken = await getVerificationTokenByToken(email, token)
  if (!existingToken) return { error: 'Token invalido!' }

  const hasExpired = new Date(existingToken.expires) < new Date()
  if (hasExpired) return { error: 'Token expirado!' }

  const existingUser = await getUserByEmail(email)
  if (!existingUser) return { error: 'Email no encontrado' }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email
    }
  })

  await db.verificationToken.delete({ where: { id: existingToken.id } })

  return { ok: true, success: 'Email verificado!' }
}
