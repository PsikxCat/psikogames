'use client'

import { useRef, useState } from 'react'

import { type GameStatusType } from '@/types'
import formatTime from '@/utils/format-time'
import { useCreateScore } from '@/hooks/games'
import { Button } from '@/components/ui/button'
import { FinishGameModal, MinesweeperBoard, Timer } from '@/components'

const GRID_SIZE = 12

const gameConfig = {
  ROWS: GRID_SIZE,
  COLS: GRID_SIZE,
  MINES: Math.floor(GRID_SIZE * GRID_SIZE / 6.66),
  FLAGS: Math.floor(GRID_SIZE * GRID_SIZE / 6.66)
}

interface MinesweeperRef {
  resetGame: () => void
}

export default function MinesweeperGamePage() {
  const [flags, setFlags] = useState<number>(gameConfig.FLAGS)
  const [elapsedTime, setElapsedTime] = useState<number>(0)
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false)
  const [gameStatus, setGameStatus] = useState<GameStatusType>({ isGameFinished: false, isGameWon: false })

  useCreateScore({ gameName: 'minesweeper', gameStatus, elapsedTime })

  const minesweeperRef = useRef<MinesweeperRef | null>(null)

  const resetGame = (): void => {
    minesweeperRef.current!.resetGame()
  }

  return (
    <main className="w-full flex_center_column gap-4">
      <h1 className="text-3xl uppercase text-primary font-semibold">
        Minesweeper
      </h1>

      <Button
        variant="main"
        className='w-auto mb-4'
        onClick={resetGame}
      >
        Nuevo juego
      </Button>

      <section className='flex_center_column gap-2 max-w-[700px]'>
        {/* Status */}
        <div className='w-full flex justify-between mt-4 px-3'>
          <span>🚩 {flags}</span>

          <Timer
            isGameFinished={gameStatus.isGameFinished}
            isTimerRunning={isTimerRunning}
            setIsTimerRunning={setIsTimerRunning}
            elapsedTime={elapsedTime}
            setElapsedTime={setElapsedTime}
          />
        </div>

        {/* Game */}
        <MinesweeperBoard
          ref={minesweeperRef}
          gameConfig={gameConfig}
          setFlags={setFlags}
          setElapsedTime={setElapsedTime}
          setIsTimerRunning={setIsTimerRunning}
          gameStatus={gameStatus}
          setGameStatus={setGameStatus}
        />
      </section>

      {/* Finish Game Modal */}
      {gameStatus.isGameFinished && (
        <FinishGameModal
          setGameStatus={setGameStatus}
          isGameWon={gameStatus.isGameWon}
          resetGame={resetGame}
          mainLabel={formatTime(elapsedTime)}
        />
      )}
    </main>
  )
}
