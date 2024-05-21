'use client'

import { useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Minesweeper, Timer } from '@/components'

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
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false)
  const [elapsedTime, setElapsedTime] = useState<number>(0)
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false)

  const minesweeperRef = useRef<MinesweeperRef | null>(null)

  const startNewGame = (): void => {
    minesweeperRef.current!.resetGame()
  }

  return (
    <main className="w-full flex_center_column gap-4">
      <h1 className="text-3xl uppercase text-primary font-semibold">
        Buscaminas
      </h1>

      <Button
        variant="main"
        className='w-auto mb-4'
        onClick={startNewGame}
      >
        Nuevo juego
      </Button>

      <div className='flex_center_column gap-2 max-w-[700px]'>
          <div className='w-full flex justify-between mt-4 px-3'>
            <span>🚩 {flags}</span>

            <Timer
              isGameFinished={isGameFinished}
              isTimerRunning={isTimerRunning}
              setIsTimerRunning={setIsTimerRunning}
              elapsedTime={elapsedTime}
              setElapsedTime={setElapsedTime}
            />
          </div>

          <Minesweeper
            ref={minesweeperRef}
            gameConfig={gameConfig}
            setFlags={setFlags}
            setElapsedTime={setElapsedTime}
            setIsTimerRunning={setIsTimerRunning}
            isGameFinished={isGameFinished}
            setIsGameFinished={setIsGameFinished}
          />
        </div>
    </main>
  )
}
