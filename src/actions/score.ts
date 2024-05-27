'use server'
import { type ScoreResponseType } from '@/types'
import { db } from '../lib/db'
import { getCurrentUser } from '@/lib/auth'

export const newScore = async (
  values: { value: number, gameId: string, gameName: string }
): Promise<{ success: boolean, error?: string, data?: ScoreResponseType }> => {
  const user = await getCurrentUser()
  if (!user || !values.gameId) return { success: false, error: 'Error obteniendo los datos' }

  const userId = user.id!
  const userName = user.name!

  const newScore = await db.score.create({
    data: {
      value: values.value,
      gameId: values.gameId,
      gameName: values.gameName,
      userId,
      userName
    }
  })

  if (!newScore) return { success: false, error: 'Error al guardar puntaje' }

  return { success: true, data: newScore }
}
