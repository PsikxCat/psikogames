'use client'

import { useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { type GameStatusType } from '@/types'
import formatTime from '@/utils/format-time'
import { useCreateScore } from '@/hooks/games'
import { CardsBoard, FinishGameModal, Timer } from '@/components'
import { Button } from '@/components/ui/button'

interface CardsTableRef {
  resetGame: () => void
}

export default function MemoryGamePage() {
  const [turn, setTurn] = useState<number>(0)
  const [elapsedTime, setElapsedTime] = useState<number>(0)
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false)
  const [gameStatus, setGameStatus] = useState<GameStatusType>({ isGameFinished: false, isGameWon: false })

  const searchParams = useSearchParams()
  const gameId = searchParams.get('game-id')!
  const gameName = searchParams.get('game-name')!

  useCreateScore({ gameName, gameId, gameStatus, elapsedTime })

  const cardsTableRef = useRef<CardsTableRef | null>(null)

  const resetGame = (): void => {
    cardsTableRef.current!.resetGame()
  }

  return (
    <section className="w-full flex_center_column gap-4">
      <h1 className="text-3xl uppercase text-primary font-semibold">
        Memory cards
      </h1>

      <Button
        variant="main"
        className='w-auto'
        onClick={resetGame}
      >
        Nuevo juego
      </Button>

      <section className='flex_center_column gap-2 max-w-[700px] w-full'>
        {/* Status */}
        <div className='w-full flex justify-between mt-4 px-8'>
          <span>Turno: {turn}</span>

          <Timer
            isGameFinished={gameStatus.isGameFinished}
            isTimerRunning={isTimerRunning}
            setIsTimerRunning={setIsTimerRunning}
            elapsedTime={elapsedTime}
            setElapsedTime={setElapsedTime}
          />
        </div>

        {/* Game */}
        <CardsBoard
          ref={cardsTableRef}
          setTurn={setTurn}
          setElapsedTime={setElapsedTime}
          setIsTimerRunning={setIsTimerRunning}
          setGameStatus={setGameStatus}
        />

        {/* Finish Game Modal */}
        {gameStatus.isGameFinished && (
          <FinishGameModal
            setGameStatus={setGameStatus}
            isGameWon={gameStatus.isGameWon}
            resetGame={resetGame}
            mainLabel={formatTime(elapsedTime)}
          />
        )}
      </section>
    </section>
  )
}
