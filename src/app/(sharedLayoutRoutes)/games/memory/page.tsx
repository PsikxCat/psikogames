'use client'

import { useRef, useState } from 'react'

// import formatTime from '@/utils/format-time'
import { CardsTable, Timer } from '@/components'
import { Button } from '@/components/ui/button'

interface CardsTableRef {
  shuffleCards: () => void
}

export default function MemoryGamePage() {
  const [turn, setTurn] = useState<number>(0)
  const [elapsedTime, setElapsedTime] = useState<number>(0)
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false)
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false)

  const cardsTableRef = useRef<CardsTableRef | null>(null)

  const startNewGame = (): void => {
    cardsTableRef.current!.shuffleCards()
  }

  return (
    <section className="w-full flex_center_column gap-4">
      <h1 className="text-3xl uppercase text-primary font-semibold">
        Memory cards
      </h1>

      <Button
        variant="main"
        className='w-auto'
        onClick={startNewGame}
      >
        Nuevo juego
      </Button>

      <section className='flex_center_column gap-2 max-w-[700px] w-full'>
        {/* Status */}
        <div className='w-full flex justify-between mt-4 px-8'>
          <span>Turno: {turn}</span>

          <Timer
            isGameFinished={isGameFinished}
            isTimerRunning={isTimerRunning}
            setIsTimerRunning={setIsTimerRunning}
            elapsedTime={elapsedTime}
            setElapsedTime={setElapsedTime}
          />
        </div>

        {/* Game */}
        <CardsTable
          ref={cardsTableRef}
          setTurn={setTurn}
          setElapsedTime={setElapsedTime}
          setIsTimerRunning={setIsTimerRunning}
          setIsGameFinished={setIsGameFinished}
        />
      </section>
    </section>
  )
}
