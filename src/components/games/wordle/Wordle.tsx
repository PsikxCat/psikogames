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
  // const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)

    if (turn > 5 && !isCorrect) {
      window.removeEventListener('keydown', handleKeyPress)
      setTimeout(() => toast.error('Has usado todos tus intentos, perdiste!'), 1200)
      // setShowModal(true)
    }

    if (isCorrect) {
      window.removeEventListener('keydown', handleKeyPress)
      setTimeout(() => toast.success('Has ganado!'), 1200)
      // setShowModal(true)
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

      {/* {showModal && (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex_center_column z-50'>
          <div className='bg-dark-dark p-4 rounded-lg'>
            <p className='text-2xl text-primary font-semibold uppercase'>
              {isCorrect ? 'Has ganado!' : 'Has perdido!'}
            </p>

            <p className='text-lg text-white mt-2'>
              La palabra era: {correctWord}
            </p>

            <button
              className='mt-4 bg-primary text-dark-dark px-4 py-2 rounded-lg'
              onClick={() => {
                setShowModal(false)
                resetGame()
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )} */}
    </div>
  )
}

// ! TODO: Mejorar la organizacion de la logica (useWordle) e integrar el componente Timer
