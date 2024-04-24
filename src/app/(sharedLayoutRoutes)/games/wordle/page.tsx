'use client'

import { useEffect, useState } from 'react'

import { useWordle } from '@/hooks/games/use-wordle'
import getRandomWord from '@/utils/get-random-word'
import { Button } from '@/components/ui/button'
import { Wordle } from '@/components'

export default function WordleGamePage() {
  const [correctWord, setCorrectWord] = useState<string>('')
  const { resetGame } = useWordle(correctWord)

  useEffect(() => {
    setCorrectWord(getRandomWord())
  }, [])

  const reset = () => {
    setCorrectWord(getRandomWord())
    resetGame()
  }

  return (
    <main className="w-full flex_center_column gap-4">
      <h1 className="text-3xl uppercase text-primary font-semibold">
        Wordle
      </h1>

      <Button
        variant="main"
        className='w-auto mb-4'
        onClick={reset}
      >
        Nuevo juego
      </Button>

      <section className='flex_center_column gap-2 max-w-[700px] w-full'>
        <Wordle correctWord={correctWord} />
      </section>
    </main>
  )
}
