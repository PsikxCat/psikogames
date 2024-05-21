'use client'

import { useRef, useState } from 'react'

import formatTime from '@/utils/format-time'
import { CardsTable } from '@/components'
import { Button } from '@/components/ui/button'

interface CardsTableRef {
  shuffleCards: () => void
}

export default function MemoryGamePage() {
  const [turn, setTurn] = useState<number>(0)
  const [elapsedTime, setElapsedTime] = useState<number>(0)

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

      <div className='flex_center_column gap-2 max-w-[700px] w-full'>
        <div className='w-full flex justify-between mt-4 px-8'>
          <span>Turno: {turn}</span>
          <span>{formatTime(elapsedTime)}</span>
        </div>

        <CardsTable
          ref={cardsTableRef}
          setTurn={setTurn}
          setElapsedTime={setElapsedTime}
        />
      </div>
    </section>
  )
}
