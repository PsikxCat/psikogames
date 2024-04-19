'use client'

import { useEffect } from 'react'

import { useWordle } from '@/hooks/games/use-wordle'
import { Grid } from '@/components'

interface WordsTableProps {
  correctWord: string
}

export default function Wordle({ correctWord }: WordsTableProps) {
  const { handleKeyPress, currentGuess, formattedGuesses, turn } = useWordle(correctWord)

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)

    return () => { window.removeEventListener('keydown', handleKeyPress) }
  }, [handleKeyPress])

  console.log('correctWord ->', correctWord)

  // useEffect(() => {
  //   console.log('formattedGuesses ->', formattedGuesses)
  //   console.log('isCorrect ->', isCorrect)
  // }, [formattedGuesses, isCorrect])

  return (
    <div className='flex_center_column gap-4'>
      <p>00:00</p>
      <div>
        <Grid currentGuess={currentGuess} formattedGuesses={formattedGuesses} turn={turn} />
      </div>
    </div>
  )
}
