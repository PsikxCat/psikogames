'use client'

import { useEffect, useState } from 'react'

import getRandomWord from '@/utils/get-random-word'
import { Button } from '@/components/ui/button'
import { Wordle } from '@/components'

export default function WordleGamePage() {
  const [correctWord, setCorrectWord] = useState<string>('')

  useEffect(() => {
    setCorrectWord(getRandomWord())
  }, [])

  return (
    <section className="w-full flex_center_column gap-4">
      <h1 className="text-3xl uppercase text-primary font-semibold">
        Wordle
      </h1>

      <Button
        variant="main"
        className='w-auto'
        onClick={() => { setCorrectWord(getRandomWord()) }}
      >
        Nuevo juego
      </Button>

      <div className='flex_center_column gap-2 max-w-[700px] w-full'>
        <div className='w-full flex justify-between mt-4 px-8'>
          <span>turnos</span>
          <span>tiempo</span>
        </div>

        <Wordle correctWord={correctWord} />
      </div>
    </section>
  )
}
