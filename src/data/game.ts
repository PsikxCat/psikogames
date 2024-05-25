'use server'

import { db } from '@/lib/db'
import { type GameResponseType } from '@/types'

export const getGameByName = async (name: string): Promise<{ success: boolean, error?: string, data?: GameResponseType }> => {
  try {
    const game = await db.game.findUnique({ where: { name } })
    if (!game) { return { success: false, error: 'Juego no encontrado' } }

    return { success: true, data: game }
  } catch (error) {
    return { success: false, error: 'Error obteniendo juego' }
  }
}
