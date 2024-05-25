'use server'
import { db } from '../lib/db'
import { getCurrentUser } from '@/lib/auth'

export const newScore = async (values: { value: number, gameId: string }): Promise<{ success: boolean, error?: string }> => {
  const user = await getCurrentUser()
  if (!user || !values.gameId) return { success: false, error: 'Error obteniendo los datos' }

  const userId = user.id!

  const newScore = await db.score.create({
    data: {
      value: values.value,
      gameId: values.gameId,
      userId
    }
  })

  if (!newScore) return { success: false, error: 'Error al guardar puntaje' }

  return { success: true }
}
