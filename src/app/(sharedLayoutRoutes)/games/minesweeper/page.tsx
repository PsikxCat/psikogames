'use client'

import { useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Minesweeper } from '@/components'
import formatTime from '@/utils/format-time'

const ROWS = 12
const COLS = ROWS
const MINES = Math.floor(ROWS * COLS / 6.66)
const FLAGS = MINES

interface MinesweeperRef {
  resetGame: () => void
}

export default function MinesweeperGamePage() {
  const [flags, setFlags] = useState<number>(FLAGS)
  const [elapsedTime, setElapsedTime] = useState<number>(0)

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
            <span>{formatTime(elapsedTime)}</span>
          </div>

          <Minesweeper
            ref={minesweeperRef}
            ROWS={ROWS}
            COLS={COLS}
            MINES={MINES}
            FLAGS={FLAGS}
            setFlags={setFlags}
            setElapsedTime={setElapsedTime}
          />
        </div>
    </main>
  )
}
