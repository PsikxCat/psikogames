import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { type GameStatusType } from '@/types'
import { getGameByName } from '@/data/game'
import { newScore } from '@/actions/score'

interface UseGameLogicProps {
  gameName: string
  gameStatus: GameStatusType
  elapsedTime: number
}

export default function useCreateScore({ gameName, gameStatus, elapsedTime }: UseGameLogicProps) {
  const [gameId, setGameId] = useState<string | null>(null)

  useEffect(() => {
    const getGameId = async (name: string) => {
      const game = await getGameByName(name)
      if (game.success) return { success: true, gameId: game.data!.id }
      return { success: false, error: game.error }
    }

    // Obtener el id del juego mediante el nombre unico
    if (gameId === null) {
      getGameId(gameName)
        .then((res) => {
          if (res.success) setGameId(res.gameId!)
          if (res.error) toast.error(res.error)
        }).catch((error) => { console.error('Error obteniendo id del juego: ', error) })
    }

    // Guardar el puntaje si el juego fue ganado
    if (gameStatus.isGameFinished && gameStatus.isGameWon && gameId) {
      newScore({ value: elapsedTime, gameId })
        .then((res) => {
          if (res?.error) toast.error(res.error)
        })
        .catch((error) => { console.error('Error guardando puntaje: ', error) })
    }
  }, [gameName, gameStatus, elapsedTime, gameId])
}
