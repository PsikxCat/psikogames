'use client'

import { useEffect } from 'react'

import './Wordle.css'
import { useWordle } from '@/hooks/games/use-wordle'
import { Grid } from '@/components'

interface WordsTableProps {
  correctWord: string
}

export default function Wordle({ correctWord }: WordsTableProps) {
  const { handleKeyPress, turn, currentGuess, formattedGuesses, isCorrect } = useWordle(correctWord)

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)

    return () => { window.removeEventListener('keydown', handleKeyPress) }
  }, [handleKeyPress])

  useEffect(() => {
    console.log('formattedGuesses ->', formattedGuesses)
    console.log('isCorrect ->', isCorrect)
  }, [formattedGuesses, isCorrect])

  return (
    <div className='flex_center_column gap-4'>
      <p>{correctWord}</p>
      <div>
        <Grid currentGuess={currentGuess} turn={turn} formattedGuesses={formattedGuesses} />
      </div>
    </div>
  )
}
