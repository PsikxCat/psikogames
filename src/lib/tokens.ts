import { v4 as uuidv4 } from 'uuid'
import crypto from 'crypto'

import { db } from '@/lib/db'
import { getVerificationTokenByEmail } from '@/data/verification-token'
import { getPasswordResetTokenByEmail } from '@/data/password-reset-token'
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token'
import { getChangeEmailTokenByEmail } from '@/data/change-email'

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(Date.now() + 1000 * 60 * 60) // 1 hora

  const existingToken = await getVerificationTokenByEmail(email)
  if (existingToken) await db.verificationToken.delete({ where: { id: existingToken.id } })

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires
    }
  })

  return verificationToken
}

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(Date.now() + 1000 * 60 * 15) // 15 minutos

  const existingToken = await getPasswordResetTokenByEmail(email)
  if (existingToken) await db.passwordResetToken.delete({ where: { id: existingToken.id } })

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires
    }
  })

  return passwordResetToken
}

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 999_999).toString()
  const expires = new Date(Date.now() + 1000 * 60 * 5) // 5 minutos

  const existingToken = await getTwoFactorTokenByEmail(email)
  if (existingToken) await db.twoFactorToken.delete({ where: { id: existingToken.id } })

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires
    }
  })

  return twoFactorToken
}

export const generateChangeEmailToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24) // 24 horas

  const existingToken = await getChangeEmailTokenByEmail(email)
  if (existingToken) await db.changeEmailToken.delete({ where: { id: existingToken.id } })

  const changeEmailToken = await db.changeEmailToken.create({
    data: {
      email,
      token,
      expires
    }
  })

  return changeEmailToken
}
