import { db } from '@/lib/db'

export const getChangeEmailTokenByToken = async (email: string, token: string) => {
  try {
    const changeEmailToken = await db.changeEmailToken.findUnique({
      where: { email_token: { email, token } }
    })

    return changeEmailToken
  } catch { return null }
}

export const getChangeEmailTokenByEmail = async (email: string) => {
  try {
    const changeEmailToken = await db.changeEmailToken.findFirst({
      where: { email }
    })

    return changeEmailToken
  } catch { return null }
}
