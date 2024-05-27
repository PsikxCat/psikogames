import { useContext, useEffect } from 'react'
import { toast } from 'sonner'

import { type GameStatusType } from '@/types'
import { newScore } from '@/actions/score'
import { GamesContext } from '@/context/games-context/GamesContext'

interface useCreateScoreProps {
  gameName: string
  gameId: string
  gameStatus: GameStatusType
  elapsedTime: number
}

export default function useCreateScore({ gameName, gameId, gameStatus, elapsedTime }: useCreateScoreProps) {
  const { setScoresData } = useContext(GamesContext)

  // Guardar el puntaje si el juego fue ganado
  useEffect(() => {
    if (gameStatus.isGameFinished && gameStatus.isGameWon) {
      newScore({ value: elapsedTime, gameId, gameName })
        .then((res) => {
          if (res?.error) toast.error(res.error)
          if (res?.success) {
            setScoresData((prev) => [...prev, res.data!])
          }
        })
        .catch((error) => { console.error('Error guardando puntaje: ', error) })
    }
  }, [gameName, gameStatus, elapsedTime, gameId])
}
