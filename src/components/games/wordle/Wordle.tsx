'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'

import formatTime from '@/utils/format-time'
import { useWordle } from '@/hooks/games/use-wordle'
import { Grid, Keypad } from '@/components'

interface WordsTableProps {
  correctWord: string
}

export default function Wordle({ correctWord }: WordsTableProps) {
  const { handleKeyPress, currentGuess, isCorrect, formattedGuesses, turn, elapsedTime, usedKeys } = useWordle(correctWord)

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)

    if (turn > 5 && !isCorrect) {
      window.removeEventListener('keydown', handleKeyPress)
      setTimeout(() => toast.error('Has usado todos tus intentos, perdiste!'), 1200)
    }

    if (isCorrect) {
      window.removeEventListener('keydown', handleKeyPress)
      setTimeout(() => toast.success('Has ganado!'), 1200)
    }

    return () => { window.removeEventListener('keydown', handleKeyPress) }
  }, [handleKeyPress, turn, isCorrect])

  return (
    <div className='flex_center_column gap-2'>
      <p>{formatTime(elapsedTime)}</p>

      <Grid
        currentGuess={currentGuess}
        formattedGuesses={formattedGuesses}
        turn={turn}
      />

      <Keypad
        usedKeys={usedKeys}
        handleKeyPress={handleKeyPress}
      />
    </div>
  )
}

// ! TODO: Mejorar la organizacion de la logica (useWordle) e integrar el componente Timer
