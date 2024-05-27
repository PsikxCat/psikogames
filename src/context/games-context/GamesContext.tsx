import { type GameResponseType, type ScoreResponseType } from '@/types'
import { type Dispatch, type SetStateAction, createContext } from 'react'

export interface GamesContextType {
  gamesData: GameResponseType[]
  scoresData: ScoreResponseType[]
  setScoresData: Dispatch<SetStateAction<ScoreResponseType[]>>
}

export const GamesContext = createContext<GamesContextType>({} as GamesContextType)
