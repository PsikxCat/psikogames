import { db } from '@/lib/db'

export const getGameByName = async (name: string) => {
  try {
    const game = await db.game.findUnique({ where: { name } })
    return game
  } catch (error) {
    console.error(`Error obteniendo juego ${name}`, error)
    return null
  }
}
