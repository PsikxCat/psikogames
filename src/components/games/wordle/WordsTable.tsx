'use client'

import { useEffect } from 'react'

import { useWordle } from '@/hooks/games/use-wordle'

interface WordsTableProps {
  correctWord: string
}

export default function WordsTable({ correctWord }: WordsTableProps) {
  const { turn, currentGuess, handleKeyPress } = useWordle(correctWord)

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)

    return () => { window.removeEventListener('keydown', handleKeyPress) }
  }, [handleKeyPress])

  return (
    <div className='flex_center_column gap-4'>
      <p>{turn}</p>
      <p>{correctWord}</p>
      <p>{currentGuess}</p>
    </div>
  )
}
