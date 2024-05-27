'use client'

import { useEffect, useState } from 'react'
import { GamesContext } from './GamesContext'
import { type GameResponseType, type ScoreResponseType } from '@/types'
import { getGames, getScores } from '@/data/game'

interface GamesProviderProps {
  children: React.ReactNode
}

export default function GamesProvider({ children }: GamesProviderProps) {
  const [gamesData, setGamesData] = useState<GameResponseType[]>([])
  const [scoresData, setScoresData] = useState<ScoreResponseType[]>([])

  // Obtener todos los juegos y setearlos en el estado
  useEffect(() => {
    const fetchGames = async () => {
      const games = await getGames()
      if (games.success) {
        setGamesData(games.data!)
      } else {
        console.error('Error fetching games:', games.error)
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchGames()
  }, [])

  // Obtener todos los puntajes y setearlos en el estado
  useEffect(() => {
    const fetchScores = async () => {
      const scores = await getScores()
      if (scores.success) {
        setScoresData(scores.data!)
      } else {
        console.error('Error fetching scores:', scores.error)
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchScores()
  }, [])

  return (
    <GamesContext.Provider value={{ gamesData, scoresData, setScoresData }}>
      {children}
    </GamesContext.Provider>
  )
}
