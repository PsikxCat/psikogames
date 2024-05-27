'use server'

import { db } from '@/lib/db'
import { type ScoreResponseType, type GameResponseType } from '@/types'

// Obtener todos los juegos
export const getGames = async (): Promise<{ success: boolean, error?: string, data?: GameResponseType[] }> => {
  try {
    const games = await db.game.findMany()
    if (!games) { return { success: false, error: 'Juegos no encontrados' } }
    return { success: true, data: games }
  } catch (error) {
    return { success: false, error: 'Error obteniendo juegos' }
  }
}

// Obtener todos los puntajes
export const getScores = async (): Promise<{ success: boolean, error?: string, data?: ScoreResponseType[] }> => {
  try {
    const scores = await db.score.findMany({ orderBy: { value: 'asc' } })
    if (!scores) { return { success: false, error: 'Puntajes no encontrados' } }

    return { success: true, data: scores }
  } catch (error) {
    return { success: false, error: 'Error obteniendo puntajes' }
  }
}
